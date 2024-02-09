import { useEffect, useState } from "react";
import { getCompletedBattlesFive } from "../../utils/BattleRequests";
import { Player } from "../../utils/Interfaces";
import BattleCompleteRow from "../BattleCompleteRow/BattleCompleteRow";
import DateTableHeader from "../DateTableHeader/DateTableHeader";
import "./CompletedBattles.scss";

interface CompletedBattle {
  id: string;
  date: string;
  winner: string;
  result: string;
  battle_type: "40k" | "fantasy";
  player_type: "single" | "multi";
  player_1: Player[];
  player_2: Player[];
}

interface CompletedBattleArray extends Array<CompletedBattle> {}

export default function CompletedBattles() {
  const [battleArray, setBattleArray] = useState<CompletedBattleArray>();

  let currentDate = "";

  useEffect(() => {
    const battleFn = async () => {
      const data = await getCompletedBattlesFive();
      setBattleArray(data);
      return data;
    };

    battleFn();
  }, []);

  if (!battleArray) {
    return <p>Please wait while we load your content</p>;
  }

  return (
    <section className="completedbattles">
      <div className="completedbattles__header-wrap">
        <h2 className="completedbattles__header">Completed Battles</h2>
      </div>
      <article className="completedbattles__battle-list">
        {battleArray.map((battle: CompletedBattle, index: number) => {
          if (index === 0) {
            currentDate = battle.date;
            return (
              <>
                <DateTableHeader key={index} date={battle.date} />
                <BattleCompleteRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  result={battle.result}
                  winner={battle.winner}
                  id={battle.id}
                />
              </>
            );
          } else if (currentDate === battle.date) {
            return (
              <BattleCompleteRow
                key={crypto.randomUUID()}
                battle_type={battle.battle_type}
                player_type={battle.player_type}
                player_1={battle.player_1}
                player_2={battle.player_2}
                result={battle.result}
                winner={battle.winner}
                id={battle.id}
              />
            );
          } else if (currentDate !== battle.date) {
            currentDate = battle.date;
            return (
              <>
                <DateTableHeader key={index} date={battle.date} />
                <BattleCompleteRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  result={battle.result}
                  winner={battle.winner}
                  id={battle.id}
                />
              </>
            );
          }
        })}
      </article>
    </section>
  );
}
