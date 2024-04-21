import "./AllyCard.scss";

import BattleCard from "../BattleCard/BattleCard";
import { RankObj } from "../../utils/Interfaces";
interface AllyComp {
  ally: RankObj | undefined;
}
export default function AllyCard({ ally }: AllyComp) {
  let allyComp = <p>An Ally is of no use...</p>;

  if (ally) {
    allyComp = (
      <BattleCard
        key={crypto.randomUUID()}
        name={ally.name}
        known_as={ally.known_as}
        ranking={ally.ranking}
        emblem={ally.emblem}
      />
    );
  }
  return (
    <article className="ally__army">
      <h3 className="ally__header">Ally</h3>
      <div className="ally__wrapper">{allyComp}</div>
    </article>
  );
}
