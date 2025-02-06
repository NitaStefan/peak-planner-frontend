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
