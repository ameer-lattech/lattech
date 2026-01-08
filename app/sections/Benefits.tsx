// sections/Testimonials.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    text:
      "Lattech Solutions transformed our online presence. Our lead generation has more than doubled, and we've seen a significant increase in sales.",
    name: "James Carter",
    role: "CEO at TechFlow Solutions",
    img: "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-smiling-millennial-man.jpg?s=612x612&w=0&k=20&c=Yy7Z5m9Q7Pjv2rJq6mYyW1n3pYhW0Y7c0m3f2dZVx7k=",
  },
  {
    text:
      "Their social media strategies have been a game-changer for our brand. We're now connecting with our customers on a whole new level.",
    name: "Sophia Martinez",
    role: "Operations Manager at NexaCorp",
    img: "https://media.istockphoto.com/id/1386479313/photo/studio-shot-of-a-young-businesswoman.jpg?s=612x612&w=0&k=20&c=1g2KQmGqZBq8W4o8g8f2o8oVg0c2mP1eQkS4m4v0R3k=",
  },
  {
    text:
      "We were struggling to get a return on our ad spend. Lattech Solutions optimized our PPC campaigns, and the results were incredible.",
    name: "David Reynolds",
    role: "Head of Sales at GrowthPeak",
    img: "https://media.istockphoto.com/id/1136413215/photo/portrait-of-a-confident-businessman.jpg?s=612x612&w=0&k=20&c=1C7p8p1c0uS7n3mYt7fQj0m7gY9n6rFQp8v7rJm4oWQ=",
  },
  {
    text:
      "The 360-degree approach is what sets Lattech apart. Having all our marketing efforts—from SEO to email—managed by one team.",
    name: "Emily Wong",
    role: "Customer Success Lead at SupportHive",
    img: "https://media.istockphoto.com/id/1437816897/photo/portrait-of-young-businesswoman.jpg?s=612x612&w=0&k=20&c=0c6o8m2oG1y1n0m8w3y7k9b0o6m9f2x1p4q3r2s1t0=",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1 text-white">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="fill-white"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-24 font-sans md:py-28">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.03),rgba(0,0,0,0.92)_62%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute left-1/2 top-[-180px] h-[540px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),rgba(168,85,247,0.06)_45%,transparent_70%)] blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[820px] text-center"
        >
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md shadow-[0_14px_34px_rgba(0,0,0,0.6)]">
              Testimonials
            </span>
          </div>

          <h2 className="mt-7 text-[40px] font-semibold leading-[1.06] tracking-tight text-white md:text-[56px]">
            Why Businesses Love Our
            <br />
            360° Marketing Solutions
          </h2>

          <p className="mx-auto mt-5 max-w-[620px] text-[14px] leading-6 text-white/60 md:text-[15px]">
            Real businesses, real growth with our digital marketing expertise.
          </p>
        </motion.div>

        {/* grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: idx * 0.06,
              }}
              className="group relative overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.02] px-7 py-6"
              style={{ boxShadow: "0 24px 70px rgba(0,0,0,0.75)" }}
            >
              {/* bottom glow */}
              <div className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-[130%] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.22),transparent_62%)] opacity-70 blur-2xl" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_260px_at_50%_110%,rgba(168,85,247,0.10),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <Stars />

              <p className="mt-4 max-w-[520px] text-[13px] leading-[1.65] text-white/65 md:text-[14px]">
                “{t.text}”
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/15">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>

                <div className="leading-tight">
                  <div className="text-[13px] font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
