import { useNavigate } from "react-router-dom";
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
  id: string;
  table: string;
  start: string;
  finish: string;
}

export default function BattleTableRow({
  battle_type,
  player_type,
  player_1,
  player_2,
  id,
  table,
  start,
  finish,
}: BattleTableRow) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/battles/information`, { state: { id: id } });
  };

  return (
    <section className="battle-row" onClick={handleClick}>
      <div className="battle-row__timing">
        <span className="battle-row__table">{table}</span>
        <p className="battle-row__times">
          <span className="battle-row__start">{start}</span> -{" "}
          <span className="battle-row__finish">{finish}</span>
        </p>
      </div>
      <article className="battle-row__combatants">
        <div className="battle-row__team">
          {player_1.map((player) => {
            return (
              <BattleCard
                key={crypto.randomUUID()}
                name={player.name}
                known_as={player.known_as}
                ranking={player.ranking}
              />
            );
          })}
        </div>
        <p className="battle-row__versus">VS</p>
        <div className="battle-row__team">
          {player_2.map((player) => {
            return (
              <BattleCard
                key={crypto.randomUUID()}
                name={player.name}
                known_as={player.known_as}
                ranking={player.ranking}
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
