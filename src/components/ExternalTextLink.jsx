export function ExternalTextLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-normal uppercase tracking-wide text-slate-900 underline decoration-2 underline-offset-4 transition hover:text-blue-600"
    >
      {children}
    </a>
  );
}
