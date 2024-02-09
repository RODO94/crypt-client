import { useNavigate } from "react-router-dom";
import { Player } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";
import BattleTypePill from "../BattleTypePill/BattleTypePill";
import PlayerTypePill from "../PlayerTypePill/PlayerTypePill";
import "./BattleCompleteRow.scss";

interface BattleTableRow {
  battle_type: string;
  player_type: string;
  winner: string;
  result: string;
  player_1: Array<Player>;
  player_2: Array<Player>;
  id: string;
}

export default function BattleCompleteRow({
  player_1,
  player_2,
  winner,
  battle_type,
  player_type,
  id,
}: BattleTableRow) {
  let resultStatementOne = "";
  let resultStatementTwo = "";

  const navigate = useNavigate();

  winner === "player one"
    ? (resultStatementOne = "Victory")
    : winner === "player two"
    ? (resultStatementOne = "Vanquished")
    : (resultStatementOne = "Draw");

  winner === "player two"
    ? (resultStatementTwo = "Victory")
    : winner === "player one"
    ? (resultStatementTwo = "Vanquished")
    : (resultStatementTwo = "Draw");

  const handleClick = () => {
    navigate(`/battles/${id}`);
  };

  return (
    <section className="completedbattle-row" onClick={handleClick}>
      <article className="completedbattle-row__combatants">
        <div
          className={
            winner === "player one"
              ? "completedbattle-row__team completedbattle-row__team--winner"
              : winner === "player two"
              ? "completedbattle-row__team completedbattle-row__team--vanquished"
              : "completedbattle-row__team completedbattle-row__team--draw"
          }
        >
          <span
            className={
              winner === "player one"
                ? "completedbattle-row__team completedbattle-row__team--winner"
                : winner === "player two"
                ? "completedbattle-row__team completedbattle-row__team--vanquished"
                : "completedbattle-row__team--draw"
            }
          >
            {resultStatementOne}
          </span>
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
        <p className="completedbattle-row__versus">VS</p>
        <div
          className={
            winner === "player two"
              ? "completedbattle-row__team completedbattle-row__team--winner"
              : winner === "player one"
              ? "completedbattle-row__team completedbattle-row__team--vanquished"
              : "completedbattle-row__team completedbattle-row__team--draw"
          }
        >
          <span
            className={
              winner === "player two"
                ? "completedbattle-row__team completedbattle-row__team--winner"
                : winner === "player one"
                ? "completedbattle-row__team completedbattle-row__team--vanquished"
                : "completedbattle-row__team completedbattle-row__team--draw"
            }
          >
            {resultStatementTwo}
          </span>
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
      <div className="completedbattle-row__details">
        <BattleTypePill key={crypto.randomUUID()} battle_type={battle_type} />
        <PlayerTypePill key={crypto.randomUUID()} player_type={player_type} />
      </div>
    </section>
  );
}
