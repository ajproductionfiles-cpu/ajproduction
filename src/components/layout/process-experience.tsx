import Link from "next/link";
import type { SiteSettings } from "@/lib/site/types";

type ProcessPageData = SiteSettings["processPage"];

type StageNarrative = {
  kicker: string;
  summary: string;
  whatHappens: string;
  whyItMatters: string;
  output: string;
};

const accentThemes: Record<
  string,
  {
    shell: string;
    chip: string;
    panel: string;
    timeline: string;
  }
> = {
  blue: {
    shell: "from-[#eef7ff] via-[#fbfdff] to-[#f3f8ff]",
    chip: "bg-[#e8f4ff] text-[#0066cc]",
    panel: "from-[#0a3b63] via-[#165d9a] to-[#3da6d6]",
    timeline: "bg-[#1c6fff]",
  },
  purple: {
    shell: "from-[#f6f1ff] via-[#fdfcff] to-[#faf7ff]",
    chip: "bg-[#f2ebff] text-[#6f49ff]",
    panel: "from-[#28104f] via-[#5930a3] to-[#a27fff]",
    timeline: "bg-[#845dff]",
  },
  pink: {
    shell: "from-[#fff3f8] via-[#fffdfd] to-[#fff8fb]",
    chip: "bg-[#ffe8f2] text-[#dc3c89]",
    panel: "from-[#4f0f2d] via-[#93275e] to-[#ff82bb]",
    timeline: "bg-[#f05d9e]",
  },
  orange: {
    shell: "from-[#fff7f0] via-[#fffdfb] to-[#fff9f4]",
    chip: "bg-[#fff0de] text-[#d76e22]",
    panel: "from-[#53250b] via-[#9a4717] to-[#ffae5c]",
    timeline: "bg-[#ff8f42]",
  },
  green: {
    shell: "from-[#f4fff5] via-[#fefffe] to-[#f8fff7]",
    chip: "bg-[#ebfaeb] text-[#2d8a54]",
    panel: "from-[#133b23] via-[#256f45] to-[#6fe195]",
    timeline: "bg-[#45b86d]",
  },
};

const stageNarratives: StageNarrative[] = [
  {
    kicker: "Start with clarity",
    summary: "We define the real opportunity before any visual decision gets made.",
    whatHappens: "Stakeholder conversations, market review, audience notes, and a practical discovery brief that translates ambition into a sharp direction.",
    whyItMatters: "This removes guesswork and keeps the rest of the project focused on the business outcome, not surface-level aesthetics.",
    output: "A clear brief with positioning signals, references, priorities, and approval on what success should look like.",
  },
  {
    kicker: "Turn insight into a roadmap",
    summary: "We convert direction into sequencing, priorities, and a realistic execution plan.",
    whatHappens: "Scope planning, content hierarchy, milestone setting, visual territories, and rollout logic are aligned into one production-ready path.",
    whyItMatters: "A premium end result depends on sequence as much as taste. This is where pace and control are established.",
    output: "A strategy layer that tells the team what gets built, in what order, and how the story should unfold.",
  },
  {
    kicker: "Shape the visual language",
    summary: "The brand starts to become memorable, ownable, and recognizable across every touchpoint.",
    whatHappens: "Identity systems, typography, color, messaging cues, interface direction, and presentation logic are refined into one coherent language.",
    whyItMatters: "This stage creates the consistency that lets campaigns, web, motion, and content all feel like the same world.",
    output: "A polished system that the rest of the production can build on without losing cohesion.",
  },
  {
    kicker: "Build the real experience",
    summary: "Concepts become assets, interfaces, motion, and launch-ready production work.",
    whatHappens: "Design execution, prototyping, web builds, AI imagery, content systems, interaction QA, and final polish all happen here.",
    whyItMatters: "This is where strategic clarity and visual ambition have to prove themselves under real production pressure.",
    output: "Launch-ready assets, approved touchpoints, and production-quality experiences ready for deployment.",
  },
  {
    kicker: "Release with confidence",
    summary: "Launch is treated like part of the craft, not the moment after the craft is done.",
    whatHappens: "Final checks, deployment support, content population, handoff notes, walkthroughs, and post-launch calibration are handled with care.",
    whyItMatters: "The final presentation of the work matters as much as the work itself, especially for premium brands.",
    output: "A confident launch, a smooth handoff, and a system that can keep performing after go-live.",
  },
];

export function ProcessExperience({ page }: { page: ProcessPageData }) {
  const steps = page.steps.slice(0, 5);
  const lead = steps[0];
  const leadTheme = accentThemes[lead?.accent || "blue"] || accentThemes.blue;

  return (
    <main className="overflow-hidden bg-[var(--surface-soft)] pb-24 pt-[5.75rem] md:pt-28">
      <section className="page-shell section-stack text-center">
        <p className="eyebrow justify-center before:hidden fade-up-enter">Process Overview</p>
        <h1 className="display-hero fade-up-enter delay-1 mx-auto mt-5 max-w-[14ch]">
          Stunning thinking.
          <br />
          Seamless execution.
        </h1>
        <p className="body-large fade-up-enter delay-2 mx-auto mt-6 max-w-[52rem]">
          {page.subtitle}
        </p>
        <div className="fade-up-enter delay-3 mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="#sequence" className="studio-pill-primary">
            See the process
          </Link>
          <Link href={page.ctaHref} className="studio-pill-secondary">
            {page.ctaLabel}
          </Link>
        </div>

        <div className="surface-card-strong fade-up-enter delay-4 mt-14 overflow-hidden p-5 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${leadTheme.shell} px-6 py-8 text-left md:px-10 md:py-10`}>
              <div className="relative z-10 max-w-[34rem]">
                <div className={`inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${leadTheme.chip}`}>
                  Step {lead?.id}
                </div>
                <h2 className="card-title mt-5">{lead?.title}</h2>
                <p className="body-large mt-4">{lead?.description}</p>
                <div className="mt-8 grid gap-3">
                  <DetailCard label="What happens" body={stageNarratives[0].whatHappens} />
                  <DetailCard label="Why it matters" body={stageNarratives[0].whyItMatters} />
                </div>
              </div>
            </div>

            <div className="surface-dark relative overflow-hidden p-6 text-left">
              <div className={`absolute inset-0 bg-gradient-to-br ${leadTheme.panel} opacity-[0.94]`} />
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">Launch output</p>
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-white/86">
                    {stageNarratives[0].output}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {steps.slice(0, 4).map((step, index) => {
                    const theme = accentThemes[step.accent] || accentThemes.blue;
                    const narrative = stageNarratives[index];

                    return (
                      <div key={step.id} className="rounded-[1.5rem] border border-white/14 bg-white/10 p-4">
                        <div className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${theme.chip}`}>
                          {step.id}
                        </div>
                        <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-white/78">
                          {narrative.summary}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sequence" className="page-shell section-stack-tight scroll-mt-28 md:scroll-mt-32">
        <div className="flex flex-wrap gap-3">
          {steps.map((step) => {
            const theme = accentThemes[step.accent] || accentThemes.blue;

            return (
              <div
                key={step.id}
                className={`inline-flex items-center gap-3 rounded-full bg-gradient-to-r px-4 py-3 text-[14px] font-medium text-[var(--text-primary)] shadow-[0_12px_40px_rgba(0,0,0,0.04)] ${theme.shell}`}
              >
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${theme.chip}`}>
                  {step.id}
                </span>
                {step.title}
              </div>
            );
          })}
        </div>
      </section>

      <section className="page-shell section-stack-tight">
        <div className="space-y-8 md:space-y-10">
          {steps.map((step, index) => {
            const theme = accentThemes[step.accent] || accentThemes.blue;
            const narrative = stageNarratives[index] || stageNarratives[stageNarratives.length - 1];
            const reverse = index % 2 === 1;

            return (
              <article key={step.id} className="surface-card-strong overflow-hidden p-2 md:p-3">
                <div className={`grid gap-3 lg:items-center lg:gap-4 ${reverse ? "lg:grid-cols-[0.94fr_1.06fr]" : "lg:grid-cols-[1.04fr_0.96fr]"}`}>
                  <div className={`relative overflow-hidden rounded-[2rem] p-8 md:p-10 ${reverse ? "lg:order-2" : ""}`}>
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.shell} opacity-90`} />
                    <div className="relative z-10 max-w-[36rem]">
                      <div className={`inline-flex rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${theme.chip}`}>
                        Step {step.id}
                      </div>
                      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        {narrative.kicker}
                      </p>
                      <h2 className="section-title mt-3">{step.title}</h2>
                      <p className="body-large mt-4">{step.description}</p>
                      <div className="mt-8 grid gap-3">
                        <DetailCard label="What happens" body={narrative.whatHappens} />
                        <DetailCard label="Why it matters" body={narrative.whyItMatters} />
                        <DetailCard label="What you get" body={narrative.output} />
                      </div>
                    </div>
                  </div>

                  <div className={`relative overflow-hidden rounded-[2rem] lg:self-center ${reverse ? "lg:order-1" : ""}`}>
                    <div className="surface-dark relative min-h-[22rem] p-5 md:p-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.panel} opacity-[0.94]`} />
                      <div className="absolute left-6 top-0 h-full w-px bg-white/14" />
                      <div className="relative z-10 flex flex-col gap-6">
                        <div className="grid gap-3 md:grid-cols-2">
                          <MetricPanel label="Stage focus" value={step.title} />
                          <MetricPanel label="Priority" value={narrative.kicker} />
                        </div>

                        <div className="rounded-[1.8rem] border border-white/14 bg-[rgba(255,255,255,0.08)] px-5 py-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
                            Transformation arc
                          </p>
                          <p className="mt-3 text-[1.15rem] font-medium leading-relaxed tracking-[-0.02em] text-white/90">
                            {narrative.summary}
                          </p>
                        </div>

                        <div className="grid gap-4">
                          <TimelineRow
                            badge="Input"
                            body={
                              index === 0
                                ? "Goals, references, ambitions, and context from the client side."
                                : `Approved output and learnings carried forward from ${steps[Math.max(index - 1, 0)].title.toLowerCase()}.`
                            }
                            tone={theme.timeline}
                          />
                          <TimelineRow badge="Transformation" body={narrative.summary} tone={theme.timeline} />
                          <TimelineRow badge="Output" body={narrative.output} tone={theme.timeline} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page-shell section-stack-tight">
        <div className="surface-dark [--body-large-color:rgba(255,255,255,0.74)] [--display-title-color:#ffffff] [--eyebrow-color:rgba(255,255,255,0.58)] px-8 py-16 text-center md:px-12 md:py-20">
          <p className="eyebrow justify-center before:bg-white/30">The Full Rollout</p>
          <h2 className="display-title mx-auto mt-5 max-w-[14ch]">
            A process built to make premium work feel inevitable.
          </h2>
          <p className="body-large mx-auto mt-5 max-w-[44rem]">
            We keep the journey understandable, the decisions intentional, and the final experience cohesive from first brief to public launch.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={page.ctaHref} className="studio-pill-primary">
              {page.ctaLabel}
            </Link>
            <Link href="/work" className="studio-pill-secondary border-white/20 bg-[rgba(255,255,255,0.08)] text-white hover:border-white/[0.32] hover:bg-white/[0.14]">
              View finished work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-[1.5rem] border border-black/[0.06] bg-white/78 px-5 py-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {body}
      </p>
    </div>
  );
}

function MetricPanel({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-white/16 bg-white/10 px-4 py-4 text-left">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">
        {label}
      </p>
      <p className="mt-2 text-[18px] font-semibold leading-snug text-white">
        {value}
      </p>
    </div>
  );
}

function TimelineRow({
  badge,
  body,
  tone,
}: {
  badge: string;
  body: string;
  tone: string;
}) {
  return (
    <div className="relative rounded-[1.6rem] border border-white/14 bg-[rgba(255,255,255,0.08)] px-5 py-4 text-left">
      <span className={`absolute -left-[0.63rem] top-6 h-3.5 w-3.5 rounded-full border-4 border-[#091019] ${tone}`} />
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">
        {badge}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-white/84">
        {body}
      </p>
    </div>
  );
}
