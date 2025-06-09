import BattleCard from "../BattleCard/BattleCard";
import BattleTypePill from "../BattleTypePill/BattleTypePill";
import "./BattleCompleteRow.scss";
import { useEffect, useState } from "react";
import crown from "../../assets/crown.svg";
import { Player } from "../../../../utils/Interfaces";
import { NavigationLink, PlayerTypePill } from "../../../../shared";

interface BattleTableRow {
  battle_type: string;
  player_type: string;
  winner: string;
  result: string;
  player_1: Array<Player>;
  player_2: Array<Player>;
  id: string;
  combatant_1_id: string;
  combatant_2_id: string;
}

export default function BattleCompleteRow({
  player_1,
  player_2,
  winner,
  battle_type,
  player_type,
  id,
  combatant_1_id,
  combatant_2_id,
}: BattleTableRow) {
  let resultStatementOne: any = <></>;
  let resultStatementTwo: any = <></>;

  const [winnerValue, setWinnerValue] = useState("");

  useEffect(() => {
    const fetchWinner = (winner: string) => {
      winner === combatant_1_id
        ? setWinnerValue("Player 1")
        : winner === combatant_2_id
        ? setWinnerValue("Player 2")
        : setWinnerValue("draw");
    };
    fetchWinner(winner);
  }, []);

  winnerValue === "Player 1"
    ? (resultStatementOne = (
        <div className='completedbattle-row__icon-wrap'>
          <img
            src={crown}
            alt='crown depicting the winner of the battle'
            className='completedbattle-row__icon'
          />
        </div>
      ))
    : winnerValue === "Player 2"
    ? (resultStatementOne = "")
    : (resultStatementOne = "Draw");

  winnerValue === "Player 2"
    ? (resultStatementTwo = (
        <div className='completedbattle-row__icon-wrap'>
          <img
            src={crown}
            alt='crown depicting the winner of the battle'
            className='completedbattle-row__icon'
          />
        </div>
      ))
    : winnerValue === "Player 1"
    ? (resultStatementTwo = "")
    : (resultStatementTwo = "Draw");

  return (
    <NavigationLink to={`/battles/information/${id}`}>
      <section className='completedbattle-row'>
        <article className='completedbattle-row__combatants'>
          <div
            className={
              winnerValue === "Player 1"
                ? "completedbattle-row__team completedbattle-row__team--winner"
                : winnerValue === "Player 2"
                ? "completedbattle-row__team completedbattle-row__team--vanquished"
                : "completedbattle-row__team completedbattle-row__team--draw"
            }
          >
            <span
              className={
                winnerValue === "Player 1"
                  ? "completedbattle-row__team completedbattle-row__team--winner"
                  : winnerValue === "Player 2"
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
                  ranking={player.ranking}
                  emblem={player.emblem}
                />
              );
            })}
          </div>
          <p className='completedbattle-row__versus'>VS</p>
          <div
            className={
              winnerValue === "Player 2"
                ? "completedbattle-row__team completedbattle-row__team--winner"
                : winnerValue === "Player 1"
                ? "completedbattle-row__team completedbattle-row__team--vanquished"
                : "completedbattle-row__team completedbattle-row__team--draw"
            }
          >
            <span
              className={
                winnerValue === "Player 2"
                  ? "completedbattle-row__team completedbattle-row__team--winner"
                  : winnerValue === "Player 1"
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
                  ranking={player.ranking}
                  emblem={player.emblem}
                />
              );
            })}
          </div>
        </article>
        <div className='completedbattle-row__details'>
          <BattleTypePill key={crypto.randomUUID()} battle_type={battle_type} />
          <PlayerTypePill key={crypto.randomUUID()} player_type={player_type} />
        </div>
      </section>
    </NavigationLink>
  );
}
