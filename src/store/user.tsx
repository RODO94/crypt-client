import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Rank, Users, Battle } from "../utils/Interfaces";
import {
  getUserInfo,
  verifyUser,
  getAllUsers,
  getUser,
} from "../utils/UserRequests";

export type UserRole = "admin" | "user" | "guest";

export type UserInfo = {
  user: Users;
  ally: Rank | undefined;
  nemesis: Rank | undefined;
  rankArray: {
    fortyK: Rank[];
    fantasy: Rank[];
  };
  userResults: Battle[];
} | null;

interface UserState {
  userRole: UserRole;
  currentUser: Users | null;
  userInfo: UserInfo;
  allUsers: Users[] | null;
  token: string | null;

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
      allUsers: null,
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
            sessionStorage.removeItem("token");
            throw new Error("Invalid token");
          }
        } catch (error) {
          set({
            userRole: "guest",
            currentUser: null,
            token: null,
          });
          sessionStorage.removeItem("token");
          console.error(error);
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
      }),
      storage: createJSONStorage(() => sessionStorage), // Correct way to use sessionStorage
    }
  )
);
