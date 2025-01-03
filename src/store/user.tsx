import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "admin" | "user" | "guest";

interface UserStore {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  clearUserRole: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userRole: "guest",
      setUserRole: (role) => set({ userRole: role }),
      clearUserRole: () => set({ userRole: "guest" }),
    }),
    {
      name: "user-storage",
    }
  )
);
