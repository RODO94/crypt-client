// src/store/rankings.tsx
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Rank } from "../utils/Interfaces";
import {
  getRanking,
  getRankingsOneArmy,
  getRankingTopFive,
} from "../utils/RankingRequests";

interface RankingsState {
  fortyKRankings: Rank[] | null;
  fantasyRankings: Rank[] | null;
  topRankings: { fortyK: Rank[] | null; fantasy: Rank[] | null };
  selectedArmyRankings: Rank[] | null;

  // Actions
  fetchFortyKRankings: () => Promise<void>;
  fetchFantasyRankings: () => Promise<void>;
  fetchTopRankings: () => Promise<void>;
  fetchSingleRanking: (armyId: string) => Promise<void>;
  clearRankings: () => void;
}

export const useRankingsStore = create<RankingsState>()(
  persist(
    (set) => ({
      fortyKRankings: null,
      fantasyRankings: null,
      topRankings: { fortyK: null, fantasy: null },
      selectedArmyRankings: null,

      fetchFortyKRankings: async () => {
        try {
          const rankings = await getRanking("fortyk");
          const sortedRankings = rankings.sort(
            (a: Rank, b: Rank) => Number(b.ranking) - Number(a.ranking)
          );
          set({ fortyKRankings: sortedRankings });
        } catch (error) {
          console.error(error);
        }
      },

      fetchFantasyRankings: async () => {
        try {
          const rankings = await getRanking("fantasy");
          const sortedRankings = rankings.sort(
            (a: Rank, b: Rank) => Number(b.ranking) - Number(a.ranking)
          );
          set({ fantasyRankings: sortedRankings });
        } catch (error) {
          console.error(error);
        }
      },

      fetchTopRankings: async () => {
        try {
          const rankings = await getRankingTopFive();
          set({ topRankings: rankings });
        } catch (error) {
          console.error(error);
        }
      },

      fetchSingleRanking: async (armyId) => {
        try {
          const rankings = await getRankingsOneArmy(armyId);
          set({ selectedArmyRankings: rankings });
        } catch (error) {
          console.error(error);
          set({ selectedArmyRankings: null });
        }
      },

      clearRankings: () => {
        set({
          fortyKRankings: [],
          fantasyRankings: [],
          topRankings: { fortyK: [], fantasy: [] },
        });
      },
    }),
    {
      name: "rankings-storage",
      partialize: (state) => ({
        fortyKRankings: state.fortyKRankings,
        fantasyRankings: state.fantasyRankings,
        topRankings: state.topRankings,
      }),
    }
  )
);
