import { BUY_OPTIONS } from "../content.js";
import { ExternalTextLink } from "./ExternalTextLink.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

export function BuySection() {
  return (
    <section
      id="buy"
      className="scroll-mt-28 md:scroll-mt-32"
      aria-labelledby="buy-heading"
    >
      <SectionLabel>Binders · deals</SectionLabel>
      <h2
        id="buy-heading"
        className="mb-4 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-4xl"
      >
        Buy cards
      </h2>
      <p className="mb-8 max-w-2xl text-slate-600">
        This product has not been reviewed by the Monetary Authority of
        Singapore.{" "}
      </p>
      <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        {BUY_OPTIONS.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-2 font-black italic text-lg text-slate-900">
              {item.title}
            </h3>
            <p className="mb-4 text-sm text-slate-600">{item.detail}</p>
            {item.href ? (
              <ExternalTextLink href={item.href}>
                {item.linkLabel ?? "Open link →"}
              </ExternalTextLink>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
