import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";
import { sections } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-cream-50 py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            title={sections.services.title}
            subtitle={sections.services.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 110} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
