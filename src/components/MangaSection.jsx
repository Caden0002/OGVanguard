import { MEDIA_SECTION } from "../content.js";
import { SectionLabel } from "./SectionLabel.jsx";

const ACCENT_STYLES = {
  sky: {
    badgeClass: "bg-sky-50 text-sky-700",
    hoverClass: "hover:border-sky-300 group-hover:text-sky-800",
  },
  rose: {
    badgeClass: "bg-rose-50 text-rose-700",
    hoverClass: "hover:border-rose-300 group-hover:text-rose-800",
  },
  violet: {
    badgeClass: "bg-violet-50 text-violet-700",
    hoverClass: "hover:border-violet-300 group-hover:text-violet-800",
  },
};

export function MangaSection() {
  return (
    <section id="media" aria-labelledby="media-heading">
      <SectionLabel>{MEDIA_SECTION.sectionLabel}</SectionLabel>
      <h2
        id="media-heading"
        className="mb-4 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-4xl"
      >
        {MEDIA_SECTION.title}
      </h2>
      <p className="mb-8 max-w-2xl text-slate-600">{MEDIA_SECTION.body}</p>

      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {MEDIA_SECTION.items.map((item) => {
          const accent = ACCENT_STYLES[item.accent] ?? ACCENT_STYLES.sky;

          return (
            <li key={item.id} className="h-full">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-labelledby={item.id}
                className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm no-underline transition hover:-translate-y-0.5 hover:shadow-md ${accent.hoverClass}`}
              >
                <span
                  className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] ${accent.badgeClass}`}
                >
                  {item.label}
                </span>

                <h3
                  id={item.id}
                  className="mb-2 font-black italic text-xl leading-snug text-slate-900"
                >
                  {item.title}
                </h3>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>

                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-900 underline decoration-slate-300 underline-offset-4 transition group-hover:decoration-current">
                  {item.cta} →
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
