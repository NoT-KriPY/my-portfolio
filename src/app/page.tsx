import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Direction } from "@/components/Direction";
import { Foundation } from "@/components/Foundation";
import { Credentials } from "@/components/Credentials";
import { Projects } from "@/components/Projects";
import { Building } from "@/components/Building";
import { Timeline } from "@/components/Timeline";
import { University } from "@/components/University";
import { CVSection } from "@/components/CVSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Hero - Full screen opening */}
      <Hero />

      {/* About - Brief intro */}
      <About />

      {/* Education preview */}
      <Education />

      {/* Direction - Cybersecurity focus */}
      <Direction />

      {/* Foundation - Currently learning */}
      <Foundation />

      {/* Credentials */}
      <Credentials />

      {/* Projects preview */}
      <Projects />

      {/* Building */}
      <Building />

      {/* Timeline */}
      <Timeline />

      {/* University */}
      <University />

      {/* CV */}
      <CVSection />

      {/* Contact */}
      <Contact />
    </>
  );
}
