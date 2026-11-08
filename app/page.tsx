import AboutSection from "@/components/AboutSection";
import CountryExplorer from "@/components/CountryExplorer";
import SiteHeader from "@/components/SiteHeader";
import { FAQ } from "@/lib/content";
import { MAKER, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any (web browser)",
      browserRequirements: "Requires JavaScript",
      inLanguage: "en",
      isAccessibleForFree: true,
      author: { "@id": `${MAKER.url}/#org` },
      publisher: { "@id": `${MAKER.url}/#org` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Interactive world map",
        "Country capital, currency, languages and population",
        "Live API request and response viewer",
        "Light and dark themes",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${MAKER.url}/#org`,
      name: MAKER.name,
      url: MAKER.url,
      description: MAKER.tagline,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main className="flex w-full flex-col">
        <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col lg:h-[calc(100dvh-3.5rem)] lg:min-h-[640px]">
          <CountryExplorer />
        </div>
        <AboutSection />
      </main>
      <footer className="border-t border-black/10 px-12 py-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
        <div className="flex flex-col items-center gap-3 text-center xl:flex-row xl:justify-between xl:text-left">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Built by{" "}
              <a className="underline" href={MAKER.url} rel="noopener">
                {MAKER.name}
              </a>
            </p>
            <p className="mt-1 md:whitespace-nowrap">{MAKER.tagline}</p>
          </div>
          <p className="md:whitespace-nowrap">
            Country data from{" "}
            <a className="underline" href="https://countries.dev" rel="noopener noreferrer">
              countries.dev
            </a>
            . Map shapes from{" "}
            <a className="underline" href="https://github.com/topojson/world-atlas" rel="noopener noreferrer">
              world-atlas
            </a>{" "}
            (Natural Earth).
          </p>
        </div>
      </footer>
    </>
  );
}
