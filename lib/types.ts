export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ErrorResponse = {
  status: number;
  message: string;
};

export type EventDetails = {
  id: number;
  title: string;
  description: string;
  startTime?: string;
  minutes?: number;
};

export type PlannedEvent = {
  id: number;
  scheduledDate: string;
  eventDetails: EventDetails[];
};
