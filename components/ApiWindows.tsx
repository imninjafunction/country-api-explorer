import type { ReactNode } from "react";
import type { ApiCall } from "@/lib/types";

function Win({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-black/10 bg-white lg:flex-1 dark:border-white/10 dark:bg-slate-900">
      <header className="flex items-center gap-2 border-b border-black/10 bg-black/[0.03] px-3 py-2 text-sm font-medium dark:border-white/10 dark:bg-white/5">
        {title}
        {badge}
      </header>
      <pre className="max-h-64 min-h-0 flex-1 overflow-auto lg:max-h-none whitespace-pre-wrap break-all p-3 font-mono text-xs leading-relaxed">
        {children}
      </pre>
    </section>
  );
}

const dim = "text-slate-500 dark:text-slate-400";

function statusClass(status: number) {
  if (status >= 200 && status < 300)
    return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
  if (status >= 400 && status < 500)
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200";
  return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
}

// Long arrays (like the full response) are trimmed so the window stays readable.
function preview(body: unknown) {
  if (typeof body === "string") return body;
  const json = JSON.stringify(body, null, 2);
  return json.length > 1800 ? json.slice(0, 1800) + "\n  …" : json;
}

export default function ApiWindows({
  call,
  loading,
}: {
  call: ApiCall | null;
  loading: boolean;
}) {
  const empty = <span className={dim}>Click a country on the map…</span>;
  const status = call?.response.status;

  return (
    <>
      <Win title="1. Request headers">
        {call ? (
          <>
            <b className="text-green-600 dark:text-green-400">
              {call.request.method}
            </b>{" "}
            {call.request.url}
            {"\n\n"}
            {Object.entries(call.request.headers).map(([k, v]) => (
              <div key={k}>
                <span className={dim}>{k}:</span> {v}
              </div>
            ))}
          </>
        ) : (
          empty
        )}
      </Win>

      <Win title="2. Payload / body">
        {call ? (
          call.request.body ?? (
            <>
              <span className={dim}>
                {"// A GET request has no body.\n// The country code travels in the URL:"}
              </span>
              {"\n\n"}
              <span className="text-blue-600 dark:text-blue-400">path param</span>
              {"\ncode = "}
              <b>{call.request.url.split("/").pop()}</b>
            </>
          )
        ) : (
          empty
        )}
      </Win>

      <Win
        title="3. Response"
        badge={
          loading ? (
            <span className={`ml-auto text-xs ${dim}`}>loading…</span>
          ) : call ? (
            <span
              className={`ml-auto rounded px-2 py-0.5 font-mono text-xs ${statusClass(status!)}`}
            >
              {status} {call.response.statusText} · {call.response.timeMs} ms
            </span>
          ) : null
        }
      >
        {call ? preview(call.response.body) : empty}
      </Win>
    </>
  );
}
