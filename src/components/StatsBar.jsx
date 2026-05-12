import { STATS } from '../content.js'

export function StatsBar() {
  return (
    <div className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center gap-1 px-6 py-8 text-center"
          >
            <span className="text-3xl font-black text-blue-600 md:text-4xl">
              {s.value}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
