"use server";

import {
  AuthResponse,
  DayOfWeek,
  ErrorResponse,
  GoalWithCurrStep,
  ScheduleUpdateRequest,
} from "./types";
import {
  TActivityReq,
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
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.API_BASE_URL;

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
    let errorMessage = "An error occurred";
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      const errorData: ErrorResponse = await response.json();
      errorMessage = errorData?.message || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.headers.get("content-length") === "0" ||
    response.status === 204
    ? undefined
    : response.json();
}

export async function signUp(
  data: TSignUpSchema,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiCall<AuthResponse, TSignUpSchema>(
      "/auth/register",
      "POST",
      undefined,
      data,
    );

    await storeTokens(response.accessToken, response.refreshToken);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function signIn(
  data: TSignInSchema,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiCall<AuthResponse, TSignInSchema>(
      "/auth/login",
      "POST",
      undefined,
      data,
    );

    await storeTokens(response.accessToken, response.refreshToken);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// Planned Events
export async function getUpcomingPlannedEvents() {
  const accessToken = await getAccessToken();

  const plannedEvents = await apiCall<(TPlannedEvent & { id: number })[]>(
    `/planned-events/upcoming`,
    "GET",
    accessToken,
  );

  // convert the utc time to local time
  return plannedEvents.map((event) => ({
    ...event,
    eventDetails: event.eventDetails
      .map((detail) => ({
        ...detail,
        startTime: detail.startTime
          ? convertUTCToLocal(detail.startTime)
          : undefined,
      }))
      .sort((a, b) => {
        if (!a.startTime) return 1; // Move events without startTime to the end
        if (!b.startTime) return -1;
        return a.startTime.localeCompare(b.startTime);
      }),
  }));
}

// Planned Events
export async function getPastPlannedEvents() {
  const accessToken = await getAccessToken();

  const plannedEvents = await apiCall<(TPlannedEvent & { id: number })[]>(
    `/planned-events/past`,
    "GET",
    accessToken,
  );

  // convert the utc time to local time
  return plannedEvents.map((event) => ({
    ...event,
    eventDetails: event.eventDetails
      .map((detail) => ({
        ...detail,
        startTime: detail.startTime
          ? convertUTCToLocal(detail.startTime)
          : undefined,
      }))
      .sort((a, b) => {
        if (!a.startTime) return 1;
        if (!b.startTime) return -1;
        return a.startTime.localeCompare(b.startTime);
      }),
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
export async function getUpcomingFlexibleEvents() {
  const accessToken = await getAccessToken();

  const response = await apiCall<TFlexibleEventResponse[]>(
    "/flexible-events/upcoming",
    "GET",
    accessToken,
  );

  return response;
}

export async function getPastFlexibleEvents() {
  const accessToken = await getAccessToken();

  const response = await apiCall<TFlexibleEventResponse[]>(
    "/flexible-events/past",
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

  const response = await apiCall<TGoalResponse, TGoalRequest>(
    `/goals`,
    "POST",
    accessToken,
    goal,
  );

  return response;
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

  return response.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      startTime: convertUTCToLocal(activity.startTime),
      endTime: convertUTCToLocal(activity.endTime),
    })),
  }));
}

export async function getDayOfWeekActivities(day: DayOfWeek) {
  const accessToken = await getAccessToken();

  const activities = await apiCall<TActivityRes[]>(
    `/days-of-week/${day}`,
    "GET",
    accessToken,
  );

  return activities
    .map((activity) => ({
      ...activity,
      startTime: convertUTCToLocal(activity.startTime),
      endTime: convertUTCToLocal(activity.endTime),
    }))
    .sort((a, b) => a.startTime.localeCompare(b.startTime)); // Sort by startTime
}

export async function updateSchedule(
  scheduleUpdateRequest: ScheduleUpdateRequest,
) {
  const accessToken = await getAccessToken();

  // Remove arbitrary ids of the activities
  scheduleUpdateRequest.activitiesToAdd = Object.fromEntries(
    Object.entries(scheduleUpdateRequest.activitiesToAdd).map(
      ([key, value]) => [
        key as DayOfWeek,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        value.map(({ id, startTime, ...rest }) => ({
          ...rest,
          startTime: convertTimeToISO(startTime), // Convert time before sending
        })),
      ],
    ),
  ) as Record<DayOfWeek, TActivityReq[]>; // Cast the final object

  await apiCall<undefined, ScheduleUpdateRequest>(
    `/days-of-week`,
    "PUT",
    accessToken,
    scheduleUpdateRequest,
  );

  redirect("/");
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
