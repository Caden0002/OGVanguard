export function GalleryTournamentVods({ videos }) {
  if (!videos?.length) return null;

  return (
    <div
      className="mb-6 rounded-xl border border-slate-200 bg-white p-4 md:p-5"
      aria-labelledby="gallery-vods-heading"
    >
      <h4
        id="gallery-vods-heading"
        className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500"
      >
        Watch the tournament
      </h4>
      <ul className="flex list-none flex-wrap gap-2 p-0">
        {videos.map((video) => (
          <li key={video.label}>
            <a
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-slate-900 no-underline transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            >
              <span
                className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[0.55rem] text-rose-600"
                aria-hidden
              >
                ▶
              </span>
              {video.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
