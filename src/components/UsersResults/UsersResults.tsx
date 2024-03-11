import { useEffect, useState } from "react";
import { getUsersResults } from "../../utils/BattleRequests";
import { CompletedBattle } from "../../utils/Interfaces";
import BattleCompleteRow from "../BattleCompleteRow/BattleCompleteRow";
import DateTableHeader from "../DateTableHeader/DateTableHeader";
import "./UsersResults.scss";
import { Link } from "react-router-dom";

interface CompletedBattleArray extends Array<CompletedBattle> {}

export default function UsersResults() {
  const [battleArray, setBattleArray] = useState<CompletedBattleArray>();

  let currentDate = "";
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const battleFn = async (token: string) => {
        const data = await getUsersResults(token);
        setBattleArray(data);
        return data;
      };

      battleFn(token);
    }
  }, []);

  if (!battleArray) {
    return <p>Please wait while we load your content</p>;
  }

  return (
    <section className="completedbattles">
      <div className="completedbattles__header-wrap">
        <Link to={"/battles/completed"} className="completedbattles__header">
          Recent Results
        </Link>
      </div>
      <article className="completedbattles__battle-list">
        {battleArray.map((battle: CompletedBattle, index: number) => {
          if (index > 7) {
            return;
          }
          if (index === 0) {
            currentDate = battle.date;
            return (
              <article
                className="completedbattles__container"
                key={crypto.randomUUID()}
              >
                <DateTableHeader key={crypto.randomUUID()} date={battle.date} />
                <BattleCompleteRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  result={battle.result}
                  winner={battle.winner}
                  id={battle.id}
                  combatant_1_id={
                    battle.combatant_1_id ? battle.combatant_1_id : ""
                  }
                  combatant_2_id={
                    battle.combatant_2_id ? battle.combatant_2_id : ""
                  }
                />
              </article>
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
                combatant_1_id={
                  battle.combatant_1_id ? battle.combatant_1_id : ""
                }
                combatant_2_id={
                  battle.combatant_2_id ? battle.combatant_2_id : ""
                }
              />
            );
          } else if (currentDate !== battle.date) {
            currentDate = battle.date;
            return (
              <article
                className="completedbattles__container"
                key={crypto.randomUUID()}
              >
                <DateTableHeader key={crypto.randomUUID()} date={battle.date} />
                <BattleCompleteRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  result={battle.result}
                  winner={battle.winner}
                  id={battle.id}
                  combatant_1_id={
                    battle.combatant_1_id ? battle.combatant_1_id : ""
                  }
                  combatant_2_id={
                    battle.combatant_2_id ? battle.combatant_2_id : ""
                  }
                />
              </article>
            );
          }
        })}
      </article>
    </section>
  );
}
