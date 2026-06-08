import { useState } from "react";
import type { ReactNode } from "react";
import { AlertTriangle, Brain, Check, Swords, X } from "lucide-react";
import { getCombatGuide, type CombatFlowStep } from "@/data/combatData";

interface CombatOverviewProps {
  classId: string;
  className: string;
}

function Stars({ value }: { value: number }) {
  return (
    <span className="font-display text-xl tracking-[0.08em]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < value ? "text-primary" : "text-muted"}>
          *
        </span>
      ))}
    </span>
  );
}

export function CombatOverview({ classId, className }: CombatOverviewProps) {
  const guide = getCombatGuide(classId);
  const [activeStepId, setActiveStepId] = useState(guide.flow[0]?.id ?? "");
  const activeStep = guide.flow.find((step) => step.id === activeStepId) ?? guide.flow[0];

  return (
    <div className="space-y-7">
      <section className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card overflow-hidden">
        <div className="h-1 bg-primary" />
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <Swords className="text-primary" size={28} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Combat Flow</div>
              <h2 className="font-display text-4xl text-white">{className} Fight Cycle</h2>
            </div>
          </div>
          <p className="font-slab text-sm text-surface-dark-foreground/70 max-w-3xl">{guide.intro}</p>

          <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {guide.flow.map((step, index) => {
                const isActive = activeStep?.id === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    className={`text-left border-2 p-4 min-h-[128px] transition-transform hover:-translate-y-0.5 ${
                      isActive ? "border-primary bg-primary/15" : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-[0.24em] text-primary font-bold">Step {index + 1}</div>
                    <h3 className="font-display text-3xl text-white mt-2">{step.title}</h3>
                    <p className="text-xs text-surface-dark-foreground/60 mt-2 line-clamp-2">{step.goal}</p>
                  </button>
                );
              })}
            </div>

            {activeStep && <FlowStepCard step={activeStep} />}
          </div>
        </div>
      </section>

      <section className="tf-paper border-2 border-border shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <Swords className="text-primary" size={26} />
          <h2 className="font-display text-4xl tf-headline">Duel Scenarios</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          {guide.duels.map((duel) => (
            <article key={duel.enemy} className="border-2 border-border bg-card p-4 shadow-card">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-display text-3xl">{className} vs {duel.enemy}</h3>
                <Stars value={duel.difficulty} />
              </div>
              <DuelRow label="Goal" value={duel.goal} />
              <DuelRow label="Win Condition" value={duel.winCondition} />
              <DuelRow label="Avoid" value={duel.avoid} danger />
            </article>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <RulePanel title="Take Fight" tone="green" icon={<Check size={22} />} items={guide.rules.takeFight} />
        <RulePanel title="Avoid Fight" tone="red" icon={<X size={22} />} items={guide.rules.avoidFight} />
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <Checklist title="Before Fight" items={guide.rules.beforeFight} />
        <Checklist title="After Fight" items={guide.rules.afterFight} />
      </section>

      <section className="tf-paper border-2 border-border shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <AlertTriangle className="text-destructive" size={26} />
          <h2 className="font-display text-4xl tf-headline">Combat Mistakes Gallery</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {guide.mistakes.map((mistake) => (
            <article key={mistake.title} className="bg-surface-dark text-surface-dark-foreground border-2 border-destructive/70 p-5 shadow-card">
              <div className="text-[10px] uppercase tracking-[0.25em] text-destructive font-bold mb-2">Mistake</div>
              <h3 className="font-display text-3xl text-white">{mistake.title}</h3>
              <p className="font-slab text-lg text-surface-dark-foreground/80 mt-3">{mistake.short}</p>
              <div className="mt-4 border-t border-white/10 pt-3 text-sm text-surface-dark-foreground/70">
                {mistake.fix}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tf-paper border-2 border-primary shadow-card p-5">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Brain size={22} />
          <h2 className="font-display text-3xl">Coach Note</h2>
        </div>
        <p className="font-slab text-sm text-muted-foreground leading-7">{guide.coachNote}</p>
      </section>
    </div>
  );
}

function FlowStepCard({ step }: { step: CombatFlowStep }) {
  return (
    <article className="border-2 border-primary bg-white/[0.05] p-5">
      <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Selected step</div>
      <h3 className="font-display text-5xl text-white mb-3">{step.title}</h3>
      <div className="font-display text-2xl text-primary mb-2">Goal</div>
      <p className="font-slab text-sm text-surface-dark-foreground/75 leading-7 mb-4">{step.goal}</p>
      <div className="font-display text-2xl text-primary mb-2">Tips</div>
      <ul className="space-y-2 text-sm">
        {step.tips.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function DuelRow({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className="border-t border-border/50 py-3">
      <div className={`text-[10px] uppercase tracking-[0.24em] font-bold ${danger ? "text-destructive" : "text-primary"}`}>{label}</div>
      <p className="font-slab text-sm text-muted-foreground leading-6 mt-1">{value}</p>
    </div>
  );
}

function RulePanel({ title, items, tone, icon }: { title: string; items: string[]; tone: "green" | "red"; icon: ReactNode }) {
  const color = tone === "green" ? "border-green-600 bg-green-950/70 text-green-300" : "border-destructive bg-red-950/70 text-red-300";

  return (
    <section className={`border-2 ${color} shadow-card p-5`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="font-display text-4xl text-white">{title}</h2>
      </div>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="font-bold">{tone === "green" ? "✓" : "X"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="tf-paper border-2 border-border shadow-card p-5">
      <h2 className="font-display text-4xl tf-headline mb-3">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item} className="border border-border bg-card px-3 py-2 text-sm font-bold">
            ✓ {item}
          </div>
        ))}
      </div>
    </section>
  );
}
