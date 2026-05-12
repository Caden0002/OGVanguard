import { COMMUNITY_DECKLIST, META } from "../content.js";
import { SectionLabel } from "./SectionLabel.jsx";
import { SkewCta } from "./SkewCta.jsx";

function DecklistCard({ headingId, title, body, href, cta, variant }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
      <div className="min-w-0 flex-1">
        <h2
          id={headingId}
          className="mb-2 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-3xl"
        >
          {title}
        </h2>
        <p className="max-w-xl text-slate-600">{body}</p>
      </div>
      <SkewCta href={href} external={true} variant={variant}>
        {cta}
      </SkewCta>
    </div>
  );
}

export function MetaSection() {
  return (
    <section id="meta" aria-labelledby="meta-heading">
      <SectionLabel>Deck zone</SectionLabel>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DecklistCard
          headingId="meta-heading"
          title={META.title}
          body={META.body}
          href={META.href}
          cta="Browse decklists"
          variant="primary"
        />
        <DecklistCard
          headingId="community-decklist-heading"
          title={COMMUNITY_DECKLIST.title}
          body={COMMUNITY_DECKLIST.body}
          href={COMMUNITY_DECKLIST.href}
          cta="Browse decklists"
          variant="secondary"
        />
      </div>
    </section>
  );
}
