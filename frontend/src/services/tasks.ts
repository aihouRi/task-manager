import type { Task } from "../types/task";
import { http } from "./http";

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await http.get<Task[]>("/tasks");
  return res.data;
};

export const createTask = async (title: string): Promise<void> => {
  await http.post("/tasks", { title });
};

export const deleteTask = async (id: number): Promise<void> => {
  await http.delete(`/task/${id}`);
};
