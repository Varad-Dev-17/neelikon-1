import { createFileRoute } from "@tanstack/react-router";
import { ProductUniverse } from "@/components/site/ProductUniverse";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Food, Pharma, Cosmetic & Specialty Colourants | Neelikon" },
      { name: "description", content: "Explore Neelikon's 15 product families: food colours, pharmaceutical colourants, cosmetic pigments, pearlescent pigments, fluorescent dyes and more." },
      { property: "og:title", content: "Neelikon product portfolio" },
      { property: "og:description", content: "Fifteen colourant families for food, pharma, cosmetics and industry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <main className="pt-16">
      <ProductUniverse heading="h1" />
      <FinalCta />
    </main>
  ),
});
