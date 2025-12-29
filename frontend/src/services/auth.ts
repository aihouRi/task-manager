import { http } from "./http";

type LoginResponse = {
  token: string;
  user: {
    email: string
    name: string
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  await http.post("/auth/register", {
    name,
    email,
    password,
  });
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await http.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return res.data;
};
