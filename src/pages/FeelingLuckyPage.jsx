import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
 * Picks a twin-drive outcome: double crit **10%**, each other scenario **30%**.
 * Then stacks the deck so the first two checks match that outcome.
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
function RevealedCardImage({ src, alt, imageClass, compact, onArtReady }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const reportedReady = useRef(false);

  useEffect(() => {
    setLoaded(false);
    reportedReady.current = false;
  }, [src]);

  const markDone = useCallback(() => {
    setLoaded(true);
    if (!reportedReady.current) {
      reportedReady.current = true;
      onArtReady?.();
    }
  }, [onArtReady]);

  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalHeight > 0) {
      markDone();
    }
  }, [src, markDone]);

  const box = compact
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
        ref={imgRef}
        src={src}
        alt={alt}
        className={`relative z-0 ${imageClass} transition-opacity duration-200 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={markDone}
        onError={markDone}
        draggable={false}
      />
    </div>
  );
}

/** Standard TCG portrait ratio (e.g. 63×88 mm); keeps placeholder aligned with real cards. */
const CARD_ASPECT_BOX = "aspect-[63/88]";

function DriveCard({ card, flipped, compact = false, onArtLoaded }) {
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
          onArtReady={onArtLoaded}
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
          onArtReady={onArtLoaded}
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

function needsCardArt(card) {
  return card != null && (card.type === "none" || card.type === "critical");
}

/** Fullscreen clips when both drive checks are critical (uniform random per double-crit round). */
const DOUBLE_CRIT_CLIP_SRCS = [
  "/doubleCrit1.gif",
  "/doubleCrit2.gif",
  "/doubleCrit3.gif",
];

/**
 * `<img>` GIF has no `ended`; overlay closes after this many ms from `load` (one loop each).
 * Tune when swapping files (order matches DOUBLE_CRIT_CLIP_SRCS).
 */
const DOUBLE_CRIT_CLIP_DISPLAY_MS = [2200, 5900, 3000];

/** Preload card PNGs once on mount (lightweight). */
function useFeelingLuckyImagePreload() {
  useEffect(() => {
    const imageUrls = [...NORMAL_CARD_ART.map((a) => a.src), CRITICAL_CARD_SRC];
    for (const src of imageUrls) {
      const img = new Image();
      img.src = src;
    }
  }, []);
}

/**
 * When this round is double-crit (scenario 3), preload only the clip that may show.
 */
function useDoubleCritClipPreload(scenarioIndex, doubleCritVideoIndex) {
  useEffect(() => {
    if (scenarioIndex !== 3) return undefined;

    const src = DOUBLE_CRIT_CLIP_SRCS[doubleCritVideoIndex];
    const img = new Image();
    img.src = src;

    return () => {
      img.src = "";
    };
  }, [scenarioIndex, doubleCritVideoIndex]);
}

/** ~10% double crit (scenario 3); ~30% each for the other three. */
function pickScenarioIndex() {
  const u = Math.random();
  if (u < 0.1) return 3;
  return Math.floor(((u - 0.1) / 0.9) * 3);
}

function newRoundState() {
  const scenarioIndex = pickScenarioIndex();
  return {
    scenarioIndex,
    deck: buildTwinDriveDeckForScenario(scenarioIndex),
    drive1: null,
    drive2: null,
    doubleCritVideoIndex:
      scenarioIndex === 3
        ? Math.floor(Math.random() * DOUBLE_CRIT_CLIP_SRCS.length)
        : 0,
  };
}

export function FeelingLuckyPage() {
  const [g, setG] = useState(() => newRoundState());

  const { deck, drive1, drive2, doubleCritVideoIndex, scenarioIndex } = g;

  useFeelingLuckyImagePreload();
  useDoubleCritClipPreload(scenarioIndex, doubleCritVideoIndex);

  const twinComplete = drive1 && drive2;
  const bothTwinTriggers =
    twinComplete && isCritCard(drive1) && isCritCard(drive2);

  const [bothTriggersPlaybackDone, setBothTriggersPlaybackDone] =
    useState(false);

  const showBothTriggersVideo = bothTwinTriggers && !bothTriggersPlaybackDone;

  const critClipAutoCloseTimerRef = useRef(null);
  const [critClipBuffering, setCritClipBuffering] = useState(true);

  const clearCritClipAutoCloseTimer = useCallback(() => {
    if (critClipAutoCloseTimerRef.current != null) {
      clearTimeout(critClipAutoCloseTimerRef.current);
      critClipAutoCloseTimerRef.current = null;
    }
  }, []);

  const finishBothTriggersClip = useCallback(() => {
    clearCritClipAutoCloseTimer();
    setCritClipBuffering(true);
    setBothTriggersPlaybackDone(true);
  }, [clearCritClipAutoCloseTimer]);

  const onDoubleCritClipLoaded = useCallback(() => {
    setCritClipBuffering(false);
    clearCritClipAutoCloseTimer();
    const ms =
      DOUBLE_CRIT_CLIP_DISPLAY_MS[doubleCritVideoIndex] ??
      DOUBLE_CRIT_CLIP_DISPLAY_MS[0];
    critClipAutoCloseTimerRef.current = setTimeout(() => {
      critClipAutoCloseTimerRef.current = null;
      finishBothTriggersClip();
    }, ms);
  }, [
    clearCritClipAutoCloseTimer,
    doubleCritVideoIndex,
    finishBothTriggersClip,
  ]);

  useEffect(() => {
    return () => clearCritClipAutoCloseTimer();
  }, [clearCritClipAutoCloseTimer]);

  const noDoubleTrigger = twinComplete && !bothTwinTriggers;

  const [slot2ArtReady, setSlot2ArtReady] = useState(false);
  const prevDrive2IdRef = useRef(undefined);

  useLayoutEffect(() => {
    const id = drive2?.id;
    if (id !== prevDrive2IdRef.current) {
      prevDrive2IdRef.current = id;
      if (!drive2) {
        setSlot2ArtReady(false);
        return;
      }
      if (!needsCardArt(drive2)) {
        setSlot2ArtReady(true);
        return;
      }
      setSlot2ArtReady(false);
    }
  }, [drive2]);

  const markSlot2ArtLoaded = useCallback(() => setSlot2ArtReady(true), []);

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
      {scenarioIndex === 3 &&
      drive1 &&
      isCritCard(drive1) &&
      !drive2 &&
      !showBothTriggersVideo ? (
        <img
          key={`warm-${doubleCritVideoIndex}`}
          alt=""
          decoding="async"
          className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
          src={DOUBLE_CRIT_CLIP_SRCS[doubleCritVideoIndex]}
        />
      ) : null}
      {showBothTriggersVideo ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Both drive checks hit triggers"
        >
          <img
            key={drive2?.id}
            alt=""
            decoding="async"
            className={`max-h-full max-w-full object-contain transition-opacity duration-200 ${
              critClipBuffering ? "opacity-0" : "opacity-100"
            }`}
            src={DOUBLE_CRIT_CLIP_SRCS[doubleCritVideoIndex]}
            onLoad={onDoubleCritClipLoaded}
            onError={() => finishBothTriggersClip()}
          />
          {critClipBuffering ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black">
              <span className="sr-only">Loading clip</span>
              <span
                className="h-10 w-10 shrink-0 animate-spin rounded-full border-2 border-zinc-600 border-t-white"
                aria-hidden
              />
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                Loading…
              </p>
            </div>
          ) : null}
          <button
            type="button"
            className="absolute z-[210] flex h-10 w-10 items-center justify-center rounded-full border border-zinc-500/90 bg-zinc-950/85 text-xl font-light leading-none text-zinc-100 shadow-lg transition hover:border-zinc-400 hover:bg-zinc-900 hover:text-white md:h-8 md:w-8 md:text-2xl"
            style={{
              top: "max(0.75rem, env(safe-area-inset-top, 0px))",
              right: "max(0.75rem, env(safe-area-inset-right, 0px))",
            }}
            aria-label="Close clip"
            onClick={() => {
              finishBothTriggersClip();
            }}
          >
            <span aria-hidden>×</span>
          </button>
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
                <DriveCard
                  card={drive2}
                  flipped={!!drive2}
                  compact
                  onArtLoaded={markSlot2ArtLoaded}
                />
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
              slot2ArtReady ? (
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
                  <span
                    className="mx-auto h-7 w-7 shrink-0 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900"
                    aria-hidden
                  />
                  <p className="text-[10px] font-medium leading-snug text-slate-500">
                    Loading second card…
                  </p>
                </div>
              )
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
