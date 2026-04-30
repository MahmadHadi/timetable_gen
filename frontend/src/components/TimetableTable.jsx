import React from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
];

export default function TimetableTable({ slots }) {
  // safety check
  if (!Array.isArray(slots) || slots.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No time slots available.
      </p>
    );
  }

  // create lookup map: day + time → slot
  const schedule = {};

  slots.forEach((slot) => {
    const key = `${slot.day}-${slot.startTime}`;
    schedule[key] = slot;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 text-sm">
        {/* Header */}
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Time</th>
            {DAYS.map((day) => (
              <th key={day} className="border p-2 text-left">
                {day}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {TIME_SLOTS.map((time) => (
            <tr key={time}>
              <td className="border p-2 font-medium">{time}</td>

              {DAYS.map((day) => {
                const slot = schedule[`${day}-${time}`];

                return (
                  <td key={day + time} className="border p-2 align-top">
                    {slot ? (
                      <div
                        className={`p-2 rounded-md ${
                          slot.isFallback
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-50"
                        }`}
                      >
                        <p className="font-semibold text-sm">
                          {typeof slot.subject === "string"
                            ? slot.subject
                            : slot.subject?.name}
                        </p>

                        {slot.teacher && (
                          <p className="text-xs text-gray-600">
                            {slot.teacher.name}
                          </p>
                        )}

                        {slot.isFallback && (
                          <p className="text-xs text-yellow-600 mt-1">
                            fallback
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}