"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COUNTRIES } from "@/app/libs/countries";
import * as Flags from "country-flag-icons/react/3x2";
import { clampLen, cleanDigits, sanitizeObject, validateByRules } from "@/app/libs/sanitiser";

type ServiceOption = { value: string; label: string };
type SubmitStatus = "idle" | "submitting" | "success" | "error";

type ContactFormShape = {
  firstName: string;
  businessName: string;
  email: string;
  service: string;
  country: string;
  dial: string;
  phone: string;
  message: string;
  agree: boolean;
};

const LIMITS = {
  firstName: 40,
  businessName: 60,
  email: 120,
  message: 800,
  phoneDigits: 15,
} as const;

const CONTACT_RULES = {
  firstName: { type: "text", max: LIMITS.firstName, required: true },
  businessName: { type: "text", max: LIMITS.businessName, required: true },
  email: { type: "email", max: LIMITS.email, required: true },
  service: { type: "text", max: 80, required: true },
  country: { type: "text", max: 4, required: true },
  dial: { type: "text", max: 8, required: true },
  phone: { type: "digits", max: LIMITS.phoneDigits, required: true, minLen: 7 },
  message: { type: "text", max: LIMITS.message, required: true, minLen: 10 },
  agree: { type: "boolean", requiredTrue: true },
} as const;

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

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const DISPLAY_NAMES = useMemo(() => new Intl.DisplayNames(["en"], { type: "region" }), []);

  const pk = useMemo(() => COUNTRIES.find((c) => c.code === "PK"), []);

  const [form, setForm] = useState<ContactFormShape>({
    firstName: "",
    businessName: "",
    email: "",
    service: "",
    country: "PK",
    dial: pk?.dial || "+92",
    phone: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverErr, setServerErr] = useState<string | null>(null);
  const successTimer = useRef<number | null>(null);

  useEffect(() => {
    const onDoc = (ev: MouseEvent) => {
      const t = ev.target as Node;
      if (ddRef.current && !ddRef.current.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    return () => {
      if (successTimer.current) window.clearTimeout(successTimer.current);
    };
  }, []);

  const SelectedFlag = (Flags as any)[form.country] as React.FC<any> | undefined;

  const selectCountry = (code: string) => {
    const found = COUNTRIES.find((c) => c.code === code);
    setForm((p) => ({
      ...p,
      country: code,
      dial: found?.dial || "",
    }));
    setOpen(false);
    setErrors((e) => ({ ...e, country: "", dial: "" }));
    setServerErr(null);
    if (status !== "idle") setStatus("idle");
  };

  const onChange =
    (k: keyof ContactFormShape) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const isCheck = (e.target as HTMLInputElement).type === "checkbox";
      const v = isCheck ? (e.target as HTMLInputElement).checked : e.target.value;

      setForm((p) => {
        if (k === "firstName") return { ...p, firstName: clampLen(String(v), LIMITS.firstName) };
        if (k === "businessName")
          return { ...p, businessName: clampLen(String(v), LIMITS.businessName) };
        if (k === "email") return { ...p, email: clampLen(String(v), LIMITS.email) };
        if (k === "message") return { ...p, message: clampLen(String(v), LIMITS.message) };
        return { ...p, [k]: v as any };
      });

      setErrors((er) => ({ ...er, [k]: "" }));
      setServerErr(null);
      if (status !== "idle") setStatus("idle");
    };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = cleanDigits(e.target.value, LIMITS.phoneDigits);
    setForm((p) => ({ ...p, phone: digits }));
    setErrors((er) => ({ ...er, phone: "" }));
    setServerErr(null);
    if (status !== "idle") setStatus("idle");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerErr(null);

    // ✅ sanitize + validate (client)
    const cleaned = sanitizeObject<ContactFormShape>(form, CONTACT_RULES as any);
    const eMap = validateByRules<ContactFormShape>(cleaned, CONTACT_RULES as any);
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleaned),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok || !data?.ok) {
        setStatus("error");

        // ✅ BIG FIX: show Zod field issues from backend on UI
        if (Array.isArray(data?.issues)) {
          const apiErrs: Record<string, string> = {};
          for (const it of data.issues) {
            if (it?.path) apiErrs[it.path] = it.message || "Invalid";
          }
          setErrors((p) => ({ ...p, ...apiErrs }));
        }

        setServerErr(data?.message || "Failed to send message. Please try again.");
        return;
      }

      setStatus("success");

      // reset fields (keep country + dial)
      setForm((p) => ({
        ...p,
        firstName: "",
        businessName: "",
        email: "",
        service: "",
        phone: "",
        message: "",
        agree: false,
      }));

      setErrors({});
      setOpen(false);

      if (successTimer.current) window.clearTimeout(successTimer.current);
      successTimer.current = window.setTimeout(() => setStatus("idle"), 2800);
    } catch {
      setStatus("error");
      setServerErr("Network error. Please try again.");
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes scaleIn {
              0% { transform: scale(0); }
              60% { transform: scale(1.12); }
              100% { transform: scale(1); }
            }
          `,
        }}
      />

      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-[52px] sm:px-8 sm:py-[58px]">
          <div className="grid grid-cols-12 items-start lg:items-center gap-y-10 lg:gap-x-[70px]">
            {/* LEFT IMAGE */}
            <div className="col-span-12 lg:col-span-6">
              <div
                className="
                  relative w-full overflow-hidden bg-[#f3f3f3]
                  h-[340px] sm:h-[420px] md:h-[520px] lg:h-[640px]
                  rounded-[34px] sm:rounded-[60px] lg:rounded-[92px]
                "
              >
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80"
                  alt="Contact"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ filter: "grayscale(1) contrast(1.05) brightness(1.03)" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white/20" />
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-span-12 lg:col-span-6">
              <div className="lg:pt-3">
                <h2 className="text-[#595A5A] font-semibold tracking-[-0.02em] text-[30px] leading-[1.18] sm:text-[34px] md:text-[36px]">
                  Get in touch with us. We&apos;re
                  <br />
                  here to assist you.
                </h2>

                <p className="mt-3 sm:mt-4 text-[14px] sm:text-[20px] text-[#525252]">
                  Our friendly team would love to hear from you.
                </p>

                <form onSubmit={onSubmit} className="mt-7 sm:mt-[34px]" noValidate>
                  <div className="grid grid-cols-12 gap-x-[18px] sm:gap-x-[26px] gap-y-[16px] sm:gap-y-[18px]">
                    {/* Your name */}
                    <div className="col-span-12 md:col-span-6">
                      <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                        Your name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={form.firstName}
                        onChange={onChange("firstName")}
                        placeholder="First name"
                        className={[
                          "h-[44px] w-full rounded-[10px] border bg-white px-[14px] text-[14px] text-[#555] outline-none transition",
                          errors.firstName ? "border-red-300" : "border-[#E6E6E6]",
                          "focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]",
                        ].join(" ")}
                      />
                      {errors.firstName ? (
                        <p className="mt-1 text-[12px] text-red-500">{errors.firstName}</p>
                      ) : null}
                    </div>

                    {/* Business name */}
                    <div className="col-span-12 md:col-span-6">
                      <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                        Business name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={form.businessName}
                        onChange={onChange("businessName")}
                        placeholder="Business name"
                        className={[
                          "h-[44px] w-full rounded-[10px] border bg-white px-[14px] text-[14px] text-[#555] outline-none transition",
                          errors.businessName ? "border-red-300" : "border-[#E6E6E6]",
                          "focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]",
                        ].join(" ")}
                      />
                      {errors.businessName ? (
                        <p className="mt-1 text-[12px] text-red-500">{errors.businessName}</p>
                      ) : null}
                    </div>

                    {/* Email */}
                    <div className="col-span-12 md:col-span-6">
                      <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={onChange("email")}
                        placeholder="you@company.com"
                        className={[
                          "h-[44px] w-full rounded-[10px] border bg-white px-[14px] text-[14px] text-[#555] outline-none transition",
                          errors.email ? "border-red-300" : "border-[#E6E6E6]",
                          "focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]",
                        ].join(" ")}
                      />
                      {errors.email ? (
                        <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>
                      ) : null}
                    </div>

                    {/* Requested service */}
                    <div className="col-span-12 md:col-span-6">
                      <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                        Requested service <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={form.service}
                          onChange={onChange("service")}
                          className={[
                            "h-[44px] w-full appearance-none rounded-[10px] border bg-white px-[14px] pr-[42px] text-[14px] text-[#777] outline-none transition",
                            errors.service ? "border-red-300" : "border-[#E6E6E6]",
                            "focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]",
                          ].join(" ")}
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
                      {errors.service ? (
                        <p className="mt-1 text-[12px] text-red-500">{errors.service}</p>
                      ) : null}
                    </div>

                    {/* Phone */}
                    <div className="col-span-12">
                      <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                        Phone number <span className="text-red-500">*</span>
                      </label>

                      <div className="flex h-[44px] w-full overflow-visible rounded-[10px] border border-[#E6E6E6] bg-white">
                        {/* LEFT: flag + dropdown */}
                        <div
                          ref={ddRef}
                          className="relative flex items-center gap-2 border-r border-[#EFEFEF] px-[12px]"
                        >
                          <button
                            type="button"
                            onClick={() => setOpen((s) => !s)}
                            className="flex items-center gap-2 outline-none"
                          >
                            <span className="h-[22px] w-[32px] overflow-hidden rounded-[6px] border border-[#E6E6E6] bg-white">
                              {SelectedFlag ? <SelectedFlag title={form.country} /> : null}
                            </span>

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#B0B0B0]">
                              <path
                                d="M7 10l5 5 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          {/* dropdown panel */}
                          {open && (
                            <div className="absolute left-0 top-[46px] z-50 w-[320px] rounded-[12px] border border-[#EAEAEA] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
                              <div className="max-h-[260px] overflow-auto py-2">
                                {COUNTRIES.map((c) => {
                                  const Flag = (Flags as any)[c.code] as React.FC<any> | undefined;
                                  const name = mounted ? DISPLAY_NAMES.of(c.code) || c.code : c.code;
                                  const active = c.code === form.country;

                                  return (
                                    <button
                                      key={c.code}
                                      type="button"
                                      onClick={() => selectCountry(c.code)}
                                      className={[
                                        "w-full px-3 py-2 text-left flex items-center justify-between gap-3 hover:bg-[#F7F7F7] transition",
                                        active ? "bg-[#F3F3F3]" : "",
                                      ].join(" ")}
                                    >
                                      <span className="flex items-center gap-3">
                                        <span className="h-[18px] w-[28px] overflow-hidden rounded-[5px] border border-[#E6E6E6] bg-white">
                                          {Flag ? <Flag title={c.code} /> : null}
                                        </span>
                                        <span className="text-[13px] text-[#444]">{name}</span>
                                      </span>

                                      <span className="text-[13px] text-[#7A7A7A]">{c.dial}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* RIGHT: input */}
                        <div className="relative flex-1">
                          <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#666]">
                            {form.dial}
                          </span>

                          <input
                            required
                            value={form.phone}
                            onChange={onPhoneChange}
                            inputMode="tel"
                            placeholder=""
                            className="h-full w-full bg-white pl-[56px] pr-[14px] text-[14px] text-[#666] outline-none"
                          />
                        </div>
                      </div>

                      {errors.phone ? <p className="mt-1 text-[12px] text-red-500">{errors.phone}</p> : null}
                    </div>

                    {/* Message */}
                    <div className="col-span-12">
                      <label className="mb-[8px] block text-[12px] font-semibold text-[#5F5F5F]">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={onChange("message")}
                        placeholder="Leave us a message..."
                        className={[
                          "h-[140px] sm:h-[150px] w-full resize-none rounded-[10px] border bg-white px-[14px] py-[12px] text-[14px] text-[#666] outline-none transition",
                          errors.message ? "border-red-300" : "border-[#E6E6E6]",
                          "focus:border-[#DCDCDC] focus:shadow-[0_0_0_3px_rgba(83,194,39,0.12)]",
                        ].join(" ")}
                      />
                      {errors.message ? (
                        <p className="mt-1 text-[12px] text-red-500">{errors.message}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* privacy */}
                  <div className="mt-[18px] flex items-start gap-3">
                    <input
                      id="agree"
                      type="checkbox"
                      checked={form.agree}
                      onChange={onChange("agree")}
                      required
                      className="mt-[2px] h-[16px] w-[16px] rounded border border-[#D9D9D9] accent-[#56C227]"
                    />
                    <label htmlFor="agree" className="text-[13px] leading-[1.5] text-[#8B8B8B]">
                      You agree to our friendly{" "}
                      <Link href="/privacy" className="text-[#7C7C7C] underline underline-offset-2">
                        privacy policy
                      </Link>
                      .
                      {errors.agree ? (
                        <span className="block mt-1 text-[12px] text-red-500">{errors.agree}</span>
                      ) : null}
                    </label>
                  </div>

                  {/* button */}
                  <button
                    type="submit"
                    disabled={status === "submitting" || status === "success"}
                    className={[
                      "mt-[18px] h-[54px] w-full rounded-full text-[14px] font-semibold text-white shadow-[0_14px_34px_rgba(86,194,39,0.28)] transition active:scale-[0.995] flex items-center justify-center gap-2",
                      status === "success" ? "bg-[#2f7d13]" : "bg-[#56C227] hover:brightness-[0.98]",
                      status === "submitting" ? "opacity-70 cursor-not-allowed" : "",
                    ].join(" ")}
                    style={status === "success" ? { animation: "fadeIn 0.25s ease-out" } : undefined}
                  >
                    {status === "submitting" ? (
                      "Sending..."
                    ) : status === "success" ? (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: "scaleIn 0.35s ease-out" }}>
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Submitted
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>

                  {serverErr ? <p className="mt-3 text-[13px] font-medium text-red-500">{serverErr}</p> : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
