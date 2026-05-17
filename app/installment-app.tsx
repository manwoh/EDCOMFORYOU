"use client";

import type { CSSProperties, FormEvent, SyntheticEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  brands,
  deliveryStates,
  modelPhotos,
  phones,
  terms,
  translations,
  type Capacity,
  type InstallmentTerm,
  type LanguageCode,
  type Phone,
  type PhoneColor,
  type PhoneType,
  type SortOption,
  type SourceFilter
} from "./data";

type Strings = (typeof translations)[LanguageCode];
type ColorStyle = CSSProperties & {
  "--color": string;
  "--color-deep": string;
  "--color-soft": string;
};
type UploadKey = "ic" | "salary" | "bank";
type OrderUploadLinks = {
  identity_card_url?: string | null;
  salary_slip_url?: string | null;
  bank_statement_url?: string | null;
};

type InstallmentResult = {
  phone: Phone;
  color: PhoneColor;
  capacity: Capacity;
  term: InstallmentTerm;
  price: number;
  downPayment: number;
  principal: number;
  fee: number;
  total: number;
  monthly: number;
};

const currency = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  maximumFractionDigits: 0
});
const installmentCurrency = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const modelPhotoLookup: Record<string, string> = modelPhotos;

function formatCurrency(value: number) {
  return currency.format(value);
}

function formatInstallmentCurrency(value: number) {
  return installmentCurrency.format(value);
}

function dailyAmount(monthly: number) {
  return Math.round((monthly / 30) * 100) / 100;
}

function getBasePrice(phone: Phone) {
  return phone.capacities[0]?.price ?? 0;
}

function getCapacityRange(phone: Phone) {
  const first = phone.capacities[0]?.label ?? "";
  const last = phone.capacities[phone.capacities.length - 1]?.label ?? first;
  return first === last ? first : `${first} - ${last}`;
}

function cleanModelName(model: string) {
  return model.replace(/^Used\s+/i, "");
}

function modelPhoto(phone: Phone) {
  return (
    modelPhotoLookup[cleanModelName(phone.model)] ??
    phone.colors[0]?.image ??
    "/assets/phones/official-polished/iphone-17-pro-max.png"
  );
}

function primaryPhoto(phone: Phone, color?: PhoneColor) {
  return color?.image ?? modelPhoto(phone) ?? phone.colors[0]?.image;
}

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = "/assets/phones/official-polished/iphone-17-pro-max.png";
}

function colorName(color: PhoneColor, lang: LanguageCode) {
  return color[lang] || color.en;
}

function adjustHex(hex: string, amount: number) {
  const value = hex.replace("#", "");
  const num = Number.parseInt(value, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (num & 255) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function colorCardStyle(color: PhoneColor): ColorStyle {
  return {
    "--color": color.value,
    "--color-deep": adjustHex(color.value, -34),
    "--color-soft": `linear-gradient(145deg, ${adjustHex(color.value, 72)}, rgba(255, 255, 255, 0.72))`
  };
}

function calculateInstallment(
  phone: Phone,
  color: PhoneColor,
  capacity: Capacity,
  term: InstallmentTerm,
  downPercent: number
): InstallmentResult {
  const price = capacity.price;
  const downPayment = Math.round((price * downPercent) / 100);
  const principal = price - downPayment;
  const paymentCount = Math.max(term.months - 1, 1);
  const total = Math.round(principal * term.rentMultiplier * 100) / 100;
  const monthly = Math.round((total / paymentCount) * 100) / 100;
  const fee = Math.round((total - principal) * 100) / 100;

  return { phone, color, capacity, term, price, downPayment, principal, fee, total, monthly };
}

function displayTermMonths(term: InstallmentTerm) {
  return Math.max(term.months - 1, 1);
}

function getToastMessage(
  lang: LanguageCode,
  name: string,
  model: string,
  months: number,
  daily: string
) {
  if (lang === "en") {
    return `${name}, your demo order for ${model} is ready: ${months} months, ${daily} per day.`;
  }

  if (lang === "ms") {
    return `${name}, pesanan demo untuk ${model} telah dijana: ${months} bulan, ${daily} sehari.`;
  }

  return `${name}，${model} 模拟订单已生成：${months} 期，每天 ${daily}。`;
}

function SearchIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export default function InstallmentApp() {
  const [lang, setLang] = useState<LanguageCode>("ms");
  const [brand, setBrand] = useState<string>(brands[0]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [source, setSource] = useState<SourceFilter>("all");
  const [selectedModel, setSelectedModel] = useState(phones[0].model);
  const [selectedColorName, setSelectedColorName] = useState(phones[0].colors[0]?.en ?? "");
  const [selectedCapacityLabel, setSelectedCapacityLabel] = useState(
    phones[0].capacities[0]?.label ?? ""
  );
  const [downPercent, setDownPercent] = useState(40);
  const [termIndex, setTermIndex] = useState(0);
  const [toast, setToast] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<UploadKey, string>>({
    ic: "",
    salary: "",
    bank: ""
  });
  const toastTimerRef = useRef<number | undefined>(undefined);
  const colorSectionRef = useRef<HTMLDivElement>(null);

  const strings = translations[lang];

  const filteredPhones = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const ranked = phones
      .map((phone, index) => ({ phone, index }))
      .filter(({ phone }) => phone.capacities.length > 0)
      .filter(({ phone }) => brand === "All" || phone.brand === brand)
      .filter(({ phone }) => source === "all" || phone.type === source)
      .filter(({ phone }) => {
        if (!needle) return true;
        return [phone.brand, phone.model, phone.spec, phone.source]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      });

    if (sort === "low") {
      ranked.sort((a, b) => getBasePrice(a.phone) - getBasePrice(b.phone));
    } else if (sort === "high") {
      ranked.sort((a, b) => getBasePrice(b.phone) - getBasePrice(a.phone));
    } else {
      ranked.sort((a, b) => a.index - b.index);
    }

    return ranked.map(({ phone }) => phone);
  }, [brand, search, sort, source]);

  useEffect(() => {
    document.documentElement.lang = strings.htmlLang;
    document.title = strings.docTitle;
  }, [strings.docTitle, strings.htmlLang]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const selectedPhone =
    filteredPhones.find((phone) => phone.model === selectedModel) ??
    filteredPhones[0] ??
    phones[0];
  const selectedColor =
    selectedPhone.colors.find((color) => color.en === selectedColorName) ?? selectedPhone.colors[0];
  const selectedCapacity =
    selectedPhone.capacities.find((capacity) => capacity.label === selectedCapacityLabel) ??
    selectedPhone.capacities[0];
  const selectedTerm = terms[termIndex] ?? terms[0];
  const result = calculateInstallment(
    selectedPhone,
    selectedColor,
    selectedCapacity,
    selectedTerm,
    downPercent
  );
  const latestPhone =
    phones.find((phone) => phone.type === "Official" && phone.capacities.length > 0) ??
    result.phone;
  const latestPreview = calculateInstallment(
    latestPhone,
    latestPhone.colors[0] ?? result.color,
    latestPhone.capacities[0] ?? result.capacity,
    selectedTerm,
    downPercent
  );
  const officialPhones = filteredPhones.filter((phone) => phone.type === "Official");
  const usedPhones = filteredPhones.filter((phone) => phone.type === "Used");
  const imageAlt = `${result.phone.model} ${result.capacity.label} ${colorName(result.color, lang)}`;
  const resultDaily = dailyAmount(result.monthly);

  function selectPhone(phone: Phone) {
    setSelectedModel(phone.model);
    setSelectedColorName(phone.colors[0]?.en ?? "");
    setSelectedCapacityLabel(phone.capacities[0]?.label ?? "");
    window.setTimeout(() => {
      colorSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  function showToast(message: string) {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 3200);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || strings.nameLabel);
    const phoneNumber = String(formData.get("phone") || "-");
    const stateName = String(formData.get("state") || "-");
    formData.append("model", result.phone.model);
    formData.append("capacity", result.capacity.label);
    formData.append("color", colorName(result.color, lang));
    formData.append("phonePrice", String(result.price));
    formData.append("downPaymentPercent", String(downPercent));
    formData.append("downPaymentAmount", String(result.downPayment));
    formData.append("termMonths", String(result.term.months));
    formData.append("monthlyPayment", String(result.monthly));

    let orderId = "";
    let uploadLinks: OrderUploadLinks = {};

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        id?: string | number;
        message?: string;
        order?: OrderUploadLinks;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "订单上传失败");
      }

      orderId = payload.id ? String(payload.id) : "";
      uploadLinks = payload.order ?? {};
    } catch (error) {
      showToast(error instanceof Error ? error.message : "订单上传失败，请稍后再试。");
      setIsSubmitting(false);
      return;
    }

    const message = [
      "EDCOM TELESHOP iPhone 分期订单",
      orderId ? `订单编号: ${orderId}` : "",
      "",
      `顾客姓名: ${name}`,
      `顾客电话: ${phoneNumber}`,
      `州属: ${stateName}`,
      "",
      `型号: ${result.phone.model}`,
      `容量/版本: ${result.capacity.label}`,
      `颜色: ${colorName(result.color, lang)}`,
      `手机售价: ${formatCurrency(result.price)}`,
      `首付: ${formatCurrency(result.downPayment)} (${downPercent}%)`,
      `分期期数: ${displayTermMonths(result.term)} 个月`,
      `一天还款: ${formatInstallmentCurrency(resultDaily)}`,
      "",
      "顾客上传文件:",
      `身份证 IC: ${uploadLinks.identity_card_url || "未上传"}`,
      `薪水单: ${uploadLinks.salary_slip_url || "未上传"}`,
      `银行账单: ${uploadLinks.bank_statement_url || "未上传"}`,
      "",
      "我想申请这个分期方案。"
    ].filter(Boolean).join("\n");
    const whatsappUrl = `https://wa.me/60127080588?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    showToast(getToastMessage(lang, name, result.phone.model, displayTermMonths(result.term), formatInstallmentCurrency(resultDaily)));
    setIsSubmitting(false);
  }

  function handleUploadChange(key: UploadKey, fileName: string) {
    setUploadedFiles((current) => ({
      ...current,
      [key]: fileName
    }));
  }

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <img
            className="brand-logo"
            src="/assets/edcom-logo-optimized.png"
            alt="EDCOM TELESHOP logo"
          />
          <div className="brand-copy">
            <h1>{strings.brandTitle}</h1>
          </div>
        </div>
        <div className="market-note">
          <span className="pill">{strings.priceUpdated}</span>
          <select
            className="language-select"
            aria-label="Language"
            value={lang}
            onChange={(event) => setLang(event.target.value as LanguageCode)}
          >
            <option value="ms">Melayu</option>
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>

      <main className="page">
        <section className="left">
          <section className="hero" aria-label={strings.heroAria}>
            <div className="hero-minimal-copy">
              <span>{strings.heroRentalLabel}</span>
              <h2>iPhone 17 Pro Max</h2>
              <p>{strings.heroDailyLabel}</p>
            </div>
            <img
              className="hero-minimal-phone"
              src="/assets/phones/official-polished/iphone-17-pro-max.png"
              alt="iPhone 17 Pro Max silver"
              onError={handleImageError}
            />
          </section>

          <PromoVideoPanel strings={strings} />

          <LatestProductPanel
            phone={latestPhone}
            result={latestPreview}
            strings={strings}
            lang={lang}
            isSelected={selectedPhone.model === latestPhone.model}
            onSelect={selectPhone}
          />

          <section className="panel" aria-label={strings.catalogAria}>
            <div className="catalog-head">
              <h2>{strings.catalogTitle}</h2>
              <span className="catalog-count">
                {filteredPhones.length} {strings.countSuffix}
              </span>
            </div>

            <div className="toolbar">
              <label className="search" htmlFor="searchInput">
                <SearchIcon />
                <input
                  id="searchInput"
                  type="search"
                  value={search}
                  placeholder={strings.searchPlaceholder}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <select
                aria-label={strings.sortAria}
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
              >
                <option value="featured">{strings.sortFeatured}</option>
                <option value="low">{strings.sortLow}</option>
                <option value="high">{strings.sortHigh}</option>
              </select>
              <select
                aria-label={strings.sourceAria}
                value={source}
                onChange={(event) => setSource(event.target.value as SourceFilter)}
              >
                <option value="all">{strings.sourceAll}</option>
                <option value="Official">{strings.sourceOfficial}</option>
                <option value="Used">{strings.sourceUsed}</option>
              </select>
            </div>

            <div className="brand-tabs">
              {brands.map((item) => (
                <button
                  className={`tab ${brand === item ? "is-active" : ""}`}
                  key={item}
                  type="button"
                  aria-pressed={brand === item}
                  onClick={() => setBrand(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="phone-grid">
              {filteredPhones.length ? (
                <>
                  <ProductSection
                    type="Official"
                    items={officialPhones}
                    strings={strings}
                    term={selectedTerm}
                    downPercent={downPercent}
                    selectedModel={selectedPhone.model}
                    latestModel={latestPhone.model}
                    onSelect={selectPhone}
                  />
                  <ProductSection
                    type="Used"
                    items={usedPhones}
                    strings={strings}
                    term={selectedTerm}
                    downPercent={downPercent}
                    selectedModel={selectedPhone.model}
                    latestModel={latestPhone.model}
                    onSelect={selectPhone}
                  />
                </>
              ) : (
                <article className="phone-card no-results-card">
                  <div className="card-top">
                    <span className="brand-badge">{strings.noResultsBadge}</span>
                  </div>
                  <div>
                    <h3 className="phone-name">{strings.noResultsTitle}</h3>
                    <p className="phone-spec">{strings.noResultsCopy}</p>
                  </div>
                  <div className="price-row">
                    <strong>RM0</strong>
                    <span>{strings.noPrice}</span>
                  </div>
                </article>
              )}
            </div>
          </section>
        </section>

        <aside className="right">
          <section className="panel summary" aria-label={strings.summaryAria}>
            <div className="summary-head">
              <h2>{strings.summaryTitle}</h2>
              <div className="monthly">
                <strong>{formatInstallmentCurrency(resultDaily)}</strong>
                <span>{strings.monthlyUnit}</span>
              </div>
            </div>

            <div className="summary-body">
              <div className="chosen">
                <div className="phone-mini" role="img" aria-label={imageAlt}>
                  <img
                    className="phone-image"
                    src={primaryPhoto(result.phone, result.color)}
                    alt={imageAlt}
                    onError={handleImageError}
                  />
                </div>
                <div>
                  <h3>{result.phone.model}</h3>
                  <p>
                    {result.phone.brand} | {result.phone.spec} | {result.capacity.label} |{" "}
                    {colorName(result.color, lang)}
                  </p>
                </div>
              </div>

              <div className="control-block" ref={colorSectionRef}>
                <div className="label-row">
                  <label>{strings.colorLabel}</label>
                  <output>{colorName(result.color, lang)}</output>
                </div>
                <div className="color-buttons">
                  {result.phone.colors.map((item, index) => (
                    <button
                      className={`color-button ${item.en === selectedColor.en ? "is-active" : ""}`}
                      key={`${item.en}-${index}`}
                      type="button"
                      aria-pressed={item.en === selectedColor.en}
                      title={colorName(item, lang)}
                      style={colorCardStyle(item)}
                      onClick={() => setSelectedColorName(item.en)}
                    >
                      <span className="color-phone-frame">
                        <img src={item.image} alt={`${result.phone.model} ${colorName(item, lang)}`} />
                      </span>
                      <span className="color-name">{colorName(item, lang)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-block">
                <div className="label-row">
                  <label>{strings.capacityLabel}</label>
                  <output>{result.capacity.label}</output>
                </div>
                <div className="capacity-buttons">
                  {result.phone.capacities.map((item, index) => (
                    <button
                      className={`capacity-button ${
                        item.label === selectedCapacity.label ? "is-active" : ""
                      }`}
                      key={`${item.label}-${index}`}
                      type="button"
                      aria-pressed={item.label === selectedCapacity.label}
                      onClick={() => setSelectedCapacityLabel(item.label)}
                    >
                      {item.label}
                      <span>{formatCurrency(item.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-block">
                <div className="label-row">
                  <label>{strings.downPaymentLabel}</label>
                  <output>{downPercent}%</output>
                </div>
                <div className="citizenship-buttons">
                  <button
                    className={`citizenship-button ${downPercent === 40 ? "is-active" : ""}`}
                    type="button"
                    aria-pressed={downPercent === 40}
                    onClick={() => setDownPercent(40)}
                  >
                    {strings.malaysianCitizen}
                    <span>{strings.deposit40}</span>
                  </button>
                  <button
                    className={`citizenship-button ${downPercent === 50 ? "is-active" : ""}`}
                    type="button"
                    aria-pressed={downPercent === 50}
                    onClick={() => setDownPercent(50)}
                  >
                    {strings.nonMalaysianCitizen}
                    <span>{strings.deposit50}</span>
                  </button>
                </div>
              </div>

              <div className="control-block">
                <div className="label-row">
                  <label>{strings.termLabel}</label>
                  <output />
                </div>
                <div className="term-buttons">
                  {terms.map((term, index) => (
                    <button
                      className={`term-button ${index === termIndex ? "is-active" : ""}`}
                      key={term.months}
                      type="button"
                      aria-pressed={index === termIndex}
                      onClick={() => setTermIndex(index)}
                    >
                      {displayTermMonths(term)} {strings.termSuffix}
                    </button>
                  ))}
                </div>
                <p className="term-note">{strings.termNote}</p>
              </div>

              <div className="rows summary-breakdown">
                <SummaryRow label={strings.priceRowLabel} value={formatCurrency(result.price)} />
                <SummaryRow label={strings.capacityRowLabel} value={result.capacity.label} />
                <SummaryRow label={strings.colorRowLabel} value={colorName(result.color, lang)} />
                <SummaryRow label={strings.downRowLabel} value={formatCurrency(result.downPayment)} />
                <SummaryRow
                  label={strings.monthlyRowLabel}
                  value={formatInstallmentCurrency(resultDaily)}
                />
              </div>

              <div className="notice">
                <InfoIcon />
                <span>{strings.noticeText}</span>
              </div>

              <section className="eligibility" aria-label={strings.eligibilityTitle}>
                <h3>{strings.eligibilityTitle}</h3>
                <ul className="eligibility-list">
                  {[
                    strings.eligibilityItem1,
                    strings.eligibilityItem2,
                    strings.eligibilityItem3,
                    strings.eligibilityItem4,
                    strings.eligibilityItem5,
                    strings.eligibilityItem6
                  ].map((item) => (
                    <li key={item}>
                      <span className="checkmark">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="upload-actions">
                  <DocumentUploadButton
                    id="icUpload"
                    name="identityCard"
                    label={strings.uploadIcLabel}
                    fileName={uploadedFiles.ic}
                    emptyText={strings.noFileSelected}
                    onChange={(fileName) => handleUploadChange("ic", fileName)}
                  />
                  <DocumentUploadButton
                    id="salaryUpload"
                    name="salarySlip"
                    label={strings.uploadSalaryLabel}
                    fileName={uploadedFiles.salary}
                    emptyText={strings.noFileSelected}
                    onChange={(fileName) => handleUploadChange("salary", fileName)}
                  />
                  <DocumentUploadButton
                    id="bankUpload"
                    name="bankStatement"
                    label={strings.uploadBankLabel}
                    fileName={uploadedFiles.bank}
                    emptyText={strings.noFileSelected}
                    onChange={(fileName) => handleUploadChange("bank", fileName)}
                  />
                </div>
              </section>

              <form className="checkout-form" id="checkoutForm" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">{strings.nameLabel}</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder={strings.namePlaceholder}
                    required
                  />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="phone">{strings.phoneLabel}</label>
                    <input
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={strings.phonePlaceholder}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="state">{strings.stateLabel}</label>
                    <select id="state" name="state" required defaultValue="">
                      <option value="">{strings.statePlaceholder}</option>
                      {deliveryStates.map((stateName) => (
                        <option key={stateName}>{stateName}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? strings.submittingLabel : strings.submitButton}
                </button>
              </form>

              <p className="fineprint">{strings.fineprint}</p>
            </div>
          </section>
        </aside>
      </main>

      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

function PromoVideoPanel({ strings }: { strings: Strings }) {
  return (
    <section className="promo-video-panel" aria-label={strings.promoTag}>
      <div className="promo-video-copy">
        <span>{strings.promoTag}</span>
        <h2>{strings.promoTitle}</h2>
        <p>{strings.promoCopy}</p>
        <a href="https://wa.me/60127080588" target="_blank" rel="noopener noreferrer">
          {strings.whatsappCta}
        </a>
      </div>
      <div className="promo-video-frame">
        <video
          autoPlay
          controls
          loop
          playsInline
          preload="metadata"
          poster="/assets/phones/official-polished/iphone-17-pro-max.png"
        >
          <source src="/assets/promo/edcom-promo.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

function LatestProductPanel({
  phone,
  result,
  strings,
  lang,
  isSelected,
  onSelect
}: {
  phone: Phone;
  result: InstallmentResult;
  strings: Strings;
  lang: LanguageCode;
  isSelected: boolean;
  onSelect: (phone: Phone) => void;
}) {
  return (
    <section className="latest-panel" aria-label={`${strings.latestTag} ${phone.model}`}>
      <div className="latest-media">
        <img
          src={primaryPhoto(phone, result.color)}
          alt={phone.model}
          onError={handleImageError}
        />
      </div>
      <div className="latest-content">
        <span className="latest-eyebrow">{strings.latestTag}</span>
        <h2>{phone.model}</h2>
        <p>{strings.latestSubtitle}</p>
        <div className="latest-metrics">
          <div>
            <span>{strings.latestFrom}</span>
            <strong>{formatCurrency(getBasePrice(phone))}</strong>
          </div>
          <div>
            <span>{strings.latestMonthly}</span>
            <strong>{formatInstallmentCurrency(dailyAmount(result.monthly))}</strong>
          </div>
          <div>
            <span>{strings.latestStorage}</span>
            <strong>{getCapacityRange(phone)}</strong>
          </div>
          <div>
            <span>{strings.latestColors}</span>
            <strong>
              {phone.colors.length} | {colorName(result.color, lang)}
            </strong>
          </div>
        </div>
        <button className="latest-action" type="button" onClick={() => onSelect(phone)}>
          {isSelected ? strings.selectedBadge : strings.latestSelectButton}
        </button>
      </div>
    </section>
  );
}

function ProductSection({
  type,
  items,
  strings,
  term,
  downPercent,
  selectedModel,
  latestModel,
  onSelect
}: {
  type: PhoneType;
  items: Phone[];
  strings: Strings;
  term: InstallmentTerm;
  downPercent: number;
  selectedModel: string;
  latestModel: string;
  onSelect: (phone: Phone) => void;
}) {
  if (!items.length) return null;

  const title = type === "Official" ? strings.newSectionTitle : strings.usedSectionTitle;

  return (
    <section className="phone-section" aria-label={title}>
      <div className="phone-section-head">
        <h3>{title}</h3>
        <span>
          {items.length} {strings.countSuffix}
        </span>
      </div>
      <div className="phone-section-grid">
        {items.map((phone) => (
          <ProductCard
            key={phone.model}
            phone={phone}
            strings={strings}
            term={term}
            downPercent={downPercent}
            isSelected={phone.model === selectedModel}
            isLatest={phone.model === latestModel}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  phone,
  strings,
  term,
  downPercent,
  isSelected,
  isLatest,
  onSelect
}: {
  phone: Phone;
  strings: Strings;
  term: InstallmentTerm;
  downPercent: number;
  isSelected: boolean;
  isLatest: boolean;
  onSelect: (phone: Phone) => void;
}) {
  const preview = calculateInstallment(
    phone,
    phone.colors[0],
    phone.capacities[0],
    term,
    downPercent
  );
  const dailyFrom = dailyAmount(preview.monthly);

  return (
    <button
      className={`phone-card ${isSelected ? "is-active" : ""}`}
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(phone)}
    >
      <div className="card-top">
        <span className="brand-badge">{phone.brand}</span>
        {(isSelected || isLatest) && (
          <span className={`status-badge ${isSelected ? "is-selected" : ""}`}>
            {isSelected ? strings.selectedBadge : strings.latestBadge}
          </span>
        )}
      </div>
      <div className="phone-card-media">
        <img
          src={primaryPhoto(phone)}
          alt={phone.model}
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <div>
        <h3 className="phone-name">{phone.model}</h3>
        <p className="phone-spec">
          {phone.spec} | {phone.capacities.map((capacity) => capacity.label).join(" / ")}
        </p>
      </div>
      <div className="price-row">
        <strong>{formatCurrency(getBasePrice(phone))}</strong>
        <span>
          {strings.priceMarket}
          <br />
          {strings[phone.noteKey]}
        </span>
      </div>
      <div className="installment-preview">
        <span>{strings.dailyFromLabel}</span>
        <strong>{formatInstallmentCurrency(dailyFrom)}</strong>
      </div>
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function DocumentUploadButton({
  id,
  name,
  label,
  fileName,
  emptyText,
  onChange
}: {
  id: string;
  name: string;
  label: string;
  fileName: string;
  emptyText: string;
  onChange: (fileName: string) => void;
}) {
  return (
    <label className="upload-button" htmlFor={id}>
      <span className="upload-button-label">{label}</span>
      <span className="upload-file-name">{fileName || emptyText}</span>
      <input
        id={id}
        name={name}
        form="checkoutForm"
        className="upload-input"
        type="file"
        accept="image/*,.pdf"
        onChange={(event) => onChange(event.currentTarget.files?.[0]?.name ?? "")}
      />
    </label>
  );
}
