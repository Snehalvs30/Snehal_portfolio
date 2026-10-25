// Small spaced-out label used at the top of each section, e.g. "WHAT I DO".
export default function SectionLabel({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="font-condensed text-xs uppercase tracking-[0.3em] text-muted sm:text-sm">
      {children}
    </h2>
  );
}
