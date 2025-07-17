import { z } from "zod";
import { DayOfWeek } from "./types";
import { addMinutesToTime } from "./timeHelpers";

const latin1Regex = /^[\x20-\x7E\x0A\x0D]*$/;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .max(20, "Username must be less than 20 characters")
      .min(1, "Username is required")
      .regex(latin1Regex, "Only English characters are allowed"),
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(latin1Regex, "Only English characters are allowed"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(latin1Regex, "Only English characters are allowed"),
});

export type TSignInSchema = z.infer<typeof signUpSchema>;

//Planned Event
export const eventDetailsSchema = z.object({
  title: z
    .string()
    .max(45, "Title must be less than 45 characters")
    .min(1, "Title is required")
    .regex(latin1Regex, "Only English characters are allowed"),
  description: z
    .string()
    .max(400, "Description must be less than 400 characters")
    .regex(latin1Regex, "Only English characters are allowed")
    .optional(),
  startTime: z.string().optional(),
  duration: z.object({
    hours: z
      .number()
      .min(0, "Cannot have negative hours")
      .max(24, "Cannot have more than 24 hours"),
    minutes: z
      .number()
      .max(59, "Minutes must be less than 60")
      .min(0, "Cannot have negative minutes"),
  }),
});

export type TEventDetails = Omit<
  z.infer<typeof eventDetailsSchema>,
  "duration"
> & {
  id?: number;
  minutes?: number;
};

export const plannedEventSchema = z.object({
  scheduledDate: z.date(),
});

export type TPlannedEvent = z.infer<typeof plannedEventSchema> & {
  id?: number;
  eventDetails: TEventDetails[];
};

// Flexible Event
export const flexibleEventSchema = z.object({
  title: z
    .string()
    .max(45, "Title must be less than 45 characters")
    .min(1, "Title is required")
    .regex(latin1Regex, "Only English characters are allowed"),
  description: z
    .string()
    .max(400, "Description must be less than 400 characters")
    .regex(latin1Regex, "Only English characters are allowed")
    .optional(),
  startDate: z.date({
    required_error: "Date required",
  }),
  endDate: z.date({
    required_error: "Date required",
  }),
});

export type TFlexibleEventRequest = z.infer<typeof flexibleEventSchema> & {
  id?: number;
};

export type TFlexibleEventResponse = TFlexibleEventRequest & {
  id: number;
  isActive: boolean;
};

// Goal
export const goalSchema = z.object({
  title: z
    .string()
    .max(45, "Title must be less than 45 characters")
    .min(1, "Title is required")
    .regex(latin1Regex, "Only English characters are allowed"),
  startDate: z.date({
    required_error: "Date required",
  }),
});

export const stepSchema = z.object({
  title: z
    .string()
    .max(45, "Title must be less than 45 characters")
    .min(1, "Title is required")
    .regex(latin1Regex, "Only English characters are allowed"),
  description: z
    .string()
    .max(400, "Description must be less than 400 characters")
    .regex(latin1Regex, "Only English characters are allowed")
    .optional(),
  days: z
    .number()
    .min(1, "Days must be at least 1")
    .max(32000, "You cannot have that many days"),
  orderIndex: z.number().min(1, "Order number must be at least 1"),
  impact: z
    .number()
    .min(1, "Impact level number must be at least 1")
    .max(10, "Impact level must be at most 10"),
});

export type TStepRequest = z.infer<typeof stepSchema> & { id?: number };

export type TStepResponse = TStepRequest & {
  id: number;
  orderIndex: number;
  endDate: Date;
  isActive: boolean;
  progress: number;
};

export type TGoalRequest = z.infer<typeof goalSchema> & { id?: number };

export type TGoalResponse = z.infer<typeof goalSchema> & {
  id: number;
  numberOfSteps: number;
};

//Schedule
export const activitySchema = z
  .object({
    title: z
      .string()
      .max(45, "Title must be less than 45 characters")
      .regex(latin1Regex, "Only English characters are allowed")
      .optional(),
    description: z
      .string()
      .max(400, "Description must be less than 400 characters")
      .regex(latin1Regex, "Only English characters are allowed")
      .optional(),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Start time required"),
    duration: z
      .object({
        hours: z
          .number()
          .min(0, "Cannot have negative hours")
          .max(24, "Cannot have more than 24 hours"),
        minutes: z
          .number()
          .max(59, "Minutes must be less than 60")
          .min(0, "Cannot have negative minutes"),
      })
      .refine(
        (data) => {
          // If at least 1 hour is set, no need to validate minutes
          if (data.hours > 0) return true;
          // Otherwise, ensure at least 10 minutes
          return data.minutes >= 10;
        },
        {
          message: "Duration must be at least 10 minutes",
          path: ["minutes"], // Only show error on minutes
        },
      ),
    impact: z
      .number()
      .min(1, "Impact level number must be at least 1")
      .max(10, "Impact level must be at most 10")
      .optional(),
    goalId: z.string().optional(),
  })
  .refine(
    (data) =>
      data.goalId !== "0" || (data.title && data.title.trim().length > 0),
    {
      message: "Title is required ",
      path: ["title"],
    },
  )
  .refine(
  (data) => {
    if (!data.startTime || data.startTime.trim() === "") return true;

    const totalMinutes =
      (data.duration.hours || 0) * 60 + (data.duration.minutes || 0);

    const [hour, minute] = data.startTime.split(":").map(Number);
    const endTime = addMinutesToTime((new Date(2000, 0, 1, hour, minute, 0)).toISOString(), totalMinutes);
    const endTimeDate = new Date(endTime)

    if (endTimeDate.getHours() === 0 && endTimeDate.getMinutes() === 0) return true;

    const startTimeInMinutes = hour * 60 + minute;

    const endTimeInMinutes = endTimeDate.getHours() * 60 + endTimeDate.getMinutes();

    return endTimeInMinutes >= startTimeInMinutes;
  },
  {
    message: "Activity cannot cross over midnight",
    path: ["duration.hours"],
  }
);

export type TActivityRes = Omit<
  z.infer<typeof activitySchema>,
  "duration" | "title" | "description" | "impact" | "goalId"
> & {
  id: number;
  minutes: number;
  isActive: boolean;
  endTime: string;
  goalTitle?: string;
  goalId?: number;
  title: string;
  description?: string;
  impact: number;
};

export type TActivityReq = Omit<
  z.infer<typeof activitySchema>,
  "duration" | "goalId"
> & {
  id?: number;
  minutes: number;
  goalId?: number;
};

export type TWeekDayRes = {
  id: number;
  day: DayOfWeek;
  activities: TActivityRes[];
};

export type TWeekDayReq = {
  id: number;
  day: DayOfWeek;
  activities: TActivityReq[];
};
