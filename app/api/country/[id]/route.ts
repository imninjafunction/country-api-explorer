import type { ApiCall, Country } from "@/lib/types";

const BASE = "https://countries.dev";
const REQUEST_HEADERS = {
  Accept: "application/json",
  "User-Agent": "country-api-explorer",
};

async function numericToAlpha2(numeric: string): Promise<string | null> {
  const res = await fetch(`${BASE}/countries`, {
    headers: REQUEST_HEADERS,
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;
  const list: Country[] = await res.json();
  const hit = list.find((c) => c.numericCode === numeric);
  return hit?.alpha2Code ?? null;
}

function pick(headers: Headers, names: string[]) {
  const out: Record<string, string> = {};
  for (const n of names) {
    const v = headers.get(n);
    if (v) out[n] = v;
  }
  return out;
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  // The map gives us ISO numeric codes ("356"); the API wants alpha-2 ("IN").
  const code = /^\d+$/.test(id)
    ? await numericToAlpha2(id.padStart(3, "0"))
    : id.toUpperCase();

  const url = `${BASE}/alpha/${code ?? id}`;
  const request: ApiCall["request"] = {
    method: "GET",
    url,
    headers: { Host: "countries.dev", ...REQUEST_HEADERS },
    body: null,
  };

  const started = performance.now();
  try {
    const upstream = await fetch(url, {
      headers: REQUEST_HEADERS,
      cache: "no-store",
    });
    const timeMs = Math.round(performance.now() - started);
    const text = await upstream.text();
    let body: unknown = text;
    try {
      body = JSON.parse(text);
    } catch {}
    const call: ApiCall = {
      request,
      response: {
        status: upstream.status,
        statusText: upstream.statusText,
        timeMs,
        headers: pick(upstream.headers, ["content-type", "cache-control"]),
        body,
      },
    };
    return Response.json(call);
  } catch {
    const call: ApiCall = {
      request,
      response: {
        status: 502,
        statusText: "Bad Gateway",
        timeMs: Math.round(performance.now() - started),
        headers: {},
        body: { error: "Could not reach the countries API." },
      },
    };
    return Response.json(call);
  }
}
