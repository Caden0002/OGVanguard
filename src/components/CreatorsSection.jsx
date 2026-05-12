import { useState } from "react";
import { INFLUENCERS } from "../content.js";
import { ExternalTextLink } from "./ExternalTextLink.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

const platformLinkLabel = {
  youtube: " YouTube →",
  tiktok: " TikTok →",
  instagram: " Instagram →",
};

const INITIAL_VISIBLE = 3;

export function CreatorsSection() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = INFLUENCERS.length > INITIAL_VISIBLE;
  const visible = expanded
    ? INFLUENCERS
    : INFLUENCERS.slice(0, INITIAL_VISIBLE);

  return (
    <section id="creators" aria-labelledby="creators-heading">
      <SectionLabel>On the feed</SectionLabel>
      <h2
        id="creators-heading"
        className="mb-4 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-4xl"
      >
        Influencers and Models{" "}
      </h2>
      <p className="mb-8 max-w-2xl text-slate-600">
        Clips, collections and tournament gameplays.
      </p>
      <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <li
            key={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="mb-1 font-black italic text-lg text-slate-900">
              {c.label}
            </h3>
            <p className="mb-4 text-sm text-slate-500">{c.handle}</p>
            <ExternalTextLink href={c.href}>
              {platformLinkLabel[c.platform] ?? "Open link →"}
            </ExternalTextLink>
          </li>
        ))}
      </ul>
      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded-full border-1 border-slate-900 bg-white px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-slate-900 shadow-sm transition hover:bg-slate-50"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "View more"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
