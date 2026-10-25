import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Expertise from "@/components/Expertise";
import ThisIsMe from "@/components/ThisIsMe";
import Contact from "@/components/Contact";
import StackSection from "@/components/StackSection";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <main id="main" tabIndex={-1}>
        {/* Each section slides up over the previous one as you scroll. */}
        <StackSection>
          <Hero />
        </StackSection>
        <StackSection>
          <WhatIDo />
        </StackSection>
        <StackSection>
          <Experience />
        </StackSection>
        <StackSection>
          <Projects />
        </StackSection>
        <StackSection>
          <Expertise />
        </StackSection>
        <StackSection>
          <ThisIsMe />
        </StackSection>
        <StackSection last>
          <Contact />
        </StackSection>
      </main>
    </>
  );
}
