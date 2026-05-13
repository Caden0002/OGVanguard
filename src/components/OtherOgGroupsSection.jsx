import { SG_OG_VANGUARD_GROUPS } from "../content.js";
import { ExternalTextLink } from "./ExternalTextLink.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

export function OtherOgGroupsSection() {
  return (
    <section id="og-groups" aria-labelledby="og-groups-heading">
      <SectionLabel>More communities</SectionLabel>
      <h2
        id="og-groups-heading"
        className="mb-4 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-4xl"
      >
        Other groups in Singapore
      </h2>
      <p className="mb-8 max-w-2xl text-slate-600">
        Clubs and chats outside this site — say hi and find games near you.
      </p>
      <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {SG_OG_VANGUARD_GROUPS.map((group) => (
          <li key={group.href} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <h3 className="mb-1 font-black italic text-lg text-slate-900">
                {group.name}
              </h3>
              <p className="mb-4 flex-1 text-sm text-slate-600">
                {group.detail}
              </p>
              <ExternalTextLink href={group.href}>
                {group.linkLabel}
              </ExternalTextLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
