import { ONGOING_EVENTS } from "../content.js";
import { SkewCta } from "./SkewCta.jsx";

export function EventBanner() {
  if (ONGOING_EVENTS.length === 0) return null;

  return (
    <aside aria-label="Featured events">
      <div className="divide-y divide-white/10">
        {ONGOING_EVENTS.map((event) => (
          <article
            key={event.title}
            className="relative overflow-hidden border-y border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"
          >
            <div
              className="pointer-events-none absolute -left-16 top-1/2 z-0 h-48 w-48 -translate-y-1/2 rounded-full bg-blue-500/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-10 top-0 z-0 h-32 w-32 rounded-full bg-sky-400/10 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-[12%] z-0 hidden w-px -skew-x-12 bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block"
              aria-hidden
            />

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-8 text-center md:px-10 md:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
              <div className="min-w-0 max-w-2xl">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.24em] text-sky-200">
                  <span
                    className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400"
                    aria-hidden
                  />
                  {event.label}
                </p>
                <h2 className="font-black uppercase italic leading-tight tracking-tight text-white max-md:text-3xl md:text-4xl">
                  {event.title}
                </h2>
                {event.detail ? (
                  <p className="mt-3 text-base text-slate-300 md:text-lg">
                    {event.detail}
                  </p>
                ) : null}
                {event.highlight ? (
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-300/90">
                    {event.highlight}
                  </p>
                ) : null}
              </div>

              {event.href ? (
                <div className="shrink-0 max-md:w-full max-md:max-w-xs">
                  <SkewCta href={event.href} external={true} variant="secondary">
                    {event.cta ?? "Learn more"}
                  </SkewCta>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
