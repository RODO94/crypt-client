import { create } from "zustand";

export type UserRole = "admin" | "user" | "guest";

interface UserStore {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  clearUserRole: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userRole: "guest",
  setUserRole: (role) => set({ userRole: role }),
  clearUserRole: () => set({ userRole: "guest" }),
}));
