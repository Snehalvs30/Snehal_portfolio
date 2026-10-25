import { about } from "@/data/content";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      className="border-t border-line"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading id="about-title" title={about.title} />

        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-5 text-lg leading-relaxed md:col-span-7">
            {about.paragraphs.map((text) => (
              <p key={text.slice(0, 32)} className="max-w-[62ch]">
                {text}
              </p>
            ))}
          </div>

          <dl className="space-y-6 md:col-span-4 md:col-start-9">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-accent pl-4">
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
