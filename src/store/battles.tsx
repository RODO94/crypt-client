import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Battle, CompletedBattle } from "../utils/Interfaces";
import {
  getUpcomingBattles,
  getCompletedBattles,
  getUsersBattles,
} from "../utils/BattleRequests";

interface BattlesState {
  upcomingBattles: Battle[];
  completedBattles: CompletedBattle[];
  userBattles: { battleArray: Battle[]; userResults: CompletedBattle[] } | null;

  fetchUpcomingBattles: () => Promise<void>;
  fetchCompletedBattles: () => Promise<void>;
  fetchUserBattles: (token: string) => Promise<void>;
  clearBattles: () => void;
}

export const useBattlesStore = create<BattlesState>()(
  persist(
    (set) => ({
      upcomingBattles: [],
      completedBattles: [],
      userBattles: null,
      selectedBattle: null,

      fetchUpcomingBattles: async () => {
        try {
          const battles = await getUpcomingBattles(3);
          set({ upcomingBattles: battles });
        } catch (error) {
          console.error(error);
        }
      },

      fetchCompletedBattles: async () => {
        try {
          const battles = await getCompletedBattles();
          set({ completedBattles: battles });
        } catch (error) {
          console.error(error);
        }
      },

      fetchUserBattles: async (token: string) => {
        try {
          const battles = await getUsersBattles(token, 5);
          set({ userBattles: battles });
        } catch (error) {
          console.error(error);
        }
      },

      clearBattles: () => {
        set({
          upcomingBattles: [],
          completedBattles: [],
          userBattles: { battleArray: [], userResults: [] },
        });
      },
    }),
    {
      name: "battles-storage",
      partialize: (state) => ({
        upcomingBattles: state.upcomingBattles,
        completedBattles: state.completedBattles,
        userBattles: state.userBattles,
      }),
      storage: createJSONStorage(() => sessionStorage), // Correct way to use sessionStorage
    }
  )
);
