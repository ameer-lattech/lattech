"use client";

import React from "react";
import Link from "next/link";

type Item = {
  title: string;
  desc: string;
  href?: string;
};

const LEFT: Item[] = [
  {
    title: "Scoping",
    desc: "Learn how we gather complete requirements, map the accurate scope, and prevent scope creep while preserving critical deliverables.",
    href: "#",
  },
  {
    title: "Cost estimation",
    desc: "Explore the factors and principles we consider to deliver precise estimates, see our sample cost calculations, and learn our cost optimization practices.",
    href: "#",
  },
  {
    title: "Change management",
    desc: "Understand our structured and controllable process to record, assess, triage, and implement feasible change requests.",
    href: "#",
  },
  {
    title: "Project reporting",
    desc: "Learn the types and scope of reports we deliver in software development projects and explore report examples.",
    href: "#",
  },
];

const RIGHT: Item[] = [
  {
    title: "Resource planning",
    desc: "Discover how we compose a right-sized team and pick the best candidates for the needed roles under a fully outsourced cooperation model.",
    href: "#",
  },
  {
    title: "Risk management",
    desc: "Check the steps we take to recognize potential risks at early project stages and effectively tackle emerging challenges throughout the SDLC.",
    href: "#",
  },
  {
    title: "Success measurement",
    desc: "Check the KPIs we use to objectively evaluate cooperation health and learn our practices for joint success assessment.",
    href: "#",
  },
  {
    title: "Collaboration",
    desc: "Discover the communication forms and tools we use to ensure productive teamwork and smooth interactions with our clients.",
    href: "#",
  },
];

function LearnMore({ href = "#" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#FF7A00] hover:opacity-80 transition"
    >
      Learn more
      <span className="inline-flex translate-y-[1px]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

function Card({ item }: { item: Item }) {
  return (
    <div>
      <h4 className="text-[16px] font-semibold text-[#545454]">{item.title}</h4>
      <p className="mt-2 max-w-[360px] text-[13px] leading-[1.8] text-[#8C8C8C]">
        {item.desc}
      </p>
      <LearnMore href={item.href} />
    </div>
  );
}

export default function SecureSuccessSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1280px] px-8 py-[70px]">
        <div className="grid grid-cols-12 gap-x-[90px]">
          {/* LEFT BLOCK */}
          <div className="col-span-12 lg:col-span-4">
            {/* icon */}
            <div className="flex items-center gap-3">
              <div className="grid h-[54px] w-[54px] place-items-center rounded-full bg-[#EAF6E7]">
                {/* lightning-ish icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z"
                    stroke="#49B120"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <h2 className="mt-5 text-[44px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#4B4B4B]">
              Secure the <span className="text-[#52C227]">Success</span> of
              <br />
              your IT initiative
            </h2>

            <p className="mt-5 max-w-[340px] text-[14px] leading-[1.95] text-[#7F7F7F]">
              Check the tried-and-true project management practices we rely on to
              drive the project to its goals despite budget constraints and
              changing requirements. Beyond practices, our strength lies in our
              people and principles — defined by our Code of Conduct — ensuring
              every interaction is grounded in trust, respect, and transparency.
            </p>
          </div>

          {/* RIGHT GRID */}
          <div className="col-span-12 mt-10 lg:col-span-8 lg:mt-0">
            <div className="grid grid-cols-1 gap-y-[52px] md:grid-cols-2 md:gap-x-[90px]">
              <div className="space-y-[52px]">
                {LEFT.map((item) => (
                  <Card key={item.title} item={item} />
                ))}
              </div>

              <div className="space-y-[52px]">
                {RIGHT.map((item) => (
                  <Card key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
