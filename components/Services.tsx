import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-brand-50/40 py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="บริการของวัฒน์จัดให้"
            subtitle="ครบ จบ ในที่เดียว ตอบโจทย์ทุกความต้องการเรื่องรถยนต์"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 120} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
