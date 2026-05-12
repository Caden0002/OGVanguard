export function SkewCta({ href, external = false, variant, children }) {
  const outer =
    "-skew-x-12 inline-block border-2 border-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md max-md:mx-auto max-md:block max-md:w-full max-md:max-w-xs md:mx-0";
  const inner =
    "skew-x-12 block w-full px-8 py-3.5 text-center text-xs font-black uppercase tracking-[0.18em] md:inline-block md:w-auto md:text-left";
  const fill =
    variant === "primary"
      ? "bg-slate-900 text-white"
      : "bg-white text-slate-900 hover:bg-slate-50";
  return (
    <a
      href={href}
      className={`${outer} ${fill}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      <span className={inner}>{children}</span>
    </a>
  );
}
