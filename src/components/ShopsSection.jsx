import { CARD_SHOPS } from "../content.js";
import { SectionLabel } from "./SectionLabel.jsx";

export function ShopsSection() {
  return (
    <section id="shop" aria-labelledby="shops-heading">
      <SectionLabel>Where we play</SectionLabel>
      <h2
        id="shops-heading"
        className="mb-4 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-4xl"
      >
        Cardshops
      </h2>
      <p className="mb-8 max-w-2xl text-slate-600">
        Thank you for keeping Singapore's OG Vanguard alive ❤️
      </p>
      <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {CARD_SHOPS.map((shop) => (
          <li key={shop.name} className="h-full">
            <a
              href={shop.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${shop.name}, ${shop.area} — open in Google Maps`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm no-underline transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <h3 className="mb-1 font-black italic text-lg text-slate-900 group-hover:text-blue-800">
                {shop.name}
              </h3>
              <p className="text-sm font-semibold text-slate-500">
                {shop.area}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
