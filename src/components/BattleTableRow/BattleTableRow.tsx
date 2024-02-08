import { Player } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";
import BattleTypePill from "../BattleTypePill/BattleTypePill";
import PlayerTypePill from "../PlayerTypePill/PlayerTypePill";
import "./BattleTableRow.scss";

interface BattleTableRow {
  battle_type: string;
  player_type: string;
  player_1: Array<Player>;
  player_2: Array<Player>;
}

export default function BattleTableRow({
  battle_type,
  player_type,
  player_1,
  player_2,
}: BattleTableRow) {
  return (
    <section className="battle-row">
      <article className="battle-row__combatants">
        <div className="battle-row__team-1">
          {player_1.map((player) => {
            return (
              <BattleCard
                key={crypto.randomUUID()}
                name={player.name}
                known_as={player.known_as}
                rank={player.rank}
              />
            );
          })}
        </div>
        <p className="battle-row__versus">VS</p>
        <div className="battle-row__team-2">
          {player_2.map((player) => {
            return (
              <BattleCard
                key={crypto.randomUUID()}
                name={player.name}
                known_as={player.known_as}
                rank={player.rank}
              />
            );
          })}
        </div>
      </article>
      <div className="battle-row__details">
        <BattleTypePill key={crypto.randomUUID()} battle_type={battle_type} />
        <PlayerTypePill key={crypto.randomUUID()} player_type={player_type} />
      </div>
    </section>
  );
}
