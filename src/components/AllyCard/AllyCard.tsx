import "./AllyCard.scss";
import { Rank } from "../../utils/Interfaces";
import NewBattleCard from "../NewBattleCard/NewBattleCard";
interface AllyComp {
  ally: Rank | undefined;
}
export default function AllyCard({ ally }: AllyComp) {
  let allyComp = <p>An Ally is of no use...</p>;

  if (ally) {
    allyComp = (
      <NewBattleCard
        key={crypto.randomUUID()}
        player={ally}
        player_number="one"
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
