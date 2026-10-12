const FEATURES = [
  {
    n: "01",
    title: "Simple Scheduling",
    text: "Organize subjects across a Monday–Friday grid of hourly slots, with a lunch break built in.",
  },
  {
    n: "02",
    title: "Teacher & Subject Management",
    text: "Add subjects with weekly hours and assign teachers to the subjects they teach, all in one place.",
  },
  {
    n: "03",
    title: "Automated Timetable Generation",
    text: "Enter your classes and get timetables generated for you, with no teacher double-booked across classes.",
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-slate-100 bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="mono text-xs uppercase tracking-widest text-indigo-600">Features</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          A simpler way to plan the week
        </h2>

        <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.n}
              className="rounded-xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <span className="mono text-sm text-indigo-600">{f.n}</span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
