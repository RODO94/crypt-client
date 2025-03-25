import { Rank } from "../../utils/Interfaces";
import RankTrackerCard from "../RankTrackerCard/RankTrackerCard";
import "./RankTracker.scss";

export default function RankTracker({ rankings }: { rankings: Rank[] }) {
  return (
    <section className="rank-tracker">
      {rankings.sort(sortRankings()).map((ranking: Rank, index: number) => {
        const previousRanking = rankings[index + 1] || null;

        return (
          <RankTrackerCard
            key={ranking.id}
            ranking={ranking}
            previousRanking={previousRanking}
          />
        );
      })}
    </section>
  );
}
function sortRankings(): ((a: Rank, b: Rank) => number) | undefined {
  return (a: Rank, b: Rank) => {
    if (a.rn && b.rn) {
      return a.rn - b.rn;
    } else {
      return 0;
    }
  };
}
