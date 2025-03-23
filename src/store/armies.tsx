import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Army } from "../utils/Interfaces";
import {
  getAllArmies,
  getAllUserArmies,
  getArmyInfo,
} from "../utils/ArmyRequests";

export type UserArmies = Army & { count: number };

interface ArmiesState {
  armies: Army[];
  userArmies: UserArmies[];
  selectedArmy: Army | null;

  fetchAllArmies: () => Promise<void>;
  fetchUserArmies: (userId: string) => Promise<void>;
  fetchArmyDetails: (armyId: string) => Promise<void>;
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
          console.log(armies);
          armies && set({ armies });
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
          armyDetails && set({ selectedArmy: armyDetails.user });
        } catch (error) {
          console.error(error);
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
    }
  )
);
