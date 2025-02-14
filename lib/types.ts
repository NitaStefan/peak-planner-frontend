import { TActivityReq } from "./validations";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ErrorResponse = {
  status: number;
  message: string;
};

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type GoalWithCurrStep = {
  id: number;
  title: string;
  currStepTitle: string;
  currStepDescription?: string;
  currStepImpact?: number;
};

export type ScheduleUpdateRequest = {
  idsToDelete: number[];
  activitiesToAdd: Record<DayOfWeek, TActivityReq[]>;
};
