import { NextResponse } from "next/server";

export const runtime = "nodejs";

type UploadedAsset = {
  url: string;
  path: string;
  bucket: string;
  original_filename: string;
  content_type: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function safeFileName(name: string) {
  return name
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120) || "document";
}

function fullSignedUrl(supabaseUrl: string, signedPath: string) {
  if (signedPath.startsWith("http")) return signedPath;
  if (signedPath.startsWith("/")) return `${supabaseUrl}/storage/v1${signedPath}`;
  return `${supabaseUrl}/storage/v1/${signedPath}`;
}

async function createSignedStorageUrl(supabaseUrl: string, serviceRoleKey: string, bucket: string, path: string) {
  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/sign/${bucket}/${encodeURI(path)}`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ expiresIn: 60 * 60 * 24 * 30 })
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase signed URL failed for ${path}: ${message}`);
  }

  const payload = (await response.json()) as { signedURL?: string; signedUrl?: string };
  const signedPath = payload.signedURL || payload.signedUrl;

  if (!signedPath) {
    throw new Error(`Supabase signed URL missing for ${path}`);
  }

  return fullSignedUrl(supabaseUrl, signedPath);
}

async function uploadToSupabaseStorage(file: File | null, label: string, orderRef: string) {
  if (!file || file.size === 0) return null;

  const supabaseUrl = requiredEnv("SUPABASE_URL").replace(/\/$/, "");
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "installment-documents";
  const originalName = file.name || `${label}.pdf`;
  const path = `${orderRef}/${label}-${Date.now()}-${safeFileName(originalName)}`;

  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${bucket}/${encodeURI(path)}`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "false"
      },
      body: Buffer.from(await file.arrayBuffer())
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase Storage upload failed for ${label}: ${message}`);
  }

  const url = await createSignedStorageUrl(supabaseUrl, serviceRoleKey, bucket, path);

  return {
    url,
    path,
    bucket,
    original_filename: originalName,
    content_type: file.type || "application/octet-stream"
  } satisfies UploadedAsset;
}

async function insertSupabaseOrder(order: Record<string, unknown>) {
  const supabaseUrl = requiredEnv("SUPABASE_URL").replace(/\/$/, "");
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const table = process.env.SUPABASE_ORDERS_TABLE || "installment_orders";
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(order)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase insert failed: ${message}`);
  }

  const rows = (await response.json()) as Array<{ id?: string | number }>;
  return rows[0] || null;
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function readFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File ? value : null;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const orderRef = `order-${Date.now()}`;
    const [identityCard, salarySlip, bankStatement] = await Promise.all([
      uploadToSupabaseStorage(readFile(formData, "identityCard"), "identity-card", orderRef),
      uploadToSupabaseStorage(readFile(formData, "salarySlip"), "salary-slip", orderRef),
      uploadToSupabaseStorage(readFile(formData, "bankStatement"), "bank-statement", orderRef)
    ]);

    const order = {
      customer_name: readText(formData, "name"),
      customer_phone: readText(formData, "phone"),
      delivery_state: readText(formData, "state"),
      model: readText(formData, "model"),
      capacity: readText(formData, "capacity"),
      color: readText(formData, "color"),
      phone_price: Number(readText(formData, "phonePrice") || 0),
      down_payment_percent: Number(readText(formData, "downPaymentPercent") || 0),
      down_payment_amount: Number(readText(formData, "downPaymentAmount") || 0),
      term_months: Number(readText(formData, "termMonths") || 0),
      monthly_payment: Number(readText(formData, "monthlyPayment") || 0),
      identity_card_url: identityCard?.url || null,
      salary_slip_url: salarySlip?.url || null,
      bank_statement_url: bankStatement?.url || null,
      cloudinary_assets: {
        identityCard,
        salarySlip,
        bankStatement
      },
      source: "website"
    };

    const inserted = await insertSupabaseOrder(order);

    return NextResponse.json({
      ok: true,
      id: inserted?.id || null,
      order
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unknown order error"
      },
      { status: 500 }
    );
  }
}
