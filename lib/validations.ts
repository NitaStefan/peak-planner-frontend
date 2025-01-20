import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .max(20, "Username must be less than 20 characters")
    .min(1, "Username is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TSignInSchema = z.infer<typeof signUpSchema>;

//Planned Event
export const plannedEventSchema = z.object({
  scheduledDate: z.date(),
});

export type TPlannedEventSchema = z.infer<typeof plannedEventSchema>;

export type TPlannedEvent = z.infer<typeof plannedEventSchema> & {
  id?: number;
  eventDetails: TEventDetails[];
};

export const eventDetailsSchema = z.object({
  title: z
    .string()
    .max(45, "Title must be less than 45 characters")
    .min(1, "Title is required"),
  description: z
    .string()
    .max(400, "Description must be less than 400 characters")
    .min(1, "Description is required"),
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

export type TEventDetailsSchema = z.infer<typeof eventDetailsSchema>;

export type TEventDetails = Omit<TEventDetailsSchema, "duration"> & {
  id?: number;
  minutes?: number;
};

// Flexible Event
export const flexibleEventSchema = z.object({
  title: z
    .string()
    .max(45, "Title must be less than 45 characters")
    .min(1, "Title is required"),
  description: z
    .string()
    .max(400, "Description must be less than 400 characters")
    .min(1, "Description is required"),
  startDate: z.date({
    required_error: "Date required",
  }),
  endDate: z.date({
    required_error: "Date required",
  }),
});
export type TFlexibleEventSchema = z.infer<typeof flexibleEventSchema>;
