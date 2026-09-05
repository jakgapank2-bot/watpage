import { Award, MessageSquareText, Search, Settings2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { processSteps } from "@/data/site";

const icons = {
  message: MessageSquareText,
  search: Search,
  settings: Settings2,
  award: Award,
} as const;

export default function Process() {
  return (
    <section className="scroll-mt-20 bg-brand-50/40 py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="ขั้นตอนการใช้บริการ"
            subtitle="เริ่มต้นง่าย ๆ เพียง 4 ขั้นตอน ทีมงานดูแลให้ตั้งแต่ต้นจนจบ"
          />
        </Reveal>

        <div className="relative mt-14 lg:mt-20">
          {/* เส้น Timeline — แนวนอนบน Desktop / แนวตั้งบน Mobile */}
          <span
            className="absolute top-8 left-8 hidden h-0.5 w-[calc(100%-4rem)] bg-linear-to-r from-brand-200 via-brand-400 to-brand-200 lg:block"
            aria-hidden="true"
          />
          <span
            className="absolute top-6 bottom-6 left-8 w-0.5 bg-linear-to-b from-brand-200 via-brand-400 to-brand-200 lg:hidden"
            aria-hidden="true"
          />

          <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, i) => {
              const Icon = icons[step.icon];
              return (
                <li key={step.number}>
                  <Reveal delay={i * 130}>
                    <div className="flex items-start gap-5 lg:block">
                      <span
                        className="relative grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25 ring-8 ring-brand-50/40 transition"
                        aria-hidden="true"
                      >
                        <Icon className="size-7" />
                      </span>

                      <div className="lg:mt-6">
                        <p className="text-sm font-extrabold tracking-widest text-brand-500">
                          {step.number}
                        </p>
                        <h3 className="mt-1 text-xl font-extrabold text-navy-900">{step.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-navy-900/60">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
