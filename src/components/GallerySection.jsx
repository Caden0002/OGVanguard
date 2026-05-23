import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY_EVENTS, getGalleryPhotos } from "../content.js";
import { SectionLabel } from "./SectionLabel.jsx";

function LoadingSpinner({ label = "Loading image" }) {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/95"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">{label}</span>
      <span
        className="h-7 w-7 shrink-0 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900"
        aria-hidden
      />
    </div>
  );
}

/** Loads when element enters viewport (callback ref so it works after mount). */
function useInView(rootMargin = "200px") {
  const [node, setNode] = useState(null);
  const [inView, setInView] = useState(false);

  const ref = useCallback((el) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) {
      setInView(false);
      return;
    }

    setInView(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, rootMargin]);

  return { ref, inView };
}

function ImageWithLoader({
  src,
  alt,
  className,
  imgClassName,
  minHeightClass,
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  const markDone = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalHeight > 0) markDone();
  }, [src, markDone]);

  return (
    <div className={`relative ${minHeightClass ?? "min-h-[200px]"}`}>
      {!loaded ? <LoadingSpinner label={`Loading ${alt}`} /> : null}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        decoding="async"
        onLoad={markDone}
        onError={markDone}
        className={`relative z-0 transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName ?? ""} ${className ?? ""}`}
      />
    </div>
  );
}

function FolderPoster({ poster }) {
  const { ref, inView } = useInView("80px");

  return (
    <div
      ref={ref}
      className="relative mb-3 hidden aspect-[3/4] overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-inner md:block"
    >
      {!inView ? (
        <LoadingSpinner label="Loading poster" />
      ) : (
        <ImageWithLoader
          src={poster.src}
          alt={poster.alt}
          minHeightClass="min-h-0 h-full"
          className="aspect-[3/4] w-full"
          imgClassName="aspect-[3/4] w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
        />
      )}
    </div>
  );
}

function LazyGalleryPhoto({ photo }) {
  const { ref, inView } = useInView("200px");

  if (!photo.src) {
    return (
      <figure
        ref={ref}
        className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-xs text-slate-400"
      >
        {inView ? "Photo coming soon" : null}
      </figure>
    );
  }

  return (
    <figure
      ref={ref}
      className="relative min-h-[200px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm"
    >
      {!inView ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <LoadingSpinner label="Loading photo" />
        </div>
      ) : (
        <ImageWithLoader
          src={photo.src}
          alt={photo.alt}
          minHeightClass="min-h-[200px]"
          imgClassName="block w-full h-auto max-h-[min(85vh,640px)] object-contain"
        />
      )}
      {photo.caption ? (
        <figcaption className="border-t border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function GallerySection() {
  const [activeId, setActiveId] = useState(null);
  const active = GALLERY_EVENTS.find((e) => e.id === activeId) ?? null;
  const activePhotos = active ? getGalleryPhotos(active) : [];

  function selectEvent(id) {
    setActiveId(id);
    requestAnimationFrame(() => {
      document
        .getElementById("gallery-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

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
        Monthly big events — pick a month. Photos load as you scroll (ImageKit
        friendly).
      </p>

      <ul className="mb-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_EVENTS.map((event) => {
          const isActive = event.id === activeId;

          return (
            <li key={event.id}>
              <button
                type="button"
                onClick={() => selectEvent(event.id)}
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

                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  {event.month}
                </p>

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
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-8"
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
                  <LazyGalleryPhoto photo={photo} />
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
