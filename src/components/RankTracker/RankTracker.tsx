import { Rank } from "../../utils/Interfaces";
import RankTrackerCard from "../RankTrackerCard/RankTrackerCard";
import "./RankTracker.scss";

export default function RankTracker({ rankings }: { rankings: Rank[] }) {
  return (
    <section className="rank-tracker__wrap">
      <div className="rank-tracker__container">
        <h3 className="rank-tracker__header">Rank History</h3>
        <div className="rank-tracker">
          {rankings
            .sort(sortRankings())
            .slice(0, 7)
            .map((ranking: Rank, index: number) => {
              const previousRanking = rankings[index + 1] || null;

              return (
                <RankTrackerCard
                  key={ranking.id}
                  ranking={ranking}
                  previousRanking={previousRanking}
                />
              );
            })}
        </div>
      </div>
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
