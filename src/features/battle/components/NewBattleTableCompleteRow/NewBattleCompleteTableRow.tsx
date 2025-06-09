import NewBattleCard from "../NewBattleCard/NewBattleCard";
import "./NewBattleCompleteTableRow.scss";
import { useEffect, useState } from "react";
import crown from "../../assets/crown.svg";
import { Player } from "../../../../utils/Interfaces";
import { NavigationLink } from "../../../../shared";

interface BattleTableRow {
  battle_type?: string;
  player_type?: string;
  player_1: Array<Player>;
  player_2: Array<Player>;
  id: string;
  winner: string;
  result: string;
  combatant_1_id: string;
  combatant_2_id: string;
}

export default function NewBattleCompleteTableRow({
  player_1,
  player_2,
  id,
  combatant_1_id,
  combatant_2_id,
  winner,
}: BattleTableRow) {
  const [winnerValue, setWinnerValue] = useState("");

  useEffect(() => {
    const fetchWinner = (winner: string) => {
      winner === combatant_1_id
        ? setWinnerValue("Player 1")
        : winner === combatant_2_id
        ? setWinnerValue("Player 2")
        : setWinnerValue("Draw");
    };
    fetchWinner(winner);
  }, []);

  return (
    <NavigationLink to={`/battles/information/${id}`}>
      <article className='new-battle-table-row'>
        <div className='new-battle-table-row__combatant-result new-battle-table-row__combatant-result--one'>
          <div
            className={`new-battle-table-row__combatant-container  ${
              winnerValue === "Player 2" || winnerValue === "Draw"
                ? "loser"
                : "winner"
            }`}
          >
            {player_1.map((player) => (
              <NewBattleCard
                key={player.id}
                player={player}
                player_number={"one"}
              />
            ))}
          </div>
          {winnerValue === "Player 2" || winnerValue === "Draw" ? (
            ""
          ) : (
            <div className='new-battle-table-row__icon-wrap new-battle-table-row__icon-wrap--1'>
              <img
                src={crown}
                alt='crown depicting the winner of the battle'
                className='new-battle-table-row__icon'
              />
            </div>
          )}
        </div>
        <div className='new-battle-table-row__combatant-result'>
          {winnerValue === "Player 1" || winnerValue === "Draw" ? (
            ""
          ) : (
            <div className='new-battle-table-row__icon-wrap'>
              <img
                src={crown}
                alt='crown depicting the winner of the battle'
                className='new-battle-table-row__icon'
              />
            </div>
          )}

          <div
            className={`new-battle-table-row__combatant-container ${
              winnerValue === "Player 1" || winnerValue === "Draw"
                ? "loser"
                : "winner"
            }`}
          >
            {player_2.map((player) => (
              <NewBattleCard
                key={player.id}
                player={player}
                player_number={"two"}
              />
            ))}
          </div>
        </div>
      </article>
    </NavigationLink>
  );
}
