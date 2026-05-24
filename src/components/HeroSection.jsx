import { TOURNAMENT, WHATSAPP_COMMUNITY_URL } from "../content.js";
import { SkewCta } from "./SkewCta.jsx";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white px-6 py-16 md:px-12 md:py-24"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        {/* Soft blue bloom in the center */}
        <div className="absolute left-1/2 top-1/2 z-0 aspect-square w-[min(88vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgb(191_219_254/0.85)_0%,rgb(147_197_253/0.5)_32%,rgb(96_165_250/0.22)_52%,transparent_72%)] blur-2xl md:w-[min(78vw,500px)]" />
        <div className="absolute left-1/2 top-1/2 z-0 aspect-square w-[min(42vw,200px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/70 blur-xl md:w-[min(36vw,220px)]" />
        <img
          src="/vg-circle.svg"
          alt=""
          className="animate-vg-circle-spin relative z-[1] w-[min(82vw,420px)] object-contain brightness-[1.22] saturate-[0.82] hue-rotate-[-6deg] contrast-[1.02] drop-shadow-[0_0_36px_rgb(186_230_253/0.75)] md:w-[min(72vw,480px)]"
          decoding="async"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-blue-600 md:text-sm">
          A community for OG-era
        </p>
        <h1
          id="hero-heading"
          className="mb-5 font-black uppercase italic leading-[1.05] tracking-tight text-slate-900 drop-shadow-[0_1px_2px_rgb(255_255_255/0.9)] max-md:text-4xl md:text-6xl md:leading-none"
        >
          Stand up, Vanguard!
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-slate-600 md:text-xl">
          BT01-BT15-LEGION
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <SkewCta
            href={WHATSAPP_COMMUNITY_URL}
            external={true}
            variant="primary"
          >
            Join the scene
          </SkewCta>
          <SkewCta href={TOURNAMENT.href} external={true} variant="secondary">
            See upcoming events
          </SkewCta>
        </div>
      </div>
    </section>
  );
}
