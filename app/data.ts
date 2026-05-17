export type LanguageCode = "zh" | "en" | "ms";
export type PhoneType = "Official" | "Used";
export type SortOption = "featured" | "low" | "high";
export type SourceFilter = "all" | PhoneType;

export type TranslationKey = keyof typeof translations.zh;

export type PhoneColor = {
  zh: string;
  en: string;
  ms: string;
  value: string;
  image: string;
};

export type Capacity = {
  label: string;
  price: number;
  cost?: number;
};

export type Phone = {
  brand: string;
  model: string;
  spec: string;
  source: string;
  type: PhoneType;
  tone: string;
  noteKey: TranslationKey;
  colors: PhoneColor[];
  capacities: Capacity[];
};

export type InstallmentTerm = {
  months: number;
  rate: number;
  rentMultiplier: number;
};

export const translations = {
  "zh": {
    "htmlLang": "zh-CN",
    "docTitle": "EDCOM TELESHOP Apple iPhone 分期",
    "brandTitle": "手机出租配套",
    "priceUpdated": "价格更新：2026-05-13",
    "heroTitle": "EDCOM TELESHOP Apple iPhone 分期专区",
    "heroCopy": "只保留 Apple iPhone 系列与马来西亚官方售价。选择型号后会自动计算首付和一天多少钱。",
    "heroAria": "Apple 产品图横幅",
    "catalogAria": "手机目录",
    "summaryAria": "分期账单",
    "catalogTitle": "Apple iPhone 系列",
    "searchPlaceholder": "搜索 iPhone 型号",
    "sortAria": "排序",
    "sourceAria": "机型类型",
    "sortFeatured": "推荐排序",
    "sortLow": "价格低到高",
    "sortHigh": "价格高到低",
    "sourceAll": "全部",
    "sourceOfficial": "新机",
    "sourceUsed": "二手机",
    "newSectionTitle": "新机",
    "usedSectionTitle": "二手机",
    "summaryTitle": "租借一天最低！",
    "summaryCopy": "",
    "monthlyUnit": "/ 天",
    "colorLabel": "颜色选择",
    "colorRowLabel": "所选颜色",
    "capacityLabel": "容量选择",
    "capacityRowLabel": "所选容量",
    "downPaymentLabel": "顾客身份",
    "termLabel": "分期期数",
    "priceRowLabel": "手机售价",
    "downRowLabel": "首付金额",
    "principalRowLabel": "融资本金",
    "feeRowLabel": "利息",
    "totalRowLabel": "分期总额",
    "noticeText": "确认型号，所选容量，所选颜色，首付金额和一天还款金额。",
    "eligibilityTitle": "申请所需资料",
    "eligibilityItem1": "身份证 IC：请上传清晰正反面照片或扫描件。",
    "eligibilityItem2": "最新薪水单 Slip Gaji：请上传最近一期薪水单。",
    "eligibilityItem3": "最新银行账单 Bank Statement：请上传最近一期银行账单。",
    "eligibilityItem4": "文件需清晰可读，姓名与资料需一致。",
    "eligibilityItem5": "CTOS / blacklist / AKPK 个案可提交审核，最终以公司审批为准。",
    "eligibilityItem6": "外劳也可以申请，deposit 需准备 50%。",
    "nameLabel": "收货人",
    "namePlaceholder": "请输入姓名",
    "phoneLabel": "马来西亚手机号",
    "phonePlaceholder": "012-345 6789",
    "stateLabel": "配送州属",
    "statePlaceholder": "请选择",
    "submitButton": "WhatsApp 提交订单",
    "fineprint": "售价以 2026-05-13 查询结果录入，单位为马来西亚令吉 RM。",
    "uploadIcLabel": "上传身份证 IC",
    "uploadSalaryLabel": "上传最新薪水单",
    "uploadBankLabel": "上传最新银行账单",
    "noFileSelected": "尚未选择文件",
    "countSuffix": "款",
    "noResultsTitle": "没有找到匹配机型",
    "noResultsCopy": "请换一个搜索词或类型。",
    "noResultsBadge": "无结果",
    "noPrice": "无价格",
    "priceMarket": "Malaysia",
    "priceKind": "售价",
    "termSuffix": "期",
    "feeZero": "月利息 0%",
    "feePrefix": "月利息",
    "officialPrice": "新机售价",
    "officialFrom": "新机起售价",
    "usedPrice": "二手机售价",
    "monthlyRowLabel": "一天还款",
    "latestTag": "最新推荐",
    "latestSubtitle": "优先展示最新新机，让客户快速看到起售价、一天多少钱、容量和颜色选择。",
    "latestFrom": "起售价",
    "latestMonthly": "一天多少钱",
    "latestStorage": "容量",
    "latestColors": "颜色",
    "latestSelectButton": "选择最新款",
    "latestBadge": "最新",
    "selectedBadge": "已选",
    "heroRentalLabel": "手机出租配套",
    "heroDailyLabel": "租借一天最低",
    "malaysianCitizen": "马来西亚公民",
    "nonMalaysianCitizen": "非马来西亚公民",
    "deposit40": "40% 首付",
    "deposit50": "50% 首付",
    "submittingLabel": "正在上传...",
    "promoTag": "宣传视频",
    "promoTitle": "欢迎光临，让我们为你服务",
    "promoCopy": "更多疑问可以 WhatsApp 咨询",
    "whatsappCta": "WhatsApp 咨询",
    "dailyFromLabel": "最低一天"
  },
  "en": {
    "htmlLang": "en",
    "docTitle": "EDCOM TELESHOP Apple iPhone Installments",
    "brandTitle": "Phone Rental Plan",
    "priceUpdated": "Price updated: 2026-05-13",
    "heroTitle": "EDCOM TELESHOP Apple iPhone Installments",
    "heroCopy": "Only Apple iPhone models and Malaysia official prices are kept. The bill calculates the down payment and daily payment automatically.",
    "heroAria": "AI product banner",
    "catalogAria": "Phone catalog",
    "summaryAria": "Installment bill",
    "catalogTitle": "Apple iPhone Series",
    "searchPlaceholder": "Search iPhone model",
    "sortAria": "Sort",
    "sourceAria": "Phone type",
    "sortFeatured": "Featured",
    "sortLow": "Price low to high",
    "sortHigh": "Price high to low",
    "sourceAll": "All sources",
    "sourceOfficial": "New phones",
    "sourceUsed": "Second hand",
    "newSectionTitle": "New phones",
    "usedSectionTitle": "Second-hand phones",
    "summaryTitle": "Rent from daily!",
    "summaryCopy": "",
    "monthlyUnit": "/ day",
    "colorLabel": "Color",
    "colorRowLabel": "Selected color",
    "capacityLabel": "Storage",
    "capacityRowLabel": "Selected storage",
    "downPaymentLabel": "Customer status",
    "termLabel": "Installment term",
    "priceRowLabel": "Phone price",
    "downRowLabel": "Down payment",
    "monthlyRowLabel": "Daily payment",
    "latestTag": "Latest pick",
    "latestSubtitle": "The newest new-phone model is shown upfront so customers can compare starting price, daily payment, storage, and colors quickly.",
    "latestFrom": "From",
    "latestMonthly": "Per day",
    "latestStorage": "Storage",
    "latestColors": "Colors",
    "latestSelectButton": "Select latest",
    "latestBadge": "Latest",
    "selectedBadge": "Selected",
    "principalRowLabel": "Financed amount",
    "feeRowLabel": "Interest",
    "totalRowLabel": "Installment total",
    "noticeText": "Confirm the model, selected storage, selected color, down payment amount, and daily repayment amount.",
    "eligibilityTitle": "Required Application Documents",
    "eligibilityItem1": "Identity card IC: upload clear front and back photos or scans.",
    "eligibilityItem2": "Latest salary slip: upload the most recent slip gaji.",
    "eligibilityItem3": "Latest bank statement: upload the most recent bank statement.",
    "eligibilityItem4": "Documents must be clear and readable, with matching customer details.",
    "eligibilityItem5": "CTOS / blacklist / AKPK cases can be submitted for review, subject to company approval.",
    "eligibilityItem6": "Foreign workers may also apply; 50% deposit is required.",
    "nameLabel": "Recipient",
    "namePlaceholder": "Enter name",
    "phoneLabel": "Malaysia mobile number",
    "phonePlaceholder": "012-345 6789",
    "stateLabel": "Delivery state",
    "statePlaceholder": "Select state",
    "submitButton": "Submit by WhatsApp",
    "fineprint": "Prices were recorded from the 2026-05-13 lookup and are shown in Malaysian Ringgit RM.",
    "uploadIcLabel": "Upload identity card IC",
    "uploadSalaryLabel": "Upload latest salary slip",
    "uploadBankLabel": "Upload latest bank statement",
    "noFileSelected": "No file selected",
    "countSuffix": "models",
    "noResultsTitle": "No matching model",
    "noResultsCopy": "Try another search term or source.",
    "noResultsBadge": "No results",
    "noPrice": "No price",
    "priceMarket": "Malaysia",
    "priceKind": "selling price",
    "termSuffix": "months",
    "feeZero": "Monthly interest 0%",
    "feePrefix": "Monthly interest",
    "officialPrice": "Official price",
    "officialFrom": "Official starting price",
    "usedPrice": "Used price",
    "heroRentalLabel": "Phone Rental Plan",
    "heroDailyLabel": "Lowest daily rental",
    "malaysianCitizen": "Malaysian citizen",
    "nonMalaysianCitizen": "Non-Malaysian citizen",
    "deposit40": "40% deposit",
    "deposit50": "50% deposit",
    "submittingLabel": "Uploading...",
    "promoTag": "Promo video",
    "promoTitle": "Welcome, let us serve you",
    "promoCopy": "For more questions, contact us on WhatsApp",
    "whatsappCta": "WhatsApp inquiry",
    "dailyFromLabel": "Lowest per day"
  },
  "ms": {
    "htmlLang": "ms",
    "docTitle": "Ansuran Apple iPhone EDCOM TELESHOP",
    "brandTitle": "Pakej Sewa Telefon",
    "priceUpdated": "Harga dikemas kini: 2026-05-13",
    "heroTitle": "Zon Ansuran Apple iPhone EDCOM TELESHOP",
    "heroCopy": "Hanya siri Apple iPhone dan harga rasmi Malaysia dikekalkan. Imej produk menggunakan imej rasmi Apple, dan bil ansuran mengira bayaran pendahuluan, bayaran bulanan, caj perkhidmatan dan jumlah secara automatik.",
    "heroAria": "Sepanduk produk AI",
    "catalogAria": "Katalog telefon",
    "summaryAria": "Bil ansuran",
    "catalogTitle": "Siri Apple iPhone",
    "searchPlaceholder": "Cari model iPhone",
    "sortAria": "Susun",
    "sourceAria": "Jenis telefon",
    "sortFeatured": "Disyorkan",
    "sortLow": "Harga rendah ke tinggi",
    "sortHigh": "Harga tinggi ke rendah",
    "sourceAll": "Semua sumber",
    "sourceOfficial": "Telefon baru",
    "sourceUsed": "Second hand",
    "newSectionTitle": "Telefon baru",
    "usedSectionTitle": "Telefon second hand",
    "summaryTitle": "Sewa harian terendah!",
    "summaryCopy": "",
    "monthlyUnit": "/ hari",
    "colorLabel": "Warna",
    "colorRowLabel": "Warna dipilih",
    "capacityLabel": "Storan",
    "capacityRowLabel": "Storan dipilih",
    "downPaymentLabel": "Status pelanggan",
    "termLabel": "Tempoh ansuran",
    "priceRowLabel": "Harga telefon",
    "downRowLabel": "Jumlah pendahuluan",
    "monthlyRowLabel": "Bayaran sehari",
    "principalRowLabel": "Jumlah dibiayai",
    "feeRowLabel": "Faedah",
    "totalRowLabel": "Jumlah ansuran",
    "noticeText": "Sahkan model, kapasiti dipilih, warna dipilih, bayaran pendahuluan dan bayaran bulanan.",
    "eligibilityTitle": "Dokumen Permohonan Diperlukan",
    "eligibilityItem1": "Kad pengenalan IC: muat naik gambar atau imbasan depan dan belakang yang jelas.",
    "eligibilityItem2": "Slip gaji terkini: muat naik slip gaji paling baru.",
    "eligibilityItem3": "Penyata bank terkini: muat naik bank statement paling baru.",
    "eligibilityItem4": "Dokumen mesti jelas dan boleh dibaca, dengan maklumat pelanggan yang sepadan.",
    "eligibilityItem5": "Kes CTOS / blacklist / AKPK boleh dihantar untuk semakan, tertakluk kepada kelulusan syarikat.",
    "eligibilityItem6": "Pekerja asing juga boleh memohon; deposit 50% diperlukan.",
    "nameLabel": "Penerima",
    "namePlaceholder": "Masukkan nama",
    "phoneLabel": "Nombor telefon Malaysia",
    "phonePlaceholder": "012-345 6789",
    "stateLabel": "Negeri penghantaran",
    "statePlaceholder": "Pilih negeri",
    "submitButton": "Hantar melalui WhatsApp",
    "fineprint": "Harga direkodkan daripada semakan 2026-05-13 dan dipaparkan dalam Ringgit Malaysia RM.",
    "uploadIcLabel": "Muat naik IC",
    "uploadSalaryLabel": "Muat naik slip gaji terkini",
    "uploadBankLabel": "Muat naik bank statement terkini",
    "noFileSelected": "Belum pilih fail",
    "countSuffix": "model",
    "noResultsTitle": "Tiada model sepadan",
    "noResultsCopy": "Cuba kata carian atau sumber lain.",
    "noResultsBadge": "Tiada hasil",
    "noPrice": "Tiada harga",
    "priceMarket": "Malaysia",
    "priceKind": "harga jualan",
    "termSuffix": "bulan",
    "feeZero": "Faedah bulanan 0%",
    "feePrefix": "Faedah bulanan",
    "officialPrice": "Harga rasmi",
    "officialFrom": "Harga rasmi bermula",
    "usedPrice": "Harga second hand",
    "latestTag": "Pilihan terkini",
    "latestSubtitle": "Model telefon baru paling terkini dipaparkan di depan supaya pelanggan cepat bandingkan harga mula, bayaran sehari, storan dan warna.",
    "latestFrom": "Dari",
    "latestMonthly": "Sehari",
    "latestStorage": "Storan",
    "latestColors": "Warna",
    "latestSelectButton": "Pilih model terkini",
    "latestBadge": "Terkini",
    "selectedBadge": "Dipilih",
    "heroRentalLabel": "Pakej Sewa Telefon",
    "heroDailyLabel": "Sewa harian terendah",
    "malaysianCitizen": "Warganegara Malaysia",
    "nonMalaysianCitizen": "Bukan warganegara Malaysia",
    "deposit40": "Deposit 40%",
    "deposit50": "Deposit 50%",
    "submittingLabel": "Sedang muat naik...",
    "promoTag": "Video promosi",
    "promoTitle": "Selamat datang, biar kami bantu anda",
    "promoCopy": "Sebarang pertanyaan boleh hubungi WhatsApp",
    "whatsappCta": "Tanya WhatsApp",
    "dailyFromLabel": "Terendah sehari"
  }
} as const;

export const phones = [
  {
    "brand": "Apple",
    "model": "iPhone 17 Pro Max",
    "spec": "Pro Max 6.9-inch",
    "source": "Apple Malaysia",
    "type": "Official",
    "tone": "linear-gradient(145deg, #1f2937, #9ca3af)",
    "noteKey": "officialPrice",
    "colors": [
      {
        "zh": "银色",
        "en": "Silver",
        "ms": "Perak",
        "value": "#d9d6cf",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      },
      {
        "zh": "深蓝色",
        "en": "Deep Blue",
        "ms": "Biru Gelap",
        "value": "#1f2d42",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_blue__li170wg4gkae_large.jpg"
      },
      {
        "zh": "宇宙橙色",
        "en": "Cosmic Orange",
        "ms": "Oren Kosmik",
        "value": "#d8783f",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_orange__cr2oq3n1dwk2_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB",
        "price": 5999
      },
      {
        "label": "512GB",
        "price": 6999
      },
      {
        "label": "1TB",
        "price": 7999
      },
      {
        "label": "2TB",
        "price": 9999
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "iPhone 17 Pro",
    "spec": "Pro 6.3-inch",
    "source": "Apple Malaysia",
    "type": "Official",
    "tone": "linear-gradient(145deg, #f97316, #1f2937)",
    "noteKey": "officialPrice",
    "colors": [
      {
        "zh": "银色",
        "en": "Silver",
        "ms": "Perak",
        "value": "#d9d6cf",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      },
      {
        "zh": "深蓝色",
        "en": "Deep Blue",
        "ms": "Biru Gelap",
        "value": "#1f2d42",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_blue__li170wg4gkae_large.jpg"
      },
      {
        "zh": "宇宙橙色",
        "en": "Cosmic Orange",
        "ms": "Oren Kosmik",
        "value": "#d8783f",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_orange__cr2oq3n1dwk2_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB",
        "price": 5499
      },
      {
        "label": "512GB",
        "price": 6499
      },
      {
        "label": "1TB",
        "price": 7499
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "iPhone Air",
    "spec": "6.5-inch",
    "source": "Apple Malaysia",
    "type": "Official",
    "tone": "linear-gradient(145deg, #dbeafe, #111827)",
    "noteKey": "officialFrom",
    "colors": [
      {
        "zh": "天蓝色",
        "en": "Sky Blue",
        "ms": "Biru Langit",
        "value": "#c9d9e8",
        "image": "https://www.apple.com/v/iphone-air/e/images/overview/product-viewer/color_static_ultramarine__cgfuoct82biu_large.jpg"
      },
      {
        "zh": "浅金色",
        "en": "Light Gold",
        "ms": "Emas Cerah",
        "value": "#e6dac1",
        "image": "https://www.apple.com/v/iphone-air/e/images/overview/product-viewer/color_static_gold__d1p7qgdkczo2_large.jpg"
      },
      {
        "zh": "云白色",
        "en": "Cloud White",
        "ms": "Putih Awan",
        "value": "#f4f1ea",
        "image": "https://www.apple.com/v/iphone-air/e/images/overview/product-viewer/color_static_white__bsqapwl67oj6_large.jpg"
      },
      {
        "zh": "太空黑色",
        "en": "Space Black",
        "ms": "Hitam Angkasa",
        "value": "#1f232a",
        "image": "https://www.apple.com/v/iphone-air/e/images/overview/product-viewer/color_static_black__bavqefsedg82_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB",
        "price": 4999
      },
      {
        "label": "512GB",
        "price": 5999
      },
      {
        "label": "1TB",
        "price": 6999
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "iPhone 17",
    "spec": "6.3-inch",
    "source": "Apple Malaysia",
    "type": "Official",
    "tone": "linear-gradient(145deg, #bfdbfe, #64748b)",
    "noteKey": "officialFrom",
    "colors": [
      {
        "zh": "雾蓝色",
        "en": "Mist Blue",
        "ms": "Biru Kabus",
        "value": "#bdd5e7",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_mist_blue__700uff6zu2qa_large.jpg"
      },
      {
        "zh": "薰衣草紫色",
        "en": "Lavender",
        "ms": "Lavender",
        "value": "#d3c4e6",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_lavender__bcaie9a8npj6_large.jpg"
      },
      {
        "zh": "鼠尾草绿色",
        "en": "Sage",
        "ms": "Sage",
        "value": "#b9c8b9",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_sage__cr1jt90v1yoi_large.jpg"
      },
      {
        "zh": "白色",
        "en": "White",
        "ms": "Putih",
        "value": "#f4f2ee",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      },
      {
        "zh": "黑色",
        "en": "Black",
        "ms": "Hitam",
        "value": "#22262d",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_black__fzuhc3kqvmq2_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB",
        "price": 3999
      },
      {
        "label": "512GB",
        "price": 4999
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "iPhone 17e",
    "spec": "6.1-inch",
    "source": "Apple Malaysia",
    "type": "Official",
    "tone": "linear-gradient(145deg, #fbcfe8, #111827)",
    "noteKey": "officialFrom",
    "colors": [
      {
        "zh": "柔粉色",
        "en": "Soft Pink",
        "ms": "Merah Jambu Lembut",
        "value": "#f1c6cf",
        "image": "https://www.apple.com/v/iphone-17e/b/images/overview/durability/caption-tile-gallery/colors__b1yu552rgbte_large.jpg"
      },
      {
        "zh": "白色",
        "en": "White",
        "ms": "Putih",
        "value": "#f4f2ee",
        "image": "https://www.apple.com/v/iphone-17e/b/images/overview/durability/caption-tile-gallery/colors__b1yu552rgbte_large.jpg"
      },
      {
        "zh": "黑色",
        "en": "Black",
        "ms": "Hitam",
        "value": "#22262d",
        "image": "https://www.apple.com/v/iphone-17e/b/images/overview/durability/caption-tile-gallery/colors__b1yu552rgbte_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB",
        "price": 2999
      },
      {
        "label": "512GB",
        "price": 3999
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 17 Pro Max",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB XA",
        "price": 5080,
        "cost": 4880
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 17 Pro",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB XA",
        "price": 4760,
        "cost": 4560
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 16 Pro Max",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB ZP",
        "price": 3750,
        "cost": 3550
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 16 Pro",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB ZP",
        "price": 3150,
        "cost": 2950
      },
      {
        "label": "256GB LL",
        "price": 2950,
        "cost": 2750
      },
      {
        "label": "256GB ZP",
        "price": 3450,
        "cost": 3250
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 16 Plus",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      }
    ],
    "capacities": []
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 16",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      }
    ],
    "capacities": []
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 15 Pro Max",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "256GB ZP",
        "price": 3000,
        "cost": 2800
      },
      {
        "label": "512GB LL",
        "price": 2650,
        "cost": 2450
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 15 Pro",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "1TB ZP",
        "price": 2980,
        "cost": 2780
      },
      {
        "label": "128GB LL",
        "price": 1900,
        "cost": 1700
      },
      {
        "label": "128GB ZP",
        "price": 2350,
        "cost": 2150
      },
      {
        "label": "256GB LL",
        "price": 2200,
        "cost": 2000
      },
      {
        "label": "256GB ZP",
        "price": 2660,
        "cost": 2460
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 15 Plus",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB ZP",
        "price": 2150,
        "cost": 1950
      },
      {
        "label": "256GB LL",
        "price": 2150,
        "cost": 1950
      },
      {
        "label": "256GB ZP",
        "price": 2400,
        "cost": 2200
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 15",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB LL",
        "price": 1600,
        "cost": 1400
      },
      {
        "label": "128GB ZP",
        "price": 1850,
        "cost": 1650
      },
      {
        "label": "256GB LL",
        "price": 1950,
        "cost": 1750
      },
      {
        "label": "256GB ZP",
        "price": 2210,
        "cost": 2010
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 14 Pro Max",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB ZP",
        "price": 2200,
        "cost": 2000
      },
      {
        "label": "256GB LL",
        "price": 2200,
        "cost": 2000
      },
      {
        "label": "256GB ZP",
        "price": 2500,
        "cost": 2300
      },
      {
        "label": "512GB LL",
        "price": 2300,
        "cost": 2100
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 14 Pro",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "1TB LL",
        "price": 2100,
        "cost": 1900
      },
      {
        "label": "128GB ZP",
        "price": 1850,
        "cost": 1650
      },
      {
        "label": "256GB LL",
        "price": 1800,
        "cost": 1600
      },
      {
        "label": "256GB ZP",
        "price": 2200,
        "cost": 2000
      },
      {
        "label": "512GB ZP",
        "price": 2330,
        "cost": 2130
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 14 Plus",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB LL",
        "price": 1420,
        "cost": 1220
      },
      {
        "label": "128GB ZP",
        "price": 1590,
        "cost": 1390
      },
      {
        "label": "256GB LL",
        "price": 1610,
        "cost": 1410
      },
      {
        "label": "256GB ZP",
        "price": 1790,
        "cost": 1590
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 14",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB ZP",
        "price": 1430,
        "cost": 1230
      },
      {
        "label": "256GB LL",
        "price": 1480,
        "cost": 1280
      },
      {
        "label": "256GB ZP",
        "price": 1660,
        "cost": 1460
      },
      {
        "label": "512GB ZP",
        "price": 1750,
        "cost": 1550
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 13 Pro Max",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "1TB LL",
        "price": 2080,
        "cost": 1880
      },
      {
        "label": "1TB ZP",
        "price": 2110,
        "cost": 1910
      },
      {
        "label": "128GB LL",
        "price": 1650,
        "cost": 1450
      },
      {
        "label": "128GB ZP",
        "price": 1680,
        "cost": 1480
      },
      {
        "label": "256GB LL",
        "price": 1880,
        "cost": 1680
      },
      {
        "label": "256GB ZP",
        "price": 1910,
        "cost": 1710
      },
      {
        "label": "512GB LL",
        "price": 1980,
        "cost": 1780
      },
      {
        "label": "512GB ZP",
        "price": 2010,
        "cost": 1810
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 13 Pro",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17-pro/e/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB LL",
        "price": 1500,
        "cost": 1300
      },
      {
        "label": "128GB ZP",
        "price": 1530,
        "cost": 1330
      },
      {
        "label": "256GB LL",
        "price": 1630,
        "cost": 1430
      },
      {
        "label": "256GB ZP",
        "price": 1660,
        "cost": 1460
      },
      {
        "label": "512GB LL",
        "price": 1730,
        "cost": 1530
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 13 Mini",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB LL",
        "price": 1020,
        "cost": 820
      },
      {
        "label": "128GB ZP",
        "price": 1050,
        "cost": 850
      },
      {
        "label": "256GB LL",
        "price": 1120,
        "cost": 920
      },
      {
        "label": "256GB ZP",
        "price": 1150,
        "cost": 950
      }
    ]
  },
  {
    "brand": "Apple",
    "model": "Used iPhone 13",
    "spec": "Second Hand - Grade A+ - 3 Month Warranty",
    "source": "EDCOM TELESHOP",
    "type": "Used",
    "tone": "linear-gradient(145deg, #f8fafc, #1f2937)",
    "noteKey": "usedPrice",
    "colors": [
      {
        "zh": "现货颜色",
        "en": "Stock Color",
        "ms": "Warna Stok",
        "value": "#d8d5ce",
        "image": "https://www.apple.com/v/iphone-17/e/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"
      }
    ],
    "capacities": [
      {
        "label": "128GB LL",
        "price": 1210,
        "cost": 1010
      },
      {
        "label": "128GB ZP",
        "price": 1240,
        "cost": 1040
      },
      {
        "label": "256GB LL",
        "price": 1310,
        "cost": 1110
      },
      {
        "label": "256GB ZP",
        "price": 1340,
        "cost": 1140
      },
      {
        "label": "512GB LL",
        "price": 1410,
        "cost": 1210
      }
    ]
  }
] satisfies Phone[];

export const modelPhotos = {
  "iPhone 17 Pro Max": "/assets/phones/official-polished/iphone-17-pro-max.png",
  "iPhone 17 Pro": "/assets/phones/official-polished/iphone-17-pro.png",
  "iPhone Air": "/assets/phones/official-polished/iphone-air.png",
  "iPhone 17": "/assets/phones/official-polished/iphone-17.png",
  "iPhone 17e": "/assets/phones/official-polished/iphone-17e.png",
  "iPhone 16 Pro Max": "/assets/phones/iphone-16-pro-max.png",
  "iPhone 16 Pro": "/assets/phones/iphone-16-pro.png",
  "iPhone 16 Plus": "/assets/phones/iphone-16-plus.png",
  "iPhone 16": "/assets/phones/iphone-16.png",
  "iPhone 15 Pro Max": "/assets/phones/iphone-15-pro-max-clean.png",
  "iPhone 15 Pro": "/assets/phones/iphone-15-pro.png",
  "iPhone 15 Plus": "/assets/phones/iphone-15-plus.png",
  "iPhone 15": "/assets/phones/iphone-15.png",
  "iPhone 14 Pro Max": "/assets/phones/iphone-14-pro-max.png",
  "iPhone 14 Pro": "/assets/phones/iphone-14-pro.png",
  "iPhone 14 Plus": "/assets/phones/iphone-14-plus.png",
  "iPhone 14": "/assets/phones/iphone-14.png",
  "iPhone 13 Pro Max": "/assets/phones/iphone-13-pro-max.png",
  "iPhone 13 Pro": "/assets/phones/iphone-13-pro.png",
  "iPhone 13 Mini": "/assets/phones/iphone-13-mini.png",
  "iPhone 13": "/assets/phones/iphone-13.png"
} satisfies Record<string, string>;

export const terms = [
  {
    "months": 4,
    "rate": 0.15,
    "rentMultiplier": 1.42
  },
  {
    "months": 5,
    "rate": 0.15,
    "rentMultiplier": 1.4599972215
  },
  {
    "months": 6,
    "rate": 0.15,
    "rentMultiplier": 1.4999972215
  },
  {
    "months": 7,
    "rate": 0.15,
    "rentMultiplier": 1.5999944429
  },
  {
    "months": 8,
    "rate": 0.15,
    "rentMultiplier": 1.6499888858
  }
] satisfies InstallmentTerm[];

export const brands = [
  "Apple"
] as const;

export const deliveryStates = [
  "Kuala Lumpur",
  "Selangor",
  "Penang",
  "Johor",
  "Perak",
  "Sabah",
  "Sarawak"
] as const;
