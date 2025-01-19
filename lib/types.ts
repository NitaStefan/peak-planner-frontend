export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ErrorResponse = {
  status: number;
  message: string;
};
