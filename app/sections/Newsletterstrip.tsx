    "use client";

    import React from "react";

    export default function NewsletterStrip() {
    return (
        <section className="w-full bg-[#5CBF30]">
        <div className="mx-auto w-full max-w-[1280px] px-10">
            <div className="grid min-h-[240px] grid-cols-12 items-center">
            {/* left */}
            <div className="col-span-7 pr-10">
                <h3 className="text-[36px] font-medium tracking-[-0.01em] text-white">
                Subcribe to our Newsletter
                </h3>

                <p className="mt-2 max-w-[620px] text-[20px] leading-[1.6] text-white/80">
                Subscribe for Updates: Stay informed about the latest investor updates, financial results, and
                announcements by subscribing to our newsletter.
                </p>
            </div>

            {/* right */}
            <div className="col-span-5 flex justify-end">
                <div className="flex h-[54px] w-[420px] items-center overflow-hidden rounded-[16px] bg-[#6CC441] shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="h-full w-full bg-transparent px-22 pl-7 pr-4 text-[12px] text-white placeholder:text-white/85 outline-none"
                />

                <button
                    type="button"
                    className="h-full w-[110px] bg-white text-[12px] font-medium text-[#66B93B]"
                >
                    Subscribe
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* mobile */}
        <style jsx>{`
            @media (max-width: 900px) {
            .grid {
                grid-template-columns: 1fr;
                grid-column-gap: 0;
                padding: 24px 0;
            }
            .col-span-7,
            .col-span-5 {
                grid-column: 1 / -1;
            }
            .col-span-7 {
                padding-right: 0 !important;
            }
            .col-span-5 {
                justify-content: flex-start !important;
                margin-top: 16px;
            }
            .col-span-5 > div {
                width: 100% !important;
            }
            }
        `}</style>
        </section>
    );
    }
