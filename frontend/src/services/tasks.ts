import type { Task } from "../types/task";
import { http } from "./http";

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await http.get<Task[]>("/tasks");
  return res.data;
};

export const createTask = async (
  title: string,
  description: string
): Promise<void> => {
  await http.post("/tasks", { title, description });
};

export const deleteTask = async (id: number): Promise<void> => {
  await http.delete(`/tasks/${id}`);
};

export type UpdateTaskInput = {
  title?: string;
  description?: string;
  status?: boolean;
};

export const updateTask = async (
  id: number,
  input: UpdateTaskInput
): Promise<void> => {
  await http.put(`/tasks/${id}`, input);
};
