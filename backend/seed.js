import mongoose from "mongoose";

// ─── Schemas ────────────────────────────────────────────────────────────────

const subjectSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  code:         { type: String, required: true, unique: true },
  hoursPerWeek: { type: Number, required: true },
});

const teacherSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

const Subject = mongoose.model("Subject", subjectSchema);
const Teacher  = mongoose.model("Teacher",  teacherSchema);

// ─── Seed Data ───────────────────────────────────────────────────────────────

const SUBJECT_DATA = [
  { name: "Mathematics",          code: "MATH101", hoursPerWeek: 6 },
  { name: "Physics",              code: "PHY102",  hoursPerWeek: 5 },
  { name: "Chemistry",            code: "CHEM103", hoursPerWeek: 5 },
  { name: "English Literature",   code: "ENG104",  hoursPerWeek: 4 },
  { name: "Computer Science",     code: "CS105",   hoursPerWeek: 6 },
  { name: "Biology",              code: "BIO106",  hoursPerWeek: 4 },
  { name: "History",              code: "HIST107", hoursPerWeek: 3 },
  { name: "Physical Education",   code: "PE108",   hoursPerWeek: 2 },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect("mongodb+srv://nayanihadi97_db_user:XO1gsQ4RsLM4lvSF@timetablegen.n7wq4gx.mongodb.net/?appName=TimeTableGen");
  console.log("Connected to MongoDB\n");

  // 1. Clear existing data
  await Subject.deleteMany({});
  await Teacher.deleteMany({});
  console.log("Cleared existing subjects and teachers\n");

  // 2. Insert subjects
  const subjects = await Subject.insertMany(SUBJECT_DATA);
  console.log(`Inserted ${subjects.length} subjects:`);
  subjects.forEach((s) =>
    console.log(`   • [${s.code}] ${s.name} — ${s.hoursPerWeek} hrs/week`)
  );

  // Helper: pick subjects by code
  const id = (code) => subjects.find((s) => s.code === code)._id;

  // 3. Build teachers — every subject appears at least once
  const teacherData = [
    {
      name:     "Dr. Aisha Patel",
      email:    "aisha.patel@school.edu",
      subjects: [id("MATH101"), id("PHY102")],
    },
    {
      name:     "Prof. Rajan Mehta",
      email:    "rajan.mehta@school.edu",
      subjects: [id("CHEM103"), id("BIO106")],
    },
    {
      name:     "Ms. Sarah Collins",
      email:    "sarah.collins@school.edu",
      subjects: [id("ENG104"), id("HIST107")],
    },
    {
      name:     "Mr. Arjun Sharma",
      email:    "arjun.sharma@school.edu",
      subjects: [id("CS105"), id("MATH101")],
    },
    {
      name:     "Coach Dev Nair",
      email:    "dev.nair@school.edu",
      subjects: [id("PE108"), id("PHY102")],
    },
  ];

  const teachers = await Teacher.insertMany(teacherData);
  console.log(`\n Inserted ${teachers.length} teachers:`);
  teachers.forEach((t) =>
    console.log(`   • ${t.name} (${t.subjects.length} subject(s))`)
  );

  // 4. Coverage check — every subject must have ≥1 teacher
  const assignedIds = new Set(
    teachers.flatMap((t) => t.subjects.map((id) => id.toString()))
  );
  console.log("\nSubject coverage check:");
  let allCovered = true;
  subjects.forEach((s) => {
    const covered = assignedIds.has(s._id.toString());
    if (!covered) allCovered = false;
    console.log(`   ${covered ? "✅" : "❌"} ${s.name} (${s.code})`);
  });

  if (allCovered) {
    console.log("\nAll subjects have at least one teacher assigned.");
  } else {
    console.warn("\nSome subjects are not covered — please review.");
  }

  await mongoose.disconnect();
  console.log("\nDisconnected. Seeding complete.");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  mongoose.disconnect();
  process.exit(1);
});