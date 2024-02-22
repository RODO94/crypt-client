import { Player } from "../../utils/Interfaces";
import "./BattleCard.scss";

export default function BattleCard({ name, known_as, rank, army_id }: Player) {
  let nameArray = name.toLowerCase().split(" ");
  let nameColour: string = " ";

  for (let i = 0; i < nameArray.length; i++) {
    nameArray[i] !== " "
      ? (nameColour = nameColour + nameArray[i])
      : nameColour;
  }

  return (
    <article className="battle-card" id={army_id}>
      <div className={`battle-card__army ${nameColour}`}>
        <p className={`battle-card__text ${nameColour}`}>{name}</p>
      </div>
      <div className="battle-card__player-info">
        <p className="battle-card__player-name">{known_as}</p>
        <p className="battle-card__player-rank">{rank}</p>
      </div>
    </article>
  );
}
