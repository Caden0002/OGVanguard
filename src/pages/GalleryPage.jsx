import { Link } from "react-router-dom";
import { GallerySection } from "../components/GallerySection.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";

export function GalleryPage() {
  return (
    <div className="flex min-h-svh flex-col bg-white font-sans text-[17px] leading-relaxed text-slate-600 antialiased max-lg:text-base">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-10 md:py-16">
        <p className="mb-6">
          <Link
            to="/"
            className="text-sm font-medium uppercase tracking-wide text-slate-500 no-underline transition hover:text-slate-900"
          >
            ← Back to home
          </Link>
        </p>
        <GallerySection />
      </main>
      <SiteFooter />
    </div>
  );
}
