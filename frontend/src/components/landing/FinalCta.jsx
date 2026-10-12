import CtaButton from "./CtaButton.jsx";

export default function FinalCta({ onNavigate }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-6 py-12 text-center sm:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Ready to organize your schedule?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Add your classes and get a timetable in a few clicks.
        </p>
        <div className="mt-7">
          <CtaButton onNavigate={onNavigate} size="lg" />
        </div>
      </div>
    </section>
  );
}
