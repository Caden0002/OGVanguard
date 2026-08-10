import { STATS } from "../content.js";

export function StatsBar() {
  return (
    <div className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-slate-200">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex min-w-0 flex-col items-center justify-center gap-0.5 px-2 py-4 text-center sm:gap-1 sm:px-4 sm:py-6 md:px-6 md:py-8"
          >
            <span className="text-2xl font-black tabular-nums text-blue-600 sm:text-3xl md:text-4xl">
              {s.value}
            </span>
            <span className="max-w-[9rem] text-[0.6rem] font-bold uppercase leading-snug tracking-[0.12em] text-slate-500 sm:max-w-none sm:text-xs sm:leading-normal sm:tracking-[0.2em]">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
