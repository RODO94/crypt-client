import "./NemesisCard.scss";
import { RankObj } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";

interface NemesisComp {
  nemesis: RankObj;
}

export default function NemesisCard({ nemesis }: NemesisComp) {
  let nemesisComp = <p>No Nemesis Available</p>;

  if (nemesis) {
    nemesisComp = (
      <BattleCard
        key={crypto.randomUUID()}
        name={nemesis.name}
        known_as={nemesis.known_as}
        ranking={nemesis.ranking}
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
