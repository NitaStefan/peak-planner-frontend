const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  GOALS: "/goals",
  GOAL: (id: number) => `/goals/${id}`,
  EVENTS: "/events",
  TIMELINE: "/timeline",
  MANAGE_SCHEDULE: "/update-schedule",
};

export default ROUTES;
