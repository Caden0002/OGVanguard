import { WHALES, LEADERS } from "../content.js";
import { SectionLabel } from "./SectionLabel.jsx";

const chipListClass = "flex list-none flex-wrap gap-3 p-0";
const chipItemClass =
  "rounded-full border-2 border-slate-900 bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-900";

export function WhalesSection() {
  return (
    <section id="whales" aria-labelledby="whales-heading">
      <SectionLabel>Collectors</SectionLabel>
      <h2
        id="whales-heading"
        className=" font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-4xl"
      >
        Big Daddy Whales <span aria-hidden="true">🐋</span>
      </h2>
      <p className="mt-4 mb-6 max-w-2xl text-sm text-slate-600">
        Shout-out to the people that keeps the community going.
      </p>
      <ul className={chipListClass}>
        {LEADERS.map((name) => (
          <li key={name} className={chipItemClass}>
            {name}
          </li>
        ))}
      </ul>
      <p className="mt-8 mb-6 max-w-2xl text-sm text-slate-600">
        钱可以赚回来的
      </p>
      <ul className={chipListClass}>
        {WHALES.map((name) => (
          <li key={name} className={chipItemClass}>
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
