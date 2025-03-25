import { Rank } from "../../utils/Interfaces";
import RankTrackerCard from "../RankTrackerCard/RankTrackerCard";
import "./RankTracker.scss";

export default function RankTracker({ rankings }: { rankings: Rank[] }) {
  return (
    <section>
      {rankings.map((ranking: Rank) => (
        <RankTrackerCard ranking={ranking} />
      ))}
    </section>
  );
}
