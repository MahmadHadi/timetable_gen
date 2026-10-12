import LandingNav from "../components/landing/LandingNav.jsx";
import Hero from "../components/landing/Hero.jsx";
import Features from "../components/landing/Features.jsx";
import FinalCta from "../components/landing/FinalCta.jsx";
import LandingFooter from "../components/landing/LandingFooter.jsx";

// Props:
//   onNavigate (fn) – the App's page switcher; the CTAs call onNavigate("home")
export default function LandingPage({ onNavigate }) {
  const scrollToFeatures = (e) => {
    e.preventDefault();
    const el = document.getElementById("features");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="bg-white text-slate-900 antialiased">
      <LandingNav onNavigate={onNavigate} onScrollToFeatures={scrollToFeatures} />
      <Hero onNavigate={onNavigate} onScrollToFeatures={scrollToFeatures} />
      <Features />
      <FinalCta onNavigate={onNavigate} />
      <LandingFooter />
    </div>
  );
}
