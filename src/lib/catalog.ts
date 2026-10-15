import data from "./catalog-data.json";

/** Product tables scraped from the official neelikon.com product pages. CI = Colour Index number (null when not reliably published). */
export type CatalogItem = { name: string; ci: string | null };
export type CatalogGroup = { title: string; items: CatalogItem[] };
export type CatalogTab = { tab: string; groups: CatalogGroup[] };

export const CATALOG = data as Record<string, CatalogTab[]>;
