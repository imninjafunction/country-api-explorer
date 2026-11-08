import type { Country } from "@/lib/types";

const fmt = new Intl.NumberFormat("en-US");
const dim = "text-slate-500 dark:text-slate-400";

function Stat({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-white/5">
      <dt className={`text-xs ${dim}`}>{label}</dt>
      <dd className="mt-0.5 truncate text-base font-semibold" title={value}>
        {value || "—"}
      </dd>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-3" aria-busy="true" aria-label="Loading country">
      <div className="flex items-center gap-3">
        <div className="h-10 w-16 rounded bg-slate-200 dark:bg-white/10" />
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-3 w-24 rounded bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 rounded-lg bg-slate-200 dark:bg-white/10" />
        ))}
      </div>
      <div className="h-24 rounded-lg bg-slate-200 dark:bg-white/10" />
    </div>
  );
}

export default function CountryDetails({
  country,
  error,
  loading,
}: {
  country: Country | null;
  error: string | null;
  loading: boolean;
}) {
  const rows: [string, string | undefined][] = country
    ? [
        [
          "Currency",
          country.currencies
            ?.map((c) => `${c.code}, ${c.name}${c.symbol ? ` (${c.symbol})` : ""}`)
            .join("; "),
        ],
        ["Languages", country.languages?.map((l) => l.name).join(", ")],
        ["Region", [country.region, country.subregion].filter(Boolean).join(", ")],
        [
          "Density",
          country.populationDensity
            ? `${fmt.format(Math.round(country.populationDensity))} / km²`
            : undefined,
        ],
        ["Timezones", country.timezones?.join(", ")],
        ["Calling code", country.callingCodes?.map((c) => `+${c}`).join(", ")],
        ["Domain", country.topLevelDomain?.join(", ")],
        ["Demonym", country.demonym],
        ["Borders", country.borders?.length ? country.borders.join(", ") : "None"],
      ]
    : [];

  return (
    <section
      aria-live="polite"
      className="overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-slate-900"
    >
      <header className="border-b border-black/10 bg-black/[0.03] px-3 py-2 text-sm font-medium dark:border-white/10 dark:bg-white/5">
        Country details
      </header>
      <div className="p-4">
        {loading ? (
          <Skeleton />
        ) : error ? (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : !country ? (
          <div className="py-4 text-center">
            <p className="font-medium">Pick a country to get started</p>
            <p className={`mt-1 text-sm ${dim}`}>
              Click the map or use the search box. Try India, Brazil or Japan.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-3">
              {country.flags?.png && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name}`}
                  className="h-10 rounded border border-black/10 shadow-sm dark:border-white/10"
                />
              )}
              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold">{country.name}</h2>
                <p className={`truncate text-sm ${dim}`}>
                  {country.nativeName} · {country.alpha2Code} / {country.alpha3Code}
                </p>
              </div>
            </div>
            <dl className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Stat label="Capital" value={country.capital} />
              <Stat
                label="Population"
                value={country.population !== undefined ? fmt.format(country.population) : undefined}
              />
              <Stat
                label="Area"
                value={country.area ? `${fmt.format(country.area)} km²` : undefined}
              />
            </dl>
            <dl className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
              {rows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-black/10 py-1.5 text-sm dark:border-white/10"
                >
                  <dt className={dim}>{k}</dt>
                  <dd className="text-right">{v || "—"}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>
    </section>
  );
}
