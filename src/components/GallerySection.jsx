import { useState } from "react";
import {
  GALLERY_EVENTS,
  galleryHasPhotos,
  getGalleryPhotos,
} from "../content.js";
import { SectionLabel } from "./SectionLabel.jsx";

function PhotoPlaceholder({ alt, caption }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/80">
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="text-2xl text-slate-300" aria-hidden>
          📷
        </span>
        <span className="text-xs font-medium text-slate-500">{alt}</span>
        <span className="text-[10px] uppercase tracking-wide text-slate-400">
          Photo coming soon
        </span>
      </div>
      {caption ? (
        <figcaption className="border-t border-slate-100 px-3 py-2 text-xs text-slate-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function GalleryPhoto({ photo }) {
  if (photo.src) {
    return (
      <figure className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto max-h-[min(85vh,640px)] object-contain"
        />
        {photo.caption ? (
          <figcaption className="border-t border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
            {photo.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return <PhotoPlaceholder alt={photo.alt} caption={photo.caption} />;
}

function FolderPoster({ poster }) {
  return (
    <div className="mb-3 hidden overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-inner md:block">
      <img
        src={poster.src}
        alt={poster.alt}
        className="aspect-[3/4] w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function GallerySection() {
  const [activeId, setActiveId] = useState(GALLERY_EVENTS[0]?.id ?? null);
  const active =
    GALLERY_EVENTS.find((e) => e.id === activeId) ?? GALLERY_EVENTS[0];
  const activePhotos = active ? getGalleryPhotos(active) : [];

  return (
    <section aria-labelledby="gallery-heading">
      <SectionLabel>Community</SectionLabel>
      <h2
        id="gallery-heading"
        className="mb-4 font-black uppercase italic tracking-tight text-slate-900 max-md:text-2xl md:text-4xl"
      >
        Gallery
      </h2>
      <p className="mb-8 max-w-2xl text-slate-600">
        Monthly big events — click a poster to view tournament photos below.
      </p>

      <ul className="mb-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_EVENTS.map((event) => {
          const isActive = event.id === active?.id;
          const hasPhotos = galleryHasPhotos(event);

          return (
            <li key={event.id}>
              <button
                type="button"
                onClick={() => setActiveId(event.id)}
                aria-pressed={isActive}
                aria-controls="gallery-panel"
                aria-expanded={isActive}
                className={`group flex w-full flex-col rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-5 ${
                  isActive
                    ? "border-blue-300 bg-blue-50/60 ring-2 ring-blue-200"
                    : "border-slate-200 bg-white hover:border-blue-200"
                }`}
              >
                {event.poster ? (
                  <FolderPoster poster={event.poster} />
                ) : (
                  <div className="mb-3 hidden aspect-[3/4] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400 md:flex">
                    Poster coming soon
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    {event.month}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      hasPhotos
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  ></span>
                </div>

                <h3 className="mb-2 font-black italic text-lg text-slate-900 group-hover:text-blue-800">
                  {event.title}
                </h3>

                <p className="mt-3 text-xs font-medium text-slate-400">
                  {isActive ? "Showing photos below" : "Click to view photos"}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {active ? (
        <div
          id="gallery-panel"
          className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-8"
          role="region"
          aria-label={`${active.title} photos`}
        >
          <div className="mb-6 border-b border-slate-200 pb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {active.month}
            </p>
            <h3 className="font-black italic text-2xl text-slate-900 md:text-3xl">
              {active.title}
            </h3>
          </div>

          {activePhotos.length > 0 ? (
            <ul className="list-none columns-2 gap-4 p-0 sm:columns-3 lg:columns-4 [&>li]:mb-4">
              {activePhotos.map((photo, i) => (
                <li
                  key={photo.src ?? `${active.id}-${i}`}
                  className="break-inside-avoid"
                >
                  <GalleryPhoto photo={photo} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-slate-500">
              No event photos yet — add a poster and photo list in{" "}
              <code className="text-xs">content.js</code>.
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
