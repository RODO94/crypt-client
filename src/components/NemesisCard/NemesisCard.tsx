import "./NemesisCard.scss";
import { RankObj } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";

interface NemesisComp {
  nemesis: RankObj | undefined;
}

export default function NemesisCard({ nemesis }: NemesisComp) {
  let nemesisComp = <p>A Nemesis has not made themselves known...</p>;

  if (nemesis) {
    nemesisComp = (
      <BattleCard
        key={crypto.randomUUID()}
        name={nemesis.name}
        known_as={nemesis.known_as}
        ranking={nemesis.ranking}
        emblem={nemesis.emblem}
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
