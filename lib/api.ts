"use server";

import {
  AuthResponse,
  DayOfWeek,
  ErrorResponse,
  GoalWithCurrStep,
} from "./types";
import {
  TActivityRes,
  TFlexibleEventRequest,
  TFlexibleEventResponse,
  TGoalRequest,
  TGoalResponse,
  TPlannedEvent,
  TSignInSchema,
  TSignUpSchema,
  TStepRequest,
  TStepResponse,
  TWeekDayRes,
} from "./validations";
import { getAccessToken, storeTokens } from "./actions";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { convertTimeToISO, convertUTCToLocal } from "./format";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiCall<T, K = undefined>(
  endpoint: string,
  method: string,
  accessToken?: string,
  body?: K,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.headers.get("content-length") === "0" ||
    response.status === 204
    ? undefined
    : response.json();
}

export async function signUp(data: TSignUpSchema): Promise<void> {
  const response = await apiCall<AuthResponse, TSignUpSchema>(
    "/auth/register",
    "POST",
    undefined,
    data,
  );

  await storeTokens(response.accessToken, response.refreshToken);
}

export async function signIn(data: TSignInSchema): Promise<void> {
  const response = await apiCall<AuthResponse, TSignInSchema>(
    "/auth/login",
    "POST",
    undefined,
    data,
  );

  await storeTokens(response.accessToken, response.refreshToken);
}

// Planned Events
export async function getPlannedEvents() {
  const accessToken = await getAccessToken();

  const plannedEvents = await apiCall<(TPlannedEvent & { id: number })[]>(
    `/planned-events`,
    "GET",
    accessToken,
  );

  // convert the utc time to local time
  return plannedEvents.map((event) => ({
    ...event,
    eventDetails: event.eventDetails.map((detail) => ({
      ...detail,
      startTime: detail.startTime
        ? convertUTCToLocal(detail.startTime)
        : undefined,
    })),
  }));
}

export async function addPlannedEvent(plannedEvent: TPlannedEvent) {
  const accessToken = await getAccessToken();

  await apiCall<undefined, TPlannedEvent>(
    "/planned-events",
    "POST",
    accessToken,
    plannedEvent,
  );

  revalidatePath("/events");
}

export async function updatePlannedEvent(
  plannedEvent: TPlannedEvent & { id: number },
) {
  const accessToken = await getAccessToken();

  plannedEvent.eventDetails.forEach((detail) => {
    if (detail.startTime) detail.startTime = convertTimeToISO(detail.startTime);
  });

  await apiCall<undefined, TPlannedEvent & { id: number }>(
    `/planned-events`,
    "PUT",
    accessToken,
    plannedEvent,
  );

  revalidatePath("/events");
}

export async function deletePlannedEvent(id: number) {
  const accessToken = await getAccessToken();

  await apiCall<undefined>(`/planned-events/${id}`, "DELETE", accessToken);

  revalidatePath("/events");
}

export async function deleteEventDetails(eventDetailIds: number[]) {
  const accessToken = await getAccessToken();

  await apiCall<undefined, number[]>(
    `/planned-events/event-details`,
    "DELETE",
    accessToken,
    eventDetailIds,
  );
}

//Flexible Events
export async function getFlexibleEvents() {
  const accessToken = await getAccessToken();

  const response = await apiCall<TFlexibleEventResponse[]>(
    "/flexible-events",
    "GET",
    accessToken,
  );

  return response;
}

export async function addFlexibleEvent(flexibleEvent: TFlexibleEventRequest) {
  const accessToken = await getAccessToken();

  await apiCall<undefined, TFlexibleEventRequest>(
    "/flexible-events",
    "POST",
    accessToken,
    flexibleEvent,
  );

  revalidatePath("/events?type=flexible");
}

export async function updateFlexibleEvent(
  flexibleEvent: TFlexibleEventRequest,
) {
  const accessToken = await getAccessToken();

  await apiCall<undefined, TFlexibleEventRequest>(
    `/flexible-events`,
    "PUT",
    accessToken,
    flexibleEvent,
  );

  revalidatePath("/events?type=flexible");
}

export async function deleteFlexibleEvent(id: number) {
  const accessToken = await getAccessToken();

  await apiCall<undefined>(`/flexible-events/${id}`, "DELETE", accessToken);

  revalidatePath("/events?type=flexible");
}

//Goals
export const getGoals = cache(async () => {
  const accessToken = await getAccessToken();

  console.log("GET GOALS API");

  const response = await apiCall<TGoalResponse[]>(`/goals`, "GET", accessToken);

  return response;
});

export async function getGoalSteps(id: number) {
  const accessToken = await getAccessToken();

  const response = await apiCall<TStepResponse[]>(
    `/goals/${id}/steps`,
    "GET",
    accessToken,
  );

  return response;
}

export const addGoal = async (goal: TGoalRequest) => {
  const accessToken = await getAccessToken();

  await apiCall<undefined, TGoalRequest>(`/goals`, "POST", accessToken, goal);

  revalidatePath("/goals");
};

export const updateGoal = async (goal: TGoalRequest & { id: number }) => {
  const accessToken = await getAccessToken();

  await apiCall<undefined, TGoalRequest>(`/goals`, "PUT", accessToken, goal);

  revalidatePath("/goals");
};

export const deleteGoal = async (id: number) => {
  const accessToken = await getAccessToken();

  await apiCall<undefined>(`/goals/${id}`, "DELETE", accessToken);
};

//TODO: cache fetched goals and revalidate only the changed goal's steps
export const addStepToGoal = async (goalId: number, step: TStepRequest) => {
  const accessToken = await getAccessToken();

  await apiCall<undefined, TStepRequest>(
    `/goals/${goalId}/steps`,
    "POST",
    accessToken,
    step,
  );

  revalidatePath("/goals");
};

export const updateStep = async (step: TStepRequest & { id: number }) => {
  const accessToken = await getAccessToken();

  await apiCall<undefined, TStepRequest>(
    `/goals/steps`,
    "PUT",
    accessToken,
    step,
  );

  revalidatePath("/goals");
};

export const deleteStep = async (id: number) => {
  const accessToken = await getAccessToken();

  await apiCall<undefined>(`/goals/steps/${id}`, "DELETE", accessToken);

  revalidatePath("/goals");
};

//Schedule
export async function getSchedule() {
  const accessToken = await getAccessToken();

  const response = await apiCall<TWeekDayRes[]>(
    `/days-of-week`,
    "GET",
    accessToken,
  );

  return response;
}

export async function getDayOfWeekActivities(day: DayOfWeek) {
  const accessToken = await getAccessToken();

  const activities = await apiCall<TActivityRes[]>(
    `/days-of-week/${day}`,
    "GET",
    accessToken,
  );

  return activities.map((activity) => ({
    ...activity,
    startTime: convertUTCToLocal(activity.startTime),
    endTime: convertUTCToLocal(activity.endTime),
  }));
}

export async function getGoalsWithCurrentStep() {
  const accessToken = await getAccessToken();

  const response = await apiCall<GoalWithCurrStep[]>(
    `/goals/with-current-step`,
    "GET",
    accessToken,
  );

  return response;
}
