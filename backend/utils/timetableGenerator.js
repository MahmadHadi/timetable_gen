// utils/timetableGenerator.js

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const TIME_SLOTS = [
  { startTime: "10:00", endTime: "11:00" },
  { startTime: "11:00", endTime: "12:00" },
  { startTime: "12:00", endTime: "13:00" },
  { startTime: "14:00", endTime: "15:00" },
  { startTime: "15:00", endTime: "16:00" },
];

// helper
const busyKey = (teacherId, day, startTime) =>
  `${teacherId}_${day}_${startTime}`;

// build teacher map
const buildTeacherMap = (teachers) => {
  const map = new Map();

  for (const teacher of teachers) {
    for (const sub of teacher.subjects) {
      const key = sub.toString();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(teacher);
    }
  }

  return map;
};

// MAIN MULTI CLASS FUNCTION
// export const generateMultiClassTimetable = (classes, subjects, teachers) => {
//   const teacherMap = buildTeacherMap(teachers);
//   const globalBusy = new Set();

//   const result = {};

//   for (const className of classes) {
//     const slots = [];

//     // create queue based on hoursPerWeek
//     const queue = [];

//     for (const sub of subjects) {
//       const teachersForSub = teacherMap.get(sub._id.toString()) || [];

//       if (teachersForSub.length === 0) continue;

//       for (let i = 0; i < sub.hoursPerWeek; i++) {
//         queue.push({
//           subject: sub,
//           teachers: teachersForSub,
//         });
//       }
//     }

//     let fallbackToggle = false;

//     for (const day of DAYS) {
//       for (const { startTime, endTime } of TIME_SLOTS) {
//         let assigned = false;

//         for (let i = 0; i < queue.length; i++) {
//           const item = queue[i];

//           const availableTeacher = item.teachers.find(
//             (t) =>
//               !globalBusy.has(
//                 busyKey(t._id.toString(), day, startTime)
//               )
//           );

//           if (availableTeacher) {
//             slots.push({
//               day,
//               startTime,
//               endTime,
//               subject: {
//                 _id: item.subject._id,
//                 name: item.subject.name,
//               },
//               teacher: {
//                 _id: availableTeacher._id,
//                 name: availableTeacher.name,
//               },
//               isFallback: false,
//             });

//             globalBusy.add(
//               busyKey(availableTeacher._id.toString(), day, startTime)
//             );

//             queue.splice(i, 1);
//             assigned = true;
//             break;
//           }
//         }

//         // fallback
//         if (!assigned) {
//           const fallbackSubject = fallbackToggle
//             ? "Library"
//             : "Sports";

//           fallbackToggle = !fallbackToggle;

//           const original = queue.length > 0 ? queue[0].subject.name : null;

//           slots.push({
//             day,
//             startTime,
//             endTime,
//             subject: fallbackSubject,
//             teacher: null,
//             isFallback: true,
//             originalSubject: original,
//             note: "Conflict avoided - adjust later",
//           });
//         }
//       }
//     }

//     result[className] = { slots };
//   }

//   return result;
// };

export const generateMultiClassTimetable = (classes, subjects, teachers) => {
  const teacherMap = new Map();
  const globalBusy = new Set();

  // build teacher map
  for (const teacher of teachers) {
    for (const sub of teacher.subjects) {
      const key = sub.toString();
      if (!teacherMap.has(key)) teacherMap.set(key, []);
      teacherMap.get(key).push(teacher);
    }
  }

  const result = {};

  for (const className of classes) {
    const slots = [];

    // create queue
    let queue = [];

    for (const sub of subjects) {
      const teachersForSub = teacherMap.get(sub._id.toString()) || [];

      if (teachersForSub.length === 0) continue;

      for (let i = 0; i < sub.hoursPerWeek; i++) {
        queue.push({
          subject: sub,
          teachers: teachersForSub,
        });
      }
    }

    // 🔥 shuffle queue (reduces clustering)
    queue.sort(() => Math.random() - 0.5);

    let fallbackToggle = false;
    let lastSubject = null; // 👈 key improvement

    for (const day of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]) {
      for (const { startTime, endTime } of [
        { startTime: "10:00", endTime: "11:00" },
        { startTime: "11:00", endTime: "12:00" },
        { startTime: "12:00", endTime: "13:00" },
        { startTime: "14:00", endTime: "15:00" },
        { startTime: "15:00", endTime: "16:00" },
      ]) {

        let assigned = false;

        for (let i = 0; i < queue.length; i++) {
          const item = queue[i];

          // 🚫 avoid repetition
          if (
            lastSubject &&
            item.subject._id.toString() === lastSubject
          ) {
            continue;
          }

          const availableTeacher = item.teachers.find(
            (t) =>
              !globalBusy.has(
                `${t._id}_${day}_${startTime}`
              )
          );

          if (availableTeacher) {
            slots.push({
              day,
              startTime,
              endTime,
              subject: {
                _id: item.subject._id,
                name: item.subject.name,
              },
              teacher: {
                _id: availableTeacher._id,
                name: availableTeacher.name,
              },
              isFallback: false,
            });

            globalBusy.add(
              `${availableTeacher._id}_${day}_${startTime}`
            );

            lastSubject = item.subject._id.toString(); // 👈 update
            queue.splice(i, 1);
            assigned = true;
            break;
          }
        }

        // fallback
        if (!assigned) {
          const fallbackSubject = fallbackToggle ? "Library" : "Sports";
          fallbackToggle = !fallbackToggle;

          const original =
            queue.length > 0 ? queue[0].subject.name : null;

          slots.push({
            day,
            startTime,
            endTime,
            subject: fallbackSubject,
            teacher: null,
            isFallback: true,
            originalSubject: original,
            note: "Conflict avoided - adjust later",
          });

          lastSubject = null; // reset
        }
      }
    }

    result[className] = { slots };
  }

  return result;
};