export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 px-6 py-8 text-center md:px-10 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
        <a
          href="https://ogvanguard.com/"
          className="text-base uppercase tracking-[0.22em] text-slate-800 no-underline transition hover:text-slate-950 md:text-lg"
        >
          OG Vanguard Singapore
        </a>

        <a
          href="https://github.com/Caden0002/OGVanguard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full p-2 text-slate-700 ring-1 ring-slate-200/90 transition hover:bg-white hover:text-slate-900 hover:ring-slate-300"
          aria-label="OGVanguard project on GitHub (opens in a new tab)"
        >
          <svg className="h-6 w-6 shrink-0" viewBox="0 0 19 19" aria-hidden>
            <use href="/icons.svg#github-icon" />
          </svg>
        </a>

        <p className="text-[0.65rem] uppercase leading-relaxed tracking-[0.14em] text-slate-500 md:text-xs">
          Not affiliated with Bushiroad.
        </p>

        <p className="text-[0.65rem] leading-relaxed tracking-[0.14em] text-slate-500 md:text-xs">
          For more information and contact, please{" "}
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-700 underline decoration-slate-400 underline-offset-2 transition hover:text-slate-900"
          >
            click here
          </a>
        </p>
      </div>
    </footer>
  );
}
