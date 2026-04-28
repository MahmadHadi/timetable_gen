// ─── Constants ────────────────────────────────────────────────────────────────

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const TIME_SLOTS = [
  { startTime: "10:00", endTime: "11:00" },
  { startTime: "11:00", endTime: "12:00" },
  { startTime: "12:00", endTime: "13:00" },
  { startTime: "14:00", endTime: "15:00" },
  { startTime: "15:00", endTime: "16:00" },
];

// Total available slots in a week = 5 days × 5 periods = 25
export const TOTAL_SLOTS = DAYS.length * TIME_SLOTS.length;

// ─── Build teacher → subjects lookup ──────────────────────────────────────────

/**
 * Returns a Map<subjectId (string), Teacher[]>
 * so we can quickly find who can teach a given subject.
 */
// export const buildTeacherMap = (teachers) => {
//   const map = new Map(); // subjectId → [teacher, ...]

//   for (const teacher of teachers) {
//     for (const subjectId of teacher.subjects) {
//       const key = subjectId.toString();
//       if (!map.has(key)) map.set(key, []);
//       map.get(key).push(teacher);
//     }
//   }

//   return map;
// };
// ─── Build teacher → subjects lookup ──────────────────────────────────────────

export const buildTeacherMap = (teachers) => {
  const map = new Map();

  // 🔍 DEBUG — remove once confirmed working
  console.log("── buildTeacherMap debug ──");

  for (const teacher of teachers) {
    // Fix 1: Safely extract the id whether subjects holds ObjectIds OR
    //        populated Subject documents (both shapes handled).
    const subjectIds = teacher.subjects.map((s) =>
      typeof s === "object" && s._id ? s._id.toString() : s.toString(),
    );

    // 🔍 DEBUG
    console.log(`Teacher "${teacher.name}" → subject keys:`, subjectIds);

    for (const key of subjectIds) {
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(teacher);
    }
  }

  // 🔍 DEBUG
  console.log("teacherMap keys:", [...map.keys()]);

  return map;
};

// ─── Core generation ──────────────────────────────────────────────────────────

/**
 * Pure function — no DB calls, no Express objects.
 *
 * @param {Subject[]} subjects  - Mongoose Subject documents
 * @param {Teacher[]} teachers  - Mongoose Teacher documents
 * @returns {{ slots: object[], warnings: string[] }}
 */
export const buildTimetable = (subjects, teachers) => {
  const warnings = [];
  const teacherMap = buildTeacherMap(teachers);

  // ─── 1. Build the pending queue ────────────────────────────────────────────
  const pending = [];

  for (const subject of subjects) {
    // Fix 2: Always call .toString() on the Mongoose _id
    const subjectId = subject._id.toString();

    // 🔍 DEBUG
    console.log(`Subject "${subject.name}" → _id key: ${subjectId}`);

    const assignableTeachers = teacherMap.get(subjectId) || [];

    if (assignableTeachers.length === 0) {
      warnings.push(
        `No teacher assigned to subject "${subject.name}" — it will be skipped.`,
      );
      continue;
    }

    pending.push({
      subject,
      teachers: assignableTeachers,
      remaining: subject.hoursPerWeek,
    });
  }

  // ── 2. Sanity-check: do we have enough room in the week? ───────────────────
  const totalRequired = pending.reduce((sum, e) => sum + e.remaining, 0);

  if (totalRequired > TOTAL_SLOTS) {
    warnings.push(
      `Total required hours (${totalRequired}) exceeds available weekly slots ` +
        `(${TOTAL_SLOTS}). Some subjects will be partially scheduled.`,
    );
  }

  // ── 3. Conflict tracker ────────────────────────────────────────────────────
  // Key format: "teacherId|day|startTime"
  // Using a Set gives O(1) insert and lookup.
  const teacherBusy = new Set();

  const busyKey = (teacherId, day, startTime) =>
    `${teacherId}|${day}|${startTime}`;

  // ── 4. Greedy slot-filling ─────────────────────────────────────────────────
  const slots = [];

  for (const day of DAYS) {
    for (const { startTime, endTime } of TIME_SLOTS) {
      // Sort descending by remaining hours so subjects with the most need
      // are always tried first — prevents them from being crowded out later.
      pending.sort((a, b) => b.remaining - a.remaining);

      let slotFilled = false;

      for (const entry of pending) {
        if (entry.remaining === 0) continue;

        // Find the first teacher for this subject who is free right now.
        const availableTeacher = entry.teachers.find(
          (t) => !teacherBusy.has(busyKey(t._id, day, startTime)),
        );

        if (!availableTeacher) continue; // all teachers busy → try next subject

        // ✅ Found a valid assignment
        slots.push({
          day,
          startTime,
          endTime,
          subject: entry.subject,
          teacher: availableTeacher,
        });

        teacherBusy.add(busyKey(availableTeacher._id, day, startTime));
        entry.remaining--;
        slotFilled = true;
        break; // move on to the next time slot
      }

      if (!slotFilled) {
        // Only warn when there is still unscheduled demand.
        const hasPendingWork = pending.some((e) => e.remaining > 0);
        if (!hasPendingWork) continue; // queue exhausted — empty slot is normal
        // All remaining subjects have no free teacher at this time — leave slot empty.
        warnings.push(
          `Could not fill slot: ${day} ${startTime}–${endTime} (all teachers for remaining subjects are busy at this time).`,
        );
      }
    }
  }

  // ── 5. Report any subjects that couldn't be fully scheduled ───────────────
  for (const entry of pending) {
    if (entry.remaining > 0) {
      warnings.push(
        `Subject "${entry.subject.name}" could only be partially scheduled ` +
          `(${entry.subject.hoursPerWeek - entry.remaining}/${entry.subject.hoursPerWeek} slots filled).`,
      );
    }
  }

  return { slots, warnings };
};
