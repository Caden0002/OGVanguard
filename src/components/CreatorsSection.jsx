import { INFLUENCERS } from "../content.js";
import { ExternalTextLink } from "./ExternalTextLink.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

export function CreatorsSection() {
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
        {INFLUENCERS.map((c) => (
          <li
            key={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="mb-1 font-black italic text-lg text-slate-900">
              {c.label}
            </h3>
            <p className="mb-4 text-sm text-slate-500">{c.handle}</p>
            <ExternalTextLink href={c.href}>
              {c.platform === "youtube" ? "Open YouTube →" : "Open TikTok →"}
            </ExternalTextLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
