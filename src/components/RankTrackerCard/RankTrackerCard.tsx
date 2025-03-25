import { Rank } from "../../utils/Interfaces";
import "./RankTrackerCard.scss";

export default function RankTrackerCard({ ranking }: { ranking: Rank }) {
  return (
    <article className="rank-tracker__card">
      <p>{ranking.ranking}</p>
    </article>
  );
}
