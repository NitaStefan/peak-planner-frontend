type Interval = { h1: string; h2: string; title: string };

export function findOverlappingIntervals(intervals: Interval[]): {
  title1: string;
  title2: string;
} | null {
  for (let i = 0; i < intervals.length; i++) {
    const interval1 = intervals[i];

    for (let j = i + 1; j < intervals.length; j++) {
      const interval2 = intervals[j];

      const isOverlapping =
        (interval1.h1 >= interval2.h1 && interval1.h1 < interval2.h2) || // Start overlaps
        (interval1.h2 > interval2.h1 && interval1.h2 <= interval2.h2) || // End overlaps
        (interval1.h1 <= interval2.h1 && interval1.h2 >= interval2.h2); // Fully contains

      if (isOverlapping) {
        return {
          title1: interval1.title,
          title2: interval2.title,
        };
      }
    }
  }

  return null; // No overlaps found
}
