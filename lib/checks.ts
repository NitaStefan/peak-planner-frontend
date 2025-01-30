type Interval = { h1: string; h2: string; title: string };

export function findOverlappingIntervals(intervals: Interval[]): {
  title1: string;
  title2: string;
} | null {
  // Convert "HH:mm" to total minutes since midnight
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  for (let i = 0; i < intervals.length; i++) {
    const interval1 = intervals[i];
    const start1 = timeToMinutes(interval1.h1);
    let end1 = timeToMinutes(interval1.h2);

    // Handle overnight interval (e.g., 22:30 - 01:00)
    const crossesMidnight1 = start1 > end1;
    if (crossesMidnight1) end1 += 24 * 60; // Treat as next day's time

    for (let j = i + 1; j < intervals.length; j++) {
      const interval2 = intervals[j];
      const start2 = timeToMinutes(interval2.h1);
      let end2 = timeToMinutes(interval2.h2);

      // Handle overnight interval for interval2
      const crossesMidnight2 = start2 > end2;
      if (crossesMidnight2) end2 += 24 * 60;

      // Check for overlap
      const isOverlapping =
        (start1 >= start2 && start1 < end2) || // Start of interval1 is inside interval2
        (end1 > start2 && end1 <= end2) || // End of interval1 is inside interval2
        (start1 <= start2 && end1 >= end2); // interval1 fully contains interval2

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
