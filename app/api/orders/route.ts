import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type UploadedAsset = {
  url: string;
  secure_url?: string;
  public_id?: string;
  resource_type?: string;
  original_filename?: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function cloudinarySignature(params: Record<string, string>, secret: string) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${payload}${secret}`).digest("hex");
}

async function uploadToCloudinary(file: File | null, label: string) {
  if (!file || file.size === 0) return null;

  const cloudName = requiredEnv("CLOUDINARY_CLOUD_NAME");
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  const folder = process.env.CLOUDINARY_FOLDER || "edcom-installments";
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", folder);
  formData.append("tags", `edcom,installment,${label}`);

  if (uploadPreset) {
    formData.append("upload_preset", uploadPreset);
  } else {
    const apiKey = requiredEnv("CLOUDINARY_API_KEY");
    const apiSecret = requiredEnv("CLOUDINARY_API_SECRET");
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signatureParams = { folder, tags: `edcom,installment,${label}`, timestamp };

    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", cloudinarySignature(signatureParams, apiSecret));
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Cloudinary upload failed for ${label}: ${message}`);
  }

  return (await response.json()) as UploadedAsset;
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
    const [identityCard, salarySlip, bankStatement] = await Promise.all([
      uploadToCloudinary(readFile(formData, "identityCard"), "identity-card"),
      uploadToCloudinary(readFile(formData, "salarySlip"), "salary-slip"),
      uploadToCloudinary(readFile(formData, "bankStatement"), "bank-statement")
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
      identity_card_url: identityCard?.secure_url || identityCard?.url || null,
      salary_slip_url: salarySlip?.secure_url || salarySlip?.url || null,
      bank_statement_url: bankStatement?.secure_url || bankStatement?.url || null,
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
