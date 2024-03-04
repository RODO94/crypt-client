import { useNavigate } from "react-router-dom";
import { Player } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";
import BattleTypePill from "../BattleTypePill/BattleTypePill";
import PlayerTypePill from "../PlayerTypePill/PlayerTypePill";
import "./BattleCompleteRow.scss";
import { useEffect, useState } from "react";

interface BattleTableRow {
  battle_type: string;
  player_type: string;
  winner: string;
  result: string;
  player_1: Array<Player>;
  player_2: Array<Player>;
  id: string;
  combatant_1_id: string;
}

export default function BattleCompleteRow({
  player_1,
  player_2,
  winner,
  battle_type,
  player_type,
  id,
  combatant_1_id,
}: BattleTableRow) {
  let resultStatementOne = "";
  let resultStatementTwo = "";

  const [winnerValue, setWinnerValue] = useState("");

  useEffect(() => {
    const fetchWinner = (winner: string) => {
      winner === combatant_1_id
        ? setWinnerValue("Player one")
        : setWinnerValue("Player two");
    };
    fetchWinner(winner);
  }, []);

  const navigate = useNavigate();

  console.log(winnerValue);

  winnerValue === "Player one"
    ? (resultStatementOne = "Victory")
    : winnerValue === "Player two"
    ? (resultStatementOne = "Vanquished")
    : (resultStatementOne = "Draw");

  winnerValue === "Player two"
    ? (resultStatementTwo = "Victory")
    : winnerValue === "Player one"
    ? (resultStatementTwo = "Vanquished")
    : (resultStatementTwo = "Draw");

  console.log({ resultOne: resultStatementOne, resultTwo: resultStatementTwo });

  const handleClick = () => {
    navigate(`/battles/information`, { state: { id: id } });
  };

  return (
    <section className="completedbattle-row" onClick={handleClick}>
      <article className="completedbattle-row__combatants">
        <div
          className={
            winnerValue === "Player one"
              ? "completedbattle-row__team completedbattle-row__team--winner"
              : winnerValue === "Player two"
              ? "completedbattle-row__team completedbattle-row__team--vanquished"
              : "completedbattle-row__team completedbattle-row__team--draw"
          }
        >
          <span
            className={
              winnerValue === "Player one"
                ? "completedbattle-row__team completedbattle-row__team--winner"
                : winnerValue === "Player two"
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
            winnerValue === "Player two"
              ? "completedbattle-row__team completedbattle-row__team--winner"
              : winnerValue === "Player one"
              ? "completedbattle-row__team completedbattle-row__team--vanquished"
              : "completedbattle-row__team completedbattle-row__team--draw"
          }
        >
          <span
            className={
              winnerValue === "Player two"
                ? "completedbattle-row__team completedbattle-row__team--winner"
                : winnerValue === "Player one"
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
