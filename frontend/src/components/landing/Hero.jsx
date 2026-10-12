import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import CtaButton from "./CtaButton.jsx";
import TimetablePreview from "./TimetablePreview.jsx";

export default function Hero({ onNavigate, onScrollToFeatures }) {
  const root = useRef(null);

  // Short entrance animation + slow drift on two decorative glows.
  // Skipped entirely when the user prefers reduced motion; fully reverted on unmount.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from("[data-hero]", {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          clearProps: "transform,opacity",
        });
        gsap.from("[data-preview]", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
        gsap.from("[data-block]", {
          opacity: 0,
          scale: 0.92,
          duration: 0.35,
          delay: 0.45,
          ease: "power2.out",
          stagger: 0.015,
          clearProps: "transform,opacity",
        });
        gsap.to("[data-float]", {
          y: (i) => (i % 2 === 0 ? 14 : -14),
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      },
      root
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden">
      {/* Decorative glows (aria-hidden, transform-only animation) */}
      <div
        data-float
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.14),transparent)]"
      />
      <div
        data-float
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.10),transparent)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <h1
            data-hero
            className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]"
          >
            Your Schedule, <span className="text-indigo-600">Organized in Seconds.</span>
          </h1>
          <p data-hero className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Create structured weekly timetables with less manual work. Organize subjects,
            teachers, and schedules in one simple workflow.
          </p>
          <div data-hero className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaButton onNavigate={onNavigate} size="lg" />
            <a
              href="#features"
              onClick={onScrollToFeatures}
              className="inline-flex h-12 items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Explore Features <span aria-hidden="true" className="ml-1">↓</span>
            </a>
          </div>
        </div>

        <TimetablePreview />
      </div>
    </section>
  );
}
