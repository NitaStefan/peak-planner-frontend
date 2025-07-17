type Interval = { h1: string; h2: string; title: string };

const timeToMinutes = (isoTime: string, isEndTime = false) => {

  const date = new Date(isoTime);
  const hours = date.getUTCHours(); // or getHours() if you want local time
  const minutes = date.getUTCMinutes();

  return isEndTime && hours === 0 && minutes === 0
    ? 1440
    : hours * 60 + minutes;
};

// Check if two intervals overlap
const isOverlapping = (
  start1: number,
  end1: number,
  start2: number,
  end2: number,
) => {
  return start1 < end2 && end1 > start2;
};

export function findOverlappingIntervals(
  intervals: Interval[],
): { title1: string; title2: string } | null {
  for (let i = 0; i < intervals.length; i++) {
    const interval1 = intervals[i];
    const start1 = timeToMinutes(interval1.h1);
    const end1 = timeToMinutes(interval1.h2);

    for (let j = i + 1; j < intervals.length; j++) {
      const interval2 = intervals[j];
      const start2 = timeToMinutes(interval2.h1);
      const end2 = timeToMinutes(interval2.h2);

      if (isOverlapping(start1, end1, start2, end2)) {
        return { title1: interval1.title, title2: interval2.title };
      }
    }
  }

  return null; // No overlaps found
}

export function hasOverlappingIntervals(
  intervals: { h1: string; h2: string }[],
): boolean {

  for (let i = 0; i < intervals.length; i++) {
    const start1 = timeToMinutes(intervals[i].h1);
    const end1 = timeToMinutes(intervals[i].h2, true); // Treat h2 specially

    for (let j = i + 1; j < intervals.length; j++) {
      const start2 = timeToMinutes(intervals[j].h1);
      const end2 = timeToMinutes(intervals[j].h2, true); // Treat h2 specially

      if (isOverlapping(start1, end1, start2, end2)) {
        return true; // Overlap found
      }
    }
  }

  return false; // No overlaps found
}
