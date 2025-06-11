import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Armies, Army, UsersArmyInfo } from "../utils/Interfaces";
import {
  getAllArmies,
  getAllUserArmies,
  getArmyInfo,
} from "../utils/ArmyRequests";

export type UserArmies = Army & { count: number };

interface ArmiesState {
  armies: Armies[];
  userArmies: UserArmies[];
  selectedArmy: UsersArmyInfo | null;

  fetchAllArmies: () => Promise<void>;
  fetchUserArmies: (userId: string) => Promise<void>;
  fetchArmyDetails: (armyId: string) => Promise<UsersArmyInfo | false>;
  clearArmies: () => void;
}

export const useArmiesStore = create<ArmiesState>()(
  persist(
    (set) => ({
      armies: [],
      userArmies: [],
      selectedArmy: null,

      fetchAllArmies: async () => {
        try {
          const armies = await getAllArmies(2);
          if (armies) {
            set({ armies });
          }
        } catch (error) {
          console.error(error);
        }
      },

      fetchUserArmies: async (userId: string) => {
        try {
          const armies = await getAllUserArmies(userId);
          set({ userArmies: armies });
        } catch (error) {
          console.error(error);
        }
      },

      fetchArmyDetails: async (armyId: string) => {
        try {
          const armyDetails = await getArmyInfo(armyId, 3);
          if (armyDetails) {
            set({ selectedArmy: armyDetails });
          }
          return armyDetails;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      clearArmies: () => {
        set({ armies: [], userArmies: [], selectedArmy: null });
      },
    }),
    {
      name: "armies-storage",
      // Only persist the data, not the loading states
      partialize: (state) => ({
        armies: state.armies,
        userArmies: state.userArmies,
        selectedArmy: state.selectedArmy,
      }),
      storage: createJSONStorage(() => sessionStorage), // Correct way to use sessionStorage
    }
  )
);
