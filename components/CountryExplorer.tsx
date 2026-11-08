"use client";

import { useRef, useState } from "react";
import type { ApiCall, Country } from "@/lib/types";
import { COUNTRY_NAMES } from "@/lib/atlas";
import WorldMap from "./WorldMap";
import ApiWindows from "./ApiWindows";
import CountryDetails from "./CountryDetails";

export default function CountryExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [call, setCall] = useState<ApiCall | null>(null);
  const [loading, setLoading] = useState(false);
  const latest = useRef(0);

  async function select(id: string, name: string) {
    const run = ++latest.current;
    setSelectedId(id);
    setSelectedName(name);
    setLoading(true);
    try {
      const res = await fetch(`/api/country/${encodeURIComponent(id)}`);
      const data: ApiCall = await res.json();
      if (run === latest.current) setCall(data);
    } catch {
      if (run === latest.current)
        setCall({
          request: { method: "GET", url: `/api/country/${id}`, headers: {}, body: null },
          response: {
            status: 0,
            statusText: "Network error",
            timeMs: 0,
            headers: {},
            body: { error: `Couldn't load ${name}.` },
          },
        });
    } finally {
      if (run === latest.current) setLoading(false);
    }
  }

  const ok = call && call.response.status >= 200 && call.response.status < 300;
  const country = ok ? (call.response.body as Country) : null;
  const error =
    call && !ok && !loading
      ? `Couldn't load this country (${call.response.status} ${call.response.statusText}). Try another one.`
      : null;

  return (
    <div className="grid flex-1 content-start gap-3 px-12 py-3 lg:min-h-0 lg:content-stretch lg:grid-cols-[3fr_7fr]">
      <div className="order-2 flex flex-col gap-3 lg:order-1 lg:min-h-0">
        <ApiWindows call={call} loading={loading} />
      </div>
      <div className="order-1 flex flex-col gap-3 lg:order-2 lg:min-h-0">
        <div className="relative flex flex-col gap-2 lg:min-h-[260px] lg:flex-1">
          <div className="aspect-[960/500] lg:aspect-auto lg:min-h-0 lg:flex-1">
            <WorldMap selectedId={selectedId} selectedName={selectedName} onSelect={select} />
          </div>
          <div className="order-first sm:max-w-xs lg:absolute lg:bottom-3 lg:left-3 lg:order-none lg:w-60">
            <label htmlFor="country-search" className="sr-only">
              Search for a country
            </label>
            <input
              id="country-search"
              list="country-list"
              value={query}
              placeholder="Search a country…"
              autoComplete="off"
              onChange={(e) => {
                const v = e.target.value;
                setQuery(v);
                const hit = COUNTRY_NAMES.find(
                  (c) => c.name.toLowerCase() === v.trim().toLowerCase(),
                );
                if (hit) select(hit.id, hit.name);
              }}
              className="w-full rounded-lg border border-black/10 bg-white/95 px-3 py-1.5 text-sm shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-white/10 dark:bg-slate-800/95"
            />
            <datalist id="country-list">
              {COUNTRY_NAMES.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="lg:flex-none">
          <CountryDetails country={country} error={error} loading={loading} />
        </div>
      </div>
    </div>
  );
}
