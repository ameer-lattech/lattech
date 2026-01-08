"use client";

import React, { useMemo, useState } from "react";

type FaqItem = { q: string; a: string };
type FaqTab = { key: string; label: string; items: FaqItem[] };

const TABS: FaqTab[] = [
  {
    key: "software",
    label: "Software eng.",
    items: [
      { q: "Does Lattech Solution cover all stages of the SDLC?", a: "Yes — we can support discovery, design, development, testing, deployment, and post-launch maintenance." },
      { q: "Can Lattech Solution speed up the delivery of projects?", a: "We accelerate delivery using proven processes, senior teams, and clear scope control." },
      { q: "What's the cost for your software development services?", a: "Pricing depends on scope, timeline, and team composition. Share requirements and we’ll propose options." },
      { q: "What’s your post-launch policy?", a: "We provide stabilization support and can offer ongoing maintenance SLAs based on your needs." },
      { q: "What is your preferred development methodology?", a: "We typically run Agile (Scrum/Kanban) but adapt to your internal process." },
      { q: "How do you control the quality of the software you deliver?", a: "QA strategy, automated testing, code reviews, CI checks, and release gates." },
    ],
  },
  {
    key: "faq2",
    label: "FAQ 2",
    items: [
      { q: "How do we start a project with Lattech Solution?", a: "We begin with discovery, goals, scope, timeline, and team plan." },
      { q: "Do you sign NDAs?", a: "Yes, we can sign an NDA before any sensitive discussion." },
      { q: "Do you provide dedicated teams?", a: "Yes — dedicated squads or augmentations depending on your needs." },
      { q: "How do you handle communication?", a: "Weekly checkpoints, shared trackers, and async updates via Slack/Email." },
      { q: "Can you work with our internal team?", a: "Absolutely — we collaborate with in-house teams seamlessly." },
      { q: "Do you offer support plans?", a: "Yes — multiple SLA tiers are available." },
    ],
  },
  {
    key: "faq3",
    label: "FAQ 3",
    items: [
      { q: "What industries do you work with?", a: "Fintech, healthcare, retail, logistics, energy, and more." },
      { q: "Do you build MVPs?", a: "Yes — we build MVPs and scale them to full products." },
      { q: "Can you redesign an existing product?", a: "Yes — UX/UI + engineering modernization." },
      { q: "Do you provide documentation?", a: "Yes — technical docs, handover, and onboarding." },
      { q: "Do you do performance optimization?", a: "Yes — audits, profiling, and optimization plans." },
      { q: "Do you provide analytics setup?", a: "Yes — events tracking, dashboards, and KPIs." },
    ],
  },
  {
    key: "faq4",
    label: "FAQ 4",
    items: [
      { q: "How do you estimate timelines?", a: "We estimate based on scope, risks, dependencies, and iterations." },
      { q: "Do you provide fixed cost?", a: "We can do fixed scope/fixed cost for well-defined requirements." },
      { q: "What tech stacks do you use?", a: "Modern web/mobile stacks depending on the product constraints." },
      { q: "Do you offer DevOps?", a: "Yes — CI/CD, cloud infra, monitoring, and release pipelines." },
      { q: "Can you handle migrations?", a: "Yes — data and platform migrations with minimal downtime." },
      { q: "Do you provide security reviews?", a: "Yes — best practices, audits, and remediation." },
    ],
  },
  {
    key: "faq5",
    label: "FAQ 5",
    items: [
      { q: "Where are you located?", a: "We work globally with distributed teams." },
      { q: "What are your working hours?", a: "Flexible overlap hours are set per client." },
      { q: "How do you handle confidentiality?", a: "Access control, secure tools, NDAs, and policies." },
      { q: "Can we hire your team long-term?", a: "Yes — long-term partnerships are common." },
      { q: "What’s the onboarding time?", a: "Usually 1–2 weeks depending on requirements." },
      { q: "How do you report progress?", a: "Milestones, sprint reviews, and dashboards." },
    ],
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[#CFCFCF] text-[#7C7C7C]">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M6 1v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={open ? "opacity-0" : "opacity-100"} />
        <path d="M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function FaqSplitSection() {
  const [activeKey, setActiveKey] = useState<string>(TABS[0].key);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const activeTab = useMemo(() => TABS.find((t) => t.key === activeKey) ?? TABS[0], [activeKey]);

  const leftItems = activeTab.items.slice(0, 3);
  const rightItems = activeTab.items.slice(3, 6);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1240px] px-10 pb-[86px] pt-[64px]">
        {/* top row */}
        <div className="flex items-start justify-between gap-8">
          {/* left title */}
          <div className="min-w-[420px]">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#35B24A]">FAQ</span>
              <span className="h-px w-[46px] bg-[#D9D9D9]" />
            </div>

            <h2 className="mt-4 text-[44px] font-medium leading-[1.12] tracking-[-0.02em] text-[#5E5E5E]">
              You will find our <span className="text-[#35B24A]">Client&apos;s</span>
              <br />
              frequent questions
            </h2>
          </div>

          {/* tabs */}
          <div className="pt-[54px]">
            <div className="flex items-center gap-[18px]">
              {TABS.map((t) => {
                const isActive = t.key === activeKey;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => {
                      setActiveKey(t.key);
                      setOpenIndex(null);
                    }}
                    className={[
                      "relative text-[12px] font-semibold",
                      isActive ? "text-[#FF7A00]" : "text-[#A7A7A7] hover:text-[#7F7F7F]",
                    ].join(" ")}
                  >
                    {t.label}
                    <span
                      className={[
                        "absolute left-0 -bottom-[8px] h-[2px] w-full rounded-full transition",
                        isActive ? "bg-[#FF7A00]" : "bg-transparent",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* questions block */}
        <div className="mt-[58px] grid grid-cols-1 gap-0 md:grid-cols-12">
          {/* left column */}
          <div className="md:col-span-6">
            <div className="divide-y divide-[#EFEFEF]">
              {leftItems.map((item, idx) => {
                const globalIndex = idx;
                const open = openIndex === globalIndex;
                return (
                  <div key={item.q} className="py-[18px] pr-10">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : globalIndex)}
                      className="flex w-full items-center justify-between gap-6 text-left"
                    >
                      <span className="text-[13px] font-semibold text-[#6E6E6E]">{item.q}</span>
                      <PlusIcon open={open} />
                    </button>

                    <div
                      className={[
                        "grid transition-all duration-300 ease-out",
                        open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[520px] text-[12px] leading-[1.8] text-[#8B8B8B]">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* divider */}
          <div className="hidden md:col-span-1 md:flex md:items-stretch md:justify-center">
            <div className="w-px bg-[#EAEAEA]" />
          </div>

          {/* right column */}
          <div className="md:col-span-5 md:pl-10">
            <div className="divide-y divide-[#EFEFEF]">
              {rightItems.map((item, idx) => {
                const globalIndex = idx + 3;
                const open = openIndex === globalIndex;
                return (
                  <div key={item.q} className="py-[18px]">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : globalIndex)}
                      className="flex w-full items-center justify-between gap-6 text-left"
                    >
                      <span className="text-[13px] font-semibold text-[#6E6E6E]">{item.q}</span>
                      <PlusIcon open={open} />
                    </button>

                    <div
                      className={[
                        "grid transition-all duration-300 ease-out",
                        open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[520px] text-[12px] leading-[1.8] text-[#8B8B8B]">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* bottom button */}
        <div className="mt-[44px] flex justify-center">
          <button
            type="button"
            className="h-[44px] rounded-full border-2 border-[#FF7A00] px-[22px] text-[12px] font-semibold text-[#FF7A00] hover:bg-[#FF7A00] hover:text-white transition"
          >
            Show all questions
          </button>
        </div>
      </div>
    </section>
  );
}
