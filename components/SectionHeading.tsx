type Props = {
  id: string;
  title: string;
  intro?: string;
};

// Shared heading used at the top of each section.
export default function SectionHeading({ id, title, intro }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <h2
        id={id}
        className="font-display text-4xl font-semibold tracking-[-0.025em] sm:text-5xl md:text-6xl"
      >
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-[60ch] text-lg text-muted">{intro}</p>}
    </div>
  );
}
