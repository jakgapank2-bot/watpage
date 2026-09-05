import { Check, ChevronRight, FileSearch, MessageSquareText, Settings2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { processSteps } from "@/data/site";

const icons = {
  message: MessageSquareText,
  search: FileSearch,
  settings: Settings2,
  check: Check,
} as const;

export default function Process() {
  return (
    <section className="scroll-mt-16 bg-cream-100 pb-16 lg:pb-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="ขั้นตอนการใช้บริการ" subtitle="ง่าย ครบ จบในที่เดียว 4 ขั้นตอน" />
        </Reveal>

        <ol className="mt-10 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
          {processSteps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <li key={step.number} className="flex items-center gap-3 lg:flex-1">
                <Reveal delay={i * 110} className="flex-1">
                  <div className="flex items-center gap-4">
                    <span
                      className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brown-600 to-brown-800 text-white shadow-[0_10px_24px_-12px_rgba(36,20,8,0.75)] ring-1 ring-gold-500/40"
                      aria-hidden="true"
                    >
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <p className="text-lg font-extrabold text-brown-900">
                        {step.number}{" "}
                        <span className="ms-1 align-middle text-base">{step.title}</span>
                      </p>
                      <p className="text-[13px] text-brown-800/60">{step.detail}</p>
                    </div>
                  </div>
                </Reveal>

                {/* ลูกศรคั่นระหว่างขั้นตอน (เฉพาะจอใหญ่) */}
                {i < processSteps.length - 1 && (
                  <ChevronRight
                    className="hidden size-6 shrink-0 text-brown-400 lg:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
