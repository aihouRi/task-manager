import { http } from "./http";

type LoginResponse = {
  token: string;
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
