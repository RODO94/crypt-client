import { Player } from "../../utils/Interfaces";
import EmblemCard from "../EmblemCard/EmblemCard";
import "./NewBattleCard.scss";

export default function NewBattleCard({
  player,
  player_number,
}: {
  player: Player;
  player_number: String;
}) {
  !player.emblem ? (player.emblem = "necrons") : player.emblem;

  let nameArray: any[] = [];
  if (player.emblem) {
    nameArray = player.emblem.toLowerCase().split(" ");
  }
  let nameColour: string = "";

  for (let i = 0; i < nameArray.length; i++) {
    nameArray[i] !== " "
      ? (nameColour = nameColour + nameArray[i])
      : nameColour;
  }

  return (
    <div
      className={`new-battle-card__combatant new-battle-card__combatant--${player_number}`}
    >
      <div
        className={`new-battle-card__emblem-wrap new-battle-card__emblem-wrap--${player_number} ${nameColour} `}
      >
        <EmblemCard emblem={nameColour} />
      </div>
      <div
        className={`new-battle-card__player new-battle-card__player--${player_number}`}
      >
        <div
          className={`new-battle-card__player-details new-battle-card__player-details--${player_number}`}
        >
          <p className="new-battle-card__player-details-name">
            {player.known_as}
          </p>
          <p className="new-battle-card__player-details-rank">
            {player.ranking}
          </p>
        </div>
      </div>
    </div>
  );
}
