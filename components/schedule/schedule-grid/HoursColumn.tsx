import React from "react";

const HoursColumn = () => {
  return (
    <>
      {Array.from({ length: 23 }, (_, hour) => (
        <div
          key={hour + 1}
          className="sticky left-[4px] z-30 flex -translate-y-1/2 items-center justify-end bg-blue-darker pr-[4px] text-xs text-slate-400"
          style={{
            gridColumn: "1",
            gridRow: `${2 + (hour + 1) * 12} / span 12`,
          }}
        >
          {hour + 1}:00
        </div>
      ))}

      {/* Dotted Lines for Each Hour */}
      {Array.from({ length: 23 }, (_, hour) => (
        <div
          key={`line-${hour + 1}`}
          className="border-t border-dashed border-slate-500"
          style={{
            gridColumn: "2 / span 7", // Extends across all 7 columns
            gridRow: `${2 + (hour + 1) * 12} / span 1`, // Places line at the exact hour row
          }}
        />
      ))}
    </>
  );
};

export default HoursColumn;
