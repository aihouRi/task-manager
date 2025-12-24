import type { Task } from "../types/task";
import { http } from "./http";

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await http.get<Task[]>("/tasks");
  return res.data;
};
