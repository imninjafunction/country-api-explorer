import { FAQ, STEPS } from "@/lib/content";

export default function AboutSection() {
  return (
    <div className="w-full px-12 py-12">
      <section aria-labelledby="how">
        <h2 id="how" className="text-2xl font-semibold tracking-tight">
          How it works
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-slate-900"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 font-medium">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq" className="mt-12">
        <h2 id="faq" className="text-2xl font-semibold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-black/10 rounded-xl border border-black/10 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-slate-900">
          {FAQ.map((f) => (
            <details key={f.q} className="group px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-slate-400 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
