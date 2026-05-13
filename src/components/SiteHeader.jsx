import { Link } from "react-router-dom";
import { NAV_LINKS } from "../content.js";

function isExternalHref(href, external) {
  return Boolean(external) || /^https?:\/\//i.test(href);
}

export function SiteHeader() {
  const linkClass =
    "text-slate-500 no-underline transition hover:text-slate-900";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/7c0 px-5 py-4 backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a
            href="https://en.cf-vanguard.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 no-underline "
            aria-label="Official Cardfight!! Vanguard site (opens in a new tab)"
          >
            <div className="flex shrink-0 items-center ">
              <img
                src="/logo-vanguard-lj.png"
                alt=""
                className="h-7 w-auto max-w-[min(52vw,168px)] object-contain object-center md:h-8 md:max-w-[188px]"
                decoding="async"
              />
            </div>
          </a>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Singapore
          </span>
        </div>
        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-wide text-slate-500 md:gap-x-8 md:text-xs"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ label, href, external }) =>
            isExternalHref(href, external) ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {label}
              </a>
            ) : (
              <Link key={label} to={href} className={linkClass}>
                {label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
