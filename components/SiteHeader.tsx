import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-black/10 bg-white/80 px-12 py-2.5 backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.500 18.300 12 21c-2.500-2.700-3.800-5.700-3.800-9S9.500 5.700 12 3z" />
        </svg>
      </span>
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold leading-tight sm:text-lg">
          Country API Explorer
        </h1>
        <p className="hidden truncate text-xs text-slate-500 sm:block dark:text-slate-400">
          Click any country to see its data and the API call behind it
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}
