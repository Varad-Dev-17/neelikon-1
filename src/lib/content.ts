const U = "https://neelikon.com/wp-content/uploads";

export const LOGO = `${U}/2025/04/Neelikon-Colours-Glob-Logo-With-.png`;

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
  { slug: "one-world-one-quality", name: "One World, One Quality Colours", img: `${U}/2025/09/One-World-One-Quality-Colours.png`, group: "Food", source: `${S}/one-world-one-quality.php`, blurb: "High-purity, low-impurity colours tested to match JECFA, USA, Europe, Japan, China and India regulations as applicable.", intro: "A range of high-purity colours with low impurities, tested explicitly to match six regulatory authorities — JECFA, USA, Europe, Japan, China and India as applicable — with a mandatory impurity and test profile for every product." },
  { slug: "natural-food", name: "Natural Food Colours", img: `${U}/2025/09/Natural-Food-Colourants.png`, group: "Food", source: `${S}/natural-food-colours.php`, blurb: "NeeliNatural colours extracted from plants, fruits and vegetables.", intro: "Offered under the brand NeeliNatural, these colours are extracted from plants, fruits and vegetables. Neelikon also offers customised natural colour blends with tailor-made shades and batch-to-batch consistency." },
  { slug: "synthetic-food", name: "Synthetic Food Colours", img: `${U}/2025/09/Synthetic-Food-Colours.png`, group: "Food", source: `${S}/synthetic-food-colours.php`, blurb: "Water-soluble colours, blends, lakes and granular grades for food." },
  { slug: "pharma", name: "Pharmaceutical Colourants", img: `${U}/2025/09/Pharmaceutical-Colourants.png`, group: "Pharma", source: `${S}/pharmaceutical-colours.php`, blurb: "Colourants for tablets, syrups and ointments, supported by analytical testing.", intro: "High-purity colourants for tablets, syrups and ointments, including finely textured water-insoluble lakes suitable for tablet coatings and high-purity iron oxides and titanium dioxide." },
  { slug: "cosmetic", name: "Cosmetic Pigments", img: `${U}/2025/09/Cosmetic-Pigments.png`, group: "Cosmetics", source: `${S}/cosmetic-pigments.php`, blurb: "Lavanya dyes, lakes and pigments for decorative cosmetics.", intro: "Lavanya by Neelikon covers cosmetic dyes, lakes and pigments for decorative cosmetics — aluminium, barium, calcium and talc lakes made with proprietary technology for soft, fine particles." },
  { slug: "personal-home", name: "Personal Care & Home Care Colourants", img: `${U}/2025/09/Personal-Care-Home-Care-Colourants.png`, group: "Cosmetics", source: `${S}/personal-home-care-colours.php`, blurb: "Lavanya water- and solvent-soluble dyes and dispersions for personal and home care.", intro: "Under the Lavanya brand: water-soluble and solvent-soluble organic dyes in powder form, plus aqueous pigment dispersions in paste form for personal care, toiletry and home care products." },
  { slug: "surface-treated", name: "Surface-Treated Pigments", img: `${U}/2025/09/Surface-Treated-Pigments.png`, group: "Cosmetics", source: `${S}/surface-treated-pigments.php`, blurb: "Surface-treated pigments for cosmetic applications." },
  { slug: "lip-paste", name: "Ready-Mix Paste for Lip Care", img: `${U}/2025/09/Ready-Mix-Paste-for-Lip-Care.png`, group: "Cosmetics", source: `${S}/ready-mix-paste-for-lip-care.php`, blurb: "Ready-to-use colour pastes for lip-care formulations.", intro: "Ready-mix pastes in unique, vibrant shades, made with proprietary technology for lip-care applications." },
  { slug: "pearlescent", name: "Pearlescent Pigments", img: `${U}/2025/09/Pearlescent-Pigments.png`, group: "Cosmetics", source: `${S}/pearlescent-pigments.php`, blurb: "Coated mica platelets for colour and lustre effects.", intro: "Coated mica platelets that add colour and lustre to eye shadow, blush, nail paint and more — smaller particles give a satin sheen, larger ones sparkle." },
  { slug: "white-no-tio2", name: "White Pigments Without Titanium Dioxide", img: `${U}/2025/09/White-Pigments-without-TiO2.png`, group: "Food", source: `${S}/white-pigments-without-titanium-dioxide.php`, blurb: "White pigment options formulated without titanium dioxide." },
  { slug: "red3-alt", name: "Alternatives for FD&C Red 3", img: `${U}/2025/09/Alternatives-For-FD-C-Red-3.png`, group: "Food", source: `${S}/alternatives-for-fd-c-red-3.php`, blurb: "Natural and synthetic alternatives as the US FDA revokes FD&C Red No. 3.", intro: "The US FDA has revoked FD&C Red No. 3 (CI 45430) for food and ingested drugs, with deadlines of 15 January 2027 (food) and 18 January 2028 (ingested drugs). Neelikon offers natural and synthetic alternatives for reformulation." },
  { slug: "natural-lakes", name: "Synthetic Aluminium Lakes from Natural Colours", img: `${U}/2025/09/Synthetic-Al-Lakes-From-Natural-Colours.png`, group: "Pharma", source: `${S}/synthetic-al-lakes-from-natural-colours.php`, blurb: "Aluminium lakes produced from natural colours." },
  { slug: "fluorescent", name: "Fluorescent & Solvent Dyes", img: `${U}/2025/09/Fluorescent-and-Solvent-Dyes.png`, group: "Specialty", source: `${S}/fluorescent-solvent-dyes.php`, blurb: "Specialty fluorescent and solvent dyes." },
  { slug: "inkjet", name: "Stationery & Inkjet Dyes", img: `${U}/2025/09/Stationery-and-Inkjet-Dyes.png`, group: "Specialty", source: `${S}/dyes-for-stationery-inkjet-inks.php`, blurb: "High-purity dyes for stationery and inkjet ink applications." },
  { slug: "industrial", name: "Industrial Application Colourants", img: `${U}/2025/09/Industrial-Application-Colourants.png`, group: "Specialty", source: `${S}/colours-for-industrial-application.php`, blurb: "High-purity colours and fluorescent dyes for industrial uses, from toys to agriculture." },
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
