import { useCallback, useEffect, useState } from "react";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";

/** Non-trigger drive art: each entry has equal pick probability (1 / length). */
const NORMAL_CARD_ART = [
  {
    src: "/normal-drive-card.png",
    alt: "Cardfight!! Vanguard normal unit — Dragonic Overlord The Re-birth (Kagero)",
  },
  {
    src: "/normal-bt15-015-gimmel.png",
    alt: "Cardfight!! Vanguard normal unit — Dragon Knight, Gimmel (Kagero)",
  },
  {
    src: "/normal-bt15-s05-overlord-rebirth.png",
    alt: "Cardfight!! Vanguard normal unit — Dragonic Overlord The Re-birth SP (Kagero)",
  },
  {
    src: "/normal-bt15-060-griffin.png",
    alt: "Cardfight!! Vanguard normal unit — Eternal Bringer, Griffin (Kagero)",
  },
  {
    src: "/normal-bt15-061-violence-horn.png",
    alt: "Cardfight!! Vanguard normal unit — Violence Horn Dragon (Kagero)",
  },
  {
    src: "/normal-bt15-s10-burnout.png",
    alt: "Cardfight!! Vanguard normal unit — Dragonic Burnout SP (Kagero)",
  },
];

function pickNormalArt() {
  const i = Math.floor(Math.random() * NORMAL_CARD_ART.length);
  return NORMAL_CARD_ART[i];
}

/** Toy deck: only normals and criticals (no draw / heal / front). */
function makeCardPool() {
  const types = [...Array(20).fill("none"), ...Array(8).fill("critical")];
  return types.map((type, i) => {
    const base = {
      id: `c-${i}-${type}-${Math.random().toString(36).slice(2, 9)}`,
      type,
    };
    if (type === "none") {
      const art = pickNormalArt();
      return { ...base, normalSrc: art.src, normalAlt: art.alt };
    }
    return base;
  });
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function takeCardFromPool(pool, type) {
  const idx = pool.findIndex((c) => c.type === type);
  if (idx === -1) {
    throw new Error(`Deck pool missing type: ${type}`);
  }
  const [card] = pool.splice(idx, 1);
  return card;
}

/**
 * Picks one of four twin-drive outcomes (25% each), then stacks the deck so
 * the first two checks always match that outcome; the rest is shuffled.
 */
function buildTwinDriveDeckForScenario(scenarioIndex) {
  const pool = makeCardPool();
  const plans = [
    ["none", "none"],
    ["critical", "none"],
    ["none", "critical"],
    ["critical", "critical"],
  ];
  const [firstType, secondType] = plans[scenarioIndex];
  const first = takeCardFromPool(pool, firstType);
  const second = takeCardFromPool(pool, secondType);
  const rest = shuffleArray(pool);
  return [first, second, ...rest];
}

const CARD_META = {
  none: {
    label: "Normal (no trigger)",
    short: "Normal",
    stripe: "bg-slate-400",
    panel: "border-slate-300 bg-slate-50",
  },
  critical: {
    label: "Critical",
    short: "Crit",
    stripe: "bg-rose-500",
    panel: "border-rose-400 bg-rose-50",
  },
};

const CRITICAL_CARD_SRC = "/critical-trigger-card.png";

/** Spinner over card art until the image finishes loading (or errors). */
function RevealedCardImage({ src, alt, imageClass, compact }) {
  const [loaded, setLoaded] = useState(false);

  const box =
    compact
      ? "relative min-h-[118px] min-w-[85px]"
      : "relative min-h-[180px] min-w-[126px]";

  return (
    <div className={box}>
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-slate-100/95 transition-opacity duration-200 ease-out ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-busy={!loaded}
        aria-live="polite"
      >
        <span className="sr-only">Loading card art</span>
        <span
          className="h-7 w-7 shrink-0 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900"
          aria-hidden
        />
      </div>
      <img
        src={src}
        alt={alt}
        className={`relative z-0 ${imageClass} transition-opacity duration-200 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        draggable={false}
      />
    </div>
  );
}

/** Standard TCG portrait ratio (e.g. 63×88 mm); keeps placeholder aligned with real cards. */
const CARD_ASPECT_BOX = "aspect-[63/88]";

function DriveCard({ card, flipped, compact = false }) {
  const shell = compact
    ? `flex h-[118px] ${CARD_ASPECT_BOX} w-auto items-center justify-center rounded-xl border-2`
    : `aspect-[3/4] min-h-[180px] rounded-2xl border-2`;

  const imageFrame = `inline-block max-w-full overflow-hidden rounded-xl leading-none shadow-md transition duration-500 [transform-style:preserve-3d] ${
    flipped ? "scale-100 opacity-100" : "scale-95 opacity-90"
  }`;

  const imageClass = compact
    ? "block h-[118px] w-auto max-h-[118px] select-none"
    : "block max-h-[420px] w-auto select-none";

  if (!card) {
    return (
      <div
        className={`border-dashed border-slate-200 bg-slate-50/80 font-medium text-slate-400 ${shell} ${
          compact ? "text-[10px]" : "text-sm"
        }`}
      >
        Waiting…
      </div>
    );
  }
  const m = CARD_META[card.type];

  if (card.type === "none") {
    return (
      <div className={imageFrame}>
        <RevealedCardImage
          key={`${card.id}-${card.normalSrc ?? ""}`}
          src={card.normalSrc ?? "/normal-drive-card.png"}
          alt={
            card.normalAlt ?? "Cardfight!! Vanguard normal unit card (Kagero)"
          }
          imageClass={imageClass}
          compact={compact}
        />
      </div>
    );
  }

  if (card.type === "critical") {
    return (
      <div className={imageFrame}>
        <RevealedCardImage
          key={card.id}
          src={CRITICAL_CARD_SRC}
          alt="Cardfight!! Vanguard Critical Trigger card (Kagero)"
          imageClass={imageClass}
          compact={compact}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden shadow-md transition duration-500 [transform-style:preserve-3d] ${shell} ${
        flipped ? "scale-100 opacity-100" : "scale-95 opacity-90"
      } ${m.panel}`}
    >
      <div
        className={`absolute inset-x-0 top-0 ${compact ? "h-1.5" : "h-2"} ${
          m.stripe
        }`}
        aria-hidden
      />
      <div
        className={`flex h-full flex-col items-center justify-center text-center ${
          compact ? "gap-0.5 p-2 pt-4" : "gap-2 p-4 pt-6"
        }`}
      >
        {!compact ? (
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Drive reveal
          </p>
        ) : (
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">
            Reveal
          </p>
        )}
        <p
          className={`font-black uppercase italic tracking-tight text-slate-900 ${
            compact ? "text-sm leading-tight" : "md:text-xl"
          }`}
        >
          {m.short}
        </p>
        <p
          className={`text-slate-600 ${
            compact ? "line-clamp-2 text-[9px] leading-tight" : "text-xs"
          }`}
        >
          {m.label}
        </p>
      </div>
    </div>
  );
}

function isCritCard(card) {
  return card != null && card.type === "critical";
}

/** Fullscreen clips when both drive checks are critical (50/50 per double-crit round). */
const DOUBLE_CRIT_VIDEO_SRCS = [
  "/feeling-lucky-both-triggers.mov",
  "/feeling-lucky-both-triggers-b.mov",
];

/** Preload card PNGs once on mount (lightweight). */
function useFeelingLuckyImagePreload() {
  useEffect(() => {
    const imageUrls = [
      ...NORMAL_CARD_ART.map((a) => a.src),
      CRITICAL_CARD_SRC,
    ];
    for (const src of imageUrls) {
      const img = new Image();
      img.src = src;
    }
  }, []);
}

/**
 * Only when this round is double-crit (scenario 3), preload the **one** clip
 * that can play (`doubleCritVideoIndex`). Avoids pulling both large .mov files.
 */
function useDoubleCritVideoPreload(scenarioIndex, doubleCritVideoIndex) {
  useEffect(() => {
    if (scenarioIndex !== 3) return undefined;

    const src = DOUBLE_CRIT_VIDEO_SRCS[doubleCritVideoIndex];
    const v = document.createElement("video");
    v.preload = "auto";
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("aria-hidden", "true");
    v.src = src;
    v.style.cssText =
      "position:fixed;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none";
    document.body.appendChild(v);
    v.load();

    return () => {
      v.removeAttribute("src");
      v.load();
      v.remove();
    };
  }, [scenarioIndex, doubleCritVideoIndex]);
}

function newRoundState() {
  const scenarioIndex = Math.floor(Math.random() * 4);
  return {
    scenarioIndex,
    deck: buildTwinDriveDeckForScenario(scenarioIndex),
    drive1: null,
    drive2: null,
    doubleCritVideoIndex:
      scenarioIndex === 3 ? Math.floor(Math.random() * 2) : 0,
  };
}

export function FeelingLuckyPage() {
  const [g, setG] = useState(() => newRoundState());

  const { deck, drive1, drive2, doubleCritVideoIndex, scenarioIndex } = g;

  useFeelingLuckyImagePreload();
  useDoubleCritVideoPreload(scenarioIndex, doubleCritVideoIndex);

  const twinComplete = drive1 && drive2;
  const bothTwinTriggers =
    twinComplete && isCritCard(drive1) && isCritCard(drive2);

  const [bothTriggersPlaybackDone, setBothTriggersPlaybackDone] =
    useState(false);

  const showBothTriggersVideo = bothTwinTriggers && !bothTriggersPlaybackDone;

  const noDoubleTrigger = twinComplete && !bothTwinTriggers;

  const tryAgain = useCallback(() => {
    setG(newRoundState());
    setBothTriggersPlaybackDone(false);
  }, []);

  const canFirst = !drive1 && deck.length > 0;
  const canSecond = drive1 && !drive2 && deck.length > 0;
  const canRevealNext = canFirst || canSecond;

  const doNextReveal = useCallback(() => {
    setG((s) => {
      if (!s.drive1 && s.deck.length > 0) {
        const [top, ...rest] = s.deck;
        return { ...s, drive1: top, deck: rest };
      }
      if (s.drive1 && !s.drive2 && s.deck.length > 0) {
        const [top, ...rest] = s.deck;
        return { ...s, drive2: top, deck: rest };
      }
      return s;
    });
  }, []);

  return (
    <div className="flex min-h-svh flex-col bg-white font-sans text-[17px] leading-relaxed text-slate-600 antialiased max-lg:text-base">
      {showBothTriggersVideo ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Both drive checks hit triggers"
        >
          <video
            key={doubleCritVideoIndex}
            className="max-h-full max-w-full object-contain"
            src={DOUBLE_CRIT_VIDEO_SRCS[doubleCritVideoIndex]}
            preload="auto"
            autoPlay
            playsInline
            muted
            onEnded={() => setBothTriggersPlaybackDone(true)}
            onError={() => setBothTriggersPlaybackDone(true)}
          />
        </div>
      ) : null}
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 md:px-10 md:py-16">
        <h1 className="mb-4 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-4xl">
          Feeling lucky · Twin drive
        </h1>

        <section
          className="mb-8 rounded-2xl border-2 border-slate-900 bg-slate-900 px-5 py-5 text-white shadow-md"
          aria-label="Opponent pass simulation"
        >
          <p className="font-black uppercase italic tracking-tight text-balance text-lg md:text-2xl">
            When zifei gives you 10k '2 pass'
          </p>
        </section>

        <div className="mb-8 grid min-h-[220px] grid-cols-2 gap-0 overflow-hidden rounded-2xl bg-white">
          <div className="flex min-h-[220px] min-w-0 flex-col items-end justify-between gap-4 border-r border-slate-200 p-4 sm:p-6 md:min-h-0 md:flex-row md:items-end md:justify-end md:gap-5 lg:gap-6">
            <div className="shrink-0">
              <p className="mb-1 text-center text-[10px] font-black uppercase tracking-widest text-slate-500 sm:text-xs">
                First check
              </p>
              <div className="flex justify-end">
                <DriveCard card={drive1} flipped={!!drive1} compact />
              </div>
            </div>
            <div className="shrink-0">
              <p className="mb-1 text-center text-[10px] font-black uppercase tracking-widest text-slate-500 sm:text-xs">
                Second check
              </p>
              <div className="flex justify-end">
                <DriveCard card={drive2} flipped={!!drive2} compact />
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center justify-center gap-2 p-4 sm:p-6">
            {!twinComplete ? (
              <>
                <button
                  type="button"
                  disabled={!canRevealNext}
                  onClick={doNextReveal}
                  className="w-fit rounded-full border border-slate-900 bg-slate-900 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide text-white shadow-sm transition enabled:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {canFirst
                    ? "First check"
                    : canSecond
                    ? "Second check"
                    : "No cards"}
                </button>
              </>
            ) : noDoubleTrigger ? (
              <div className="flex max-w-[min(100%,14rem)] flex-col items-center gap-2 text-center">
                <p className="text-xs font-semibold leading-snug text-slate-800">
                  You suck!!
                </p>
                <p className="text-[10px] leading-snug text-slate-600">
                  Zifei can&apos;t be bothered. Twin drive again?
                </p>
                <button
                  type="button"
                  onClick={tryAgain}
                  className="mt-1 w-fit rounded-full border-2 border-slate-900 bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-900 shadow-sm transition hover:bg-slate-100"
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="flex max-w-[min(100%,14rem)] flex-col items-center gap-2 text-center">
                <p className="text-xs font-semibold leading-snug text-slate-800">
                  Good job, Zifei exploded
                </p>
                <button
                  type="button"
                  onClick={tryAgain}
                  className="mt-1 w-fit rounded-full border-2 border-slate-900 bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-900 shadow-sm transition hover:bg-slate-100"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
