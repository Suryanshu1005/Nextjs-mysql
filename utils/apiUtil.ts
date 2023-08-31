import axios, { AxiosError } from "axios";

interface User {
  user: string,
  username: any,
  id: string,
}

export interface UserResponse {
  user: User | null;
  error: AxiosError | null;
}

export async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
