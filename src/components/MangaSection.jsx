import {
  COMMUNITY_DECKLIST,
  MANGA,
  ANIME,
  MONTHLY_BUSHIROAD,
} from "../content.js";
import { SectionLabel } from "./SectionLabel.jsx";
import { SkewCta } from "./SkewCta.jsx";

function InfoCard({ headingId, title, href, cta, variant }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
      <div className="min-w-0 flex-1">
        <h2
          id={headingId}
          className="mb-2 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-3xl"
        >
          {title}
        </h2>
      </div>
      <SkewCta href={href} external={true} variant={variant}>
        {cta}
      </SkewCta>
    </div>
  );
}

export function MangaSection() {
  return (
    <section id="meta" aria-labelledby="meta-heading">
      <SectionLabel>Mangas & Anime</SectionLabel>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InfoCard
          headingId="meta-heading"
          title={MANGA.title}
          href={MANGA.href}
          cta="→"
          variant="primary"
        />
        <InfoCard
          headingId="community-decklist-heading"
          title={ANIME.title}
          href={ANIME.href}
          cta="→"
          variant="secondary"
        />
        <InfoCard
          headingId="community-decklist-heading"
          title={MONTHLY_BUSHIROAD.title}
          body={MONTHLY_BUSHIROAD.body}
          href={MONTHLY_BUSHIROAD.href}
          cta="→"
          variant="primary"
        />
      </div>
    </section>
  );
}
