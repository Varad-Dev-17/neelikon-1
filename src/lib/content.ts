const U = "https://neelikon.com/wp-content/uploads";

export const LOGO = "/logo/logo.png";

export const CONTACT = {
  email: "info@neelikon.com",
  phone: "+91 22 46221415",
  phoneHref: "tel:+912246221415",
  address:
    "D-08, Everest Building, 5th Floor, Pt. Madan Mohan Malaviya Marg, Tardeo Circle, Mumbai, Maharashtra-400034, India.",
};

export type Group = "Food" | "Pharma" | "Cosmetics" | "Specialty";

export type Product = { slug: string; name: string; img: string; group: Group; blurb: string; intro?: string; source: string };

const S = "https://neelikon.com";

export const PRODUCTS: Product[] = [
  { slug: "one-world-one-quality", name: "One World, One Quality Colours", img: "/products/1_one_world.png", group: "Food", source: `${S}/one-world-one-quality.php`, blurb: "High-purity, low-impurity colours tested to match JECFA, USA, Europe, Japan, China and India regulations as applicable.", intro: "A range of high-purity colours with low impurities, tested explicitly to match six regulatory authorities — JECFA, USA, Europe, Japan, China and India as applicable — with a mandatory impurity and test profile for every product." },
  { slug: "natural-food", name: "Natural Food Colours", img: "/products/2_natural_food_colourants.jpg", group: "Food", source: `${S}/natural-food-colours.php`, blurb: "NeeliNatural colours extracted from plants, fruits and vegetables.", intro: "Offered under the brand NeeliNatural, these colours are extracted from plants, fruits and vegetables. Neelikon also offers customised natural colour blends with tailor-made shades and batch-to-batch consistency." },
  { slug: "synthetic-food", name: "Synthetic Food Colours", img: "/products/3_synthetic_food_colours.png", group: "Food", source: `${S}/synthetic-food-colours.php`, blurb: "Water-soluble colours, blends, lakes and granular grades for food." },
  { slug: "pharma", name: "Pharmaceutical Colourants", img: "/products/4_pharmaceutical_colourants.jpg", group: "Pharma", source: `${S}/pharmaceutical-colours.php`, blurb: "Colourants for tablets, syrups and ointments, supported by analytical testing.", intro: "High-purity colourants for tablets, syrups and ointments, including finely textured water-insoluble lakes suitable for tablet coatings and high-purity iron oxides and titanium dioxide." },
  { slug: "cosmetic", name: "Cosmetic Pigments", img: "/products/5_cosmetic_pigments.jpg", group: "Cosmetics", source: `${S}/cosmetic-pigments.php`, blurb: "Lavanya dyes, lakes and pigments for decorative cosmetics.", intro: "Lavanya by Neelikon covers cosmetic dyes, lakes and pigments for decorative cosmetics — aluminium, barium, calcium and talc lakes made with proprietary technology for soft, fine particles." },
  { slug: "personal-home", name: "Personal Care & Home Care Colourants", img: "/products/6_personal_care_and_home _care_colourants.png", group: "Cosmetics", source: `${S}/personal-home-care-colours.php`, blurb: "Lavanya water- and solvent-soluble dyes and dispersions for personal and home care.", intro: "Under the Lavanya brand: water-soluble and solvent-soluble organic dyes in powder form, plus aqueous pigment dispersions in paste form for personal care, toiletry and home care products." },
  { slug: "surface-treated", name: "Surface-Treated Pigments", img: "/products/7_surface_treated_pigments.png", group: "Cosmetics", source: `${S}/surface-treated-pigments.php`, blurb: "Surface-treated pigments for cosmetic applications." },
  { slug: "lip-paste", name: "Ready-Mix Paste for Lip Care", img: "/products/8_ready_mix_paste_for_lip_care.png", group: "Cosmetics", source: `${S}/ready-mix-paste-for-lip-care.php`, blurb: "Ready-to-use colour pastes for lip-care formulations.", intro: "Ready-mix pastes in unique, vibrant shades, made with proprietary technology for lip-care applications." },
  { slug: "pearlescent", name: "Pearlescent Pigments", img: "/products/9_pearlescent_pigments.png", group: "Cosmetics", source: `${S}/pearlescent-pigments.php`, blurb: "Coated mica platelets for colour and lustre effects.", intro: "Coated mica platelets that add colour and lustre to eye shadow, blush, nail paint and more — smaller particles give a satin sheen, larger ones sparkle." },
  { slug: "white-no-tio2", name: "White Pigments Without Titanium Dioxide", img: "/products/10_white_pigments_without_titanium_dioxide.png", group: "Food", source: `${S}/white-pigments-without-titanium-dioxide.php`, blurb: "White pigment options formulated without titanium dioxide." },
  { slug: "red3-alt", name: "Alternatives for FD&C Red 3", img: "/products/11_alternatives_for_FD&C_red_3.png", group: "Food", source: `${S}/alternatives-for-fd-c-red-3.php`, blurb: "Natural and synthetic alternatives as the US FDA revokes FD&C Red No. 3.", intro: "The US FDA has revoked FD&C Red No. 3 (CI 45430) for food and ingested drugs, with deadlines of 15 January 2027 (food) and 18 January 2028 (ingested drugs). Neelikon offers natural and synthetic alternatives for reformulation." },
  { slug: "natural-lakes", name: "Synthetic Aluminium Lakes from Natural Colours", img: "/products/12_synthetic_aluminium_lakes_from_natural_colours.png", group: "Pharma", source: `${S}/synthetic-al-lakes-from-natural-colours.php`, blurb: "Aluminium lakes produced from natural colours." },
  { slug: "fluorescent", name: "Fluorescent & Solvent Dyes", img: "/products/13_fluorescent_and_solvent_dyes.png", group: "Specialty", source: `${S}/fluorescent-solvent-dyes.php`, blurb: "Specialty fluorescent and solvent dyes." },
  { slug: "inkjet", name: "Stationery & Inkjet Dyes", img: "/products/14_stationery_and_inkjet_dyes.png", group: "Specialty", source: `${S}/dyes-for-stationery-inkjet-inks.php`, blurb: "High-purity dyes for stationery and inkjet ink applications." },
  { slug: "industrial", name: "Industrial Application Colourants", img: "/products/15_industrial_application_colourants.jpg", group: "Specialty", source: `${S}/colours-for-industrial-application.php`, blurb: "High-purity colours and fluorescent dyes for industrial uses, from toys to agriculture." },
];

export const INFRA: { title: string; note: string; imgs: string[] }[] = [
  { title: "Laboratory", note: "Application, quality-control and R&D laboratories.", imgs: ["2025/09/Application-Lab-1-800-X-600.jpg", "2025/09/Application-Lab-2-800-X-600.jpg", "2025/09/QC-Lab-1-800-X-600.jpg", "2025/09/QC-Lab-2-800-X-600.jpg", "2025/09/QC-Lab-3-800-X-600.jpg", "2025/10/STP_4241_1-800-X-600.jpg", "2025/09/RD-2-800-X-600.jpg", "2025/09/RD-3-800-X-600.jpg"] },
  { title: "Manufacturing Plant", note: "Facilities in Raigad, Maharashtra and Bharuch, Gujarat.", imgs: ["2025/10/CSZ_4969-800-X-600.jpg", "2025/09/Image-2-800-X-600.jpg", "2025/09/Image-3-800-X-600.jpg", "2025/10/CSZ_4924-800-X-600.jpg"] },
  { title: "Environment, Health & Safety", note: "Fire safety, occupational health and site systems.", imgs: ["2025/09/Fire-Hydrant-Pump-Station-800-X-600.jpg", "2025/09/OHC-2-800-X-600.jpg", "2025/09/STP_4188-800-X-600.jpg", "2025/09/STP_4191-800-X-600.jpg"] },
  { title: "Warehouse", note: "Raw-material and finished-goods storage.", imgs: ["2025/09/CSZ_4642-800-X-600.jpg", "2025/09/CSZ_4662-800-X-600.jpg", "2025/09/CSZ_4671-800-X-600.jpg", "2025/09/RM-Ware-house-2-800-X-600.jpg"] },
  { title: "Wastewater Treatment", note: "Effluent treatment plant and its laboratory.", imgs: ["2025/09/Effluent-Treatment-Plant-Unit-3-800-X-600.jpg", "2025/09/ETP-area-2-800-X-600.jpg", "2025/09/Waste-Water-Treatment-Plant-Lab-800-X-600.jpg"] },
].map((g) => ({ ...g, imgs: g.imgs.map((i) => `${U}/${i}`) }));

export const ABOUT_IMG = {
  a1: `${U}/2022/01/About-Us-Section-1.1.jpg`,
  a2: `${U}/2022/01/About-Us-Section-1.2.jpg`,
  a3: `${U}/2022/01/About-Us-Section-1.3-1.jpg`,
  a4: `${U}/2022/01/About-Us-Section-1.4.jpg`,
  b1: `${U}/2022/01/About-Us-Section-2.1.jpg`,
  b2: `${U}/2022/01/About-Us-Section-2.2.jpg`,
  b3: `${U}/2022/01/About-Us-Section-2.3.jpg`,
  packing: `${U}/2022/04/1.-Packing-1.jpg`,
  factory: `${U}/2022/04/2.-factory.jpg`,
  etp: `${U}/2022/04/3.-ETP.jpg`,
  csr: `${U}/2022/04/4.-CSR.jpg`,
  oneWorld: `${U}/2025/09/One-World-One-Quality-Colours.png`,
};

export const NEWS = [1, 2, 3, 4].map((n) => `${U}/2021/12/News-Event-${n}.jpg`);

export const CERT_LOGOS = [
  `${U}/2025/09/Neelikon-ISO-9001-2015-Logo-225-X-85.png`,
  `${U}/2025/08/Neelikon-2015-Logo-225-X-85.png`,
  `${U}/2025/08/Neelikon-2018-Logo-225-X-85.png`,
  `${U}/2025/05/Neelikon-NABL-Logo-225-X-85.png`,
  `${U}/2024/12/Ecovadis-Logo-225-X-85.jpg`,
  `${U}/2022/02/US-FDA_logo-1.jpg`,
];

export const CERT_LABELS = ["ISO 9001", "ISO 14001", "ISO 45001", "FSSC 22000", "GMP", "REACH", "Halal", "Kosher", "Sedex", "EcoVadis", "US-FDA", "NABL"];

export const GLOBAL_CERT_PILLS = [
  "All",
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "FSSC 22000",
  "GMP",
  "REACH",
  "Halal",
  "Kosher",
  "Sedex",
  "EcoVadis",
  "US-FDA",
  "NABL",
];

export const GLOBAL_CERT_CARDS = [
  // Row 1 (8 cards across)
  {
    id: "reach",
    img: "/global and certifivates/05_reach.png",
    alt: "REACH",
    name: "REACH",
    label: "REACH",
    tags: ["REACH"],
    row: 1,
    isWide: false,
  },
  {
    id: "qs",
    img: "/global and certifivates/06_qs.png",
    alt: "QS",
    name: "QS",
    label: "QS",
    tags: ["GMP", "QS"],
    row: 1,
    isWide: false,
  },
  {
    id: "usfda",
    img: "/global and certifivates/07_usfda_certified_colours.png",
    alt: "USFDA Certified Colours",
    name: "US-FDA",
    label: "USFDA Certified Colours",
    tags: ["US-FDA"],
    row: 1,
    isWide: false,
  },
  {
    id: "one_world",
    img: "/global and certifivates/08_one_world_one_quality_logo.png",
    alt: "One World One Quality",
    name: "One World One Quality",
    label: "One World One Quality",
    tags: ["All"],
    row: 1,
    isWide: false,
  },
  {
    id: "ecovadis",
    img: "/global and certifivates/09_ecovadis.png",
    alt: "EcoVadis",
    name: "EcoVadis",
    label: "EcoVadis",
    tags: ["EcoVadis"],
    row: 1,
    isWide: false,
  },
  {
    id: "sedex_1",
    img: "/global and certifivates/10_sedex.png",
    alt: "Sedex",
    name: "Sedex",
    label: "Sedex",
    tags: ["Sedex"],
    row: 1,
    isWide: false,
  },
  {
    id: "sedex_2",
    img: "/global and certifivates/11_sedex_compliant.png",
    alt: "Sedex Compliant",
    name: "Sedex",
    label: "Sedex",
    tags: ["Sedex"],
    row: 1,
    isWide: false,
  },
  {
    id: "countries",
    img: "/global and certifivates/12_125_plus_countries.png",
    alt: "125+ Countries",
    name: "125+ Countries",
    label: "125+ Countries",
    tags: ["All"],
    row: 1,
    isWide: false,
  },
  // Row 2 (7 cards across: 4 standard + 3 wide ISO cards)
  {
    id: "halal_indonesia",
    img: "/global and certifivates/13_halal_indonesia.png",
    alt: "Halal Indonesia",
    name: "Halal",
    label: "Halal",
    tags: ["Halal"],
    row: 2,
    isWide: false,
  },
  {
    id: "halal_cert",
    img: "/global and certifivates/14_halal_certification.png",
    alt: "Halal Certification",
    name: "Halal",
    label: "Halal",
    tags: ["Halal"],
    row: 2,
    isWide: false,
  },
  {
    id: "kosher",
    img: "/global and certifivates/15_kosher_certified.png",
    alt: "Kosher Certified",
    name: "Kosher",
    label: "Kosher Certified",
    tags: ["Kosher"],
    row: 2,
    isWide: false,
  },
  {
    id: "fssc",
    img: "/global and certifivates/16_fssc_22000.png",
    alt: "FSSC 22000",
    name: "FSSC 22000",
    label: "FSSC 22000",
    tags: ["FSSC 22000", "NABL"],
    row: 2,
    isWide: false,
  },
  {
    id: "iso_9001",
    img: "/global and certifivates/17_iso_9001.png",
    alt: "ISO 9001",
    name: "ISO 9001",
    label: "ISO 9001",
    tags: ["ISO 9001", "NABL"],
    row: 2,
    isWide: true,
  },
  {
    id: "iso_14001",
    img: "/global and certifivates/18_iso_14001.png",
    alt: "ISO 14001",
    name: "ISO 14001",
    label: "ISO 14001",
    tags: ["ISO 14001", "NABL"],
    row: 2,
    isWide: true,
  },
  {
    id: "iso_45001",
    img: "/global and certifivates/19_iso_45001.png",
    alt: "ISO 45001",
    name: "ISO 45001",
    label: "ISO 45001",
    tags: ["ISO 45001", "NABL"],
    row: 2,
    isWide: true,
  },
];
