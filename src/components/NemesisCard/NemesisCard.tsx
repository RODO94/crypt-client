import "./NemesisCard.scss";
import { RankObj } from "../../utils/Interfaces";
import NewBattleCard from "../NewBattleCard/NewBattleCard";

interface NemesisComp {
  nemesis: RankObj | undefined;
}

export default function NemesisCard({ nemesis }: NemesisComp) {
  let nemesisComp = <p>A Nemesis has not made themselves known...</p>;

  if (nemesis) {
    nemesisComp = (
      <NewBattleCard
        key={crypto.randomUUID()}
        player={nemesis}
        player_number="one"
      />
    );
  }
  return (
    <article className="nemesis__army">
      <h3 className="nemesis__header">Nemesis</h3>
      <div className="nemesis__wrapper">{nemesisComp}</div>
    </article>
  );
}
