// src/store/user.tsx (enhanced)
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UsersObj, Rank } from "../utils/Interfaces";
import {
  getUserInfo,
  verifyUser,
  getAllUsers,
  getUser,
} from "../utils/UserRequests";

export type UserRole = "admin" | "user" | "guest";

interface UserState {
  userRole: UserRole;
  currentUser: UsersObj | null;
  userInfo: {
    ally: Rank | undefined;
    nemesis: Rank | undefined;
    rankArray: {
      fortyK: Rank[];
      fantasy: Rank[];
    };
  } | null;
  allUsers: UsersObj[];
  token: string | null;

  // Actions
  setUserRole: (role: UserRole) => void;
  setToken: (token: string | null) => void;
  fetchCurrentUser: (token: string) => Promise<void>;
  fetchUserInfo: (token: string) => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userRole: "guest",
      currentUser: null,
      userInfo: null,
      allUsers: [],
      token: sessionStorage.getItem("token"),

      setUserRole: (role) => set({ userRole: role }),

      setToken: (token) => {
        if (token) {
          sessionStorage.setItem("token", token);
        } else {
          sessionStorage.removeItem("token");
        }
        set({ token });
      },

      fetchCurrentUser: async (token) => {
        try {
          const isValid = await verifyUser(token, 2);
          if (isValid) {
            const user = await getUser(token);
            set({
              currentUser: user,
              userRole: user.role as UserRole,
            });
          } else {
            throw new Error("Invalid token");
          }
        } catch (error) {
          set({
            userRole: "guest",
            currentUser: null,
            token: null,
          });
          sessionStorage.removeItem("token");
        }
      },

      fetchUserInfo: async (token) => {
        try {
          const info = await getUserInfo(token, 5);
          set({ userInfo: info });
        } catch (error) {
          console.error(error);
        }
      },

      fetchAllUsers: async () => {
        try {
          const users = await getAllUsers(2);
          set({ allUsers: users });
        } catch (error) {
          console.error(error);
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        set({
          userRole: "guest",
          currentUser: null,
          userInfo: null,
          token: null,
        });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        userRole: state.userRole,
        currentUser: state.currentUser,
        userInfo: state.userInfo,
        token: state.token,
      }),
    }
  )
);
