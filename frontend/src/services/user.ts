const USER_KEY = "task_manager_user";

export type User = {
  email: string;
  name: string;
};

export const userStorage = {
  get: (): User | null => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem(USER_KEY);
  },
};
