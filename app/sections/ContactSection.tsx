"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ServiceOption = { value: string; label: string };

export default function ContactUsSection() {
  const services: ServiceOption[] = useMemo(
    () => [
      { value: "", label: "Select" },
      { value: "custom-software", label: "Custom Software" },
      { value: "mobile-apps", label: "Mobile Apps" },
      { value: "web-development", label: "Web Development" },
      { value: "ecommerce", label: "E-commerce" },
      { value: "devops", label: "DevOps" },
    ],
    []
  );

  const [form, setForm] = useState({
    firstName: "",
    businessName: "",
    email: "",
    service: "",
    country: "PK",
    phone: "",
    message: "",
    agree: false,
  });

  const onChange =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const v =
        (e.target as HTMLInputElement).type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setForm((p) => ({ ...p, [k]: v as any }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section className="w-full bg-white">
      {/* ✅ EXACT 1280 layout system */}
      <div className="mx-auto max-w-[1280px] px-8 py-[58px]">
        <div className="grid grid-cols-12 items-start lg:items-center gap-y-10 gap-x-0 lg:gap-x-[70px]">
          {/* LEFT IMAGE */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative w-full overflow-hidden rounded-[92px] bg-[#f3f3f3] h-[420px] md:h-[520px] lg:h-[640px]">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80"
                alt="Contact"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{
                  filter: "grayscale(1) contrast(1.05) brightness(1.03)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white/20" />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-span-12 lg:col-span-6">
            {/* ✅ keep your original “slightly down” feel but controlled */}
            <div className="lg:pt-3">
              <h2 className="text-[#5D5D5D] font-semibold tracking-[-0.02em] text-[36px] leading-[1.18]">
                Get in touch with us. We&apos;re
                <br />
                here to assist you.
              </h2>

              <p className="mt-4 text-[16px] text-[#8A8A8A]">
                Our friendly team would love to hear from you.
              </p>

              <form onSubmit={onSubmit} className="mt-[34px]">
                <div className="grid grid-cols-12 gap-x-[26px] gap-y-[18px]">
                  {/* Your name */}
                  <div className="col-span-12 md:col-span-6">
                    <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                      Your name
                    </label>
                    <input
                      value={form.firstName}
                      onChange={onChange("firstName")}
                      placeholder="First name"
                      className="h-[44px] w-full rounded-[10px] border border-[#E6E6E6] bg-white px-[14px] text-[14px] text-[#555] outline-none transition focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]"
                    />
                  </div>

                  {/* Business name */}
                  <div className="col-span-12 md:col-span-6">
                    <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                      Business name
                    </label>
                    <input
                      value={form.businessName}
                      onChange={onChange("businessName")}
                      placeholder="Last name"
                      className="h-[44px] w-full rounded-[10px] border border-[#E6E6E6] bg-white px-[14px] text-[14px] text-[#555] outline-none transition focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-12 md:col-span-6">
                    <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder="you@company.com"
                      className="h-[44px] w-full rounded-[10px] border border-[#E6E6E6] bg-white px-[14px] text-[14px] text-[#555] outline-none transition focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]"
                    />
                  </div>

                  {/* Requested service */}
                  <div className="col-span-12 md:col-span-6">
                    <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                      Requested service
                    </label>
                    <div className="relative">
                      <select
                        value={form.service}
                        onChange={onChange("service")}
                        className="h-[44px] w-full appearance-none rounded-[10px] border border-[#E6E6E6] bg-white px-[14px] pr-[42px] text-[14px] text-[#777] outline-none transition focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]"
                      >
                        {services.map((s) => (
                          <option key={s.value || "select"} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>

                      <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[#9E9E9E]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7 10l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Phone number */}
                  <div className="col-span-12">
                    <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                      Phone number
                    </label>

                    <div className="flex h-[44px] w-full overflow-hidden rounded-[10px] border border-[#E6E6E6] bg-white">
                      <div className="flex items-center gap-2 border-r border-[#EFEFEF] px-[12px]">
                        <select
                          value={form.country}
                          onChange={onChange("country")}
                          className="h-full bg-transparent text-[13px] font-medium text-[#666] outline-none"
                        >
                          <option value="PK">PK</option>
                          <option value="AE">AE</option>
                          <option value="SA">SA</option>
                          <option value="US">US</option>
                          <option value="UK">UK</option>
                        </select>
                        <span className="text-[#B0B0B0]">▾</span>
                      </div>

                      <input
                        value={form.phone}
                        onChange={onChange("phone")}
                        placeholder="+92 (000) 000-0000"
                        className="h-full flex-1 bg-white px-[14px] text-[14px] text-[#666] outline-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="col-span-12">
                    <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={onChange("message")}
                      placeholder="Leave us a message..."
                      className="h-[150px] w-full resize-none rounded-[10px] border border-[#E6E6E6] bg-white px-[14px] py-[12px] text-[14px] text-[#666] outline-none transition focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]"
                    />
                  </div>
                </div>

                {/* privacy */}
                <div className="mt-[18px] flex items-center gap-3">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={form.agree}
                    onChange={onChange("agree")}
                    className="h-[16px] w-[16px] rounded border border-[#D9D9D9] accent-[#56C227]"
                  />
                  <label htmlFor="agree" className="text-[13px] text-[#8B8B8B]">
                    You agree to our friendly{" "}
                    <Link
                      href="/privacy"
                      className="text-[#7C7C7C] underline underline-offset-2"
                    >
                      privacy policy
                    </Link>
                    .
                  </label>
                </div>

                {/* button */}
                <button
                  type="submit"
                  className="mt-[18px] h-[54px] w-full rounded-full bg-[#56C227] text-[14px] font-semibold text-white shadow-[0_14px_34px_rgba(86,194,39,0.28)] transition hover:brightness-[0.98] active:scale-[0.995]"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
