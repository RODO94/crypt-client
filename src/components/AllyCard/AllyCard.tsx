import "./AllyCard.scss";

import BattleCard from "../BattleCard/BattleCard";
import { RankObj } from "../../utils/Interfaces";
interface AllyComp {
  ally: RankObj;
}
export default function AllyCard({ ally }: AllyComp) {
  let allyComp = <p>No Ally Available</p>;

  if (ally) {
    allyComp = (
      <BattleCard
        key={crypto.randomUUID()}
        name={ally.name}
        known_as={ally.known_as}
        ranking={ally.ranking}
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
