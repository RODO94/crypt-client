import { CircularProgress } from "@mui/material";
import { CompletedBattle } from "../../utils/Interfaces";
import DateTableHeader from "../DateTableHeader/DateTableHeader";
import "./UsersResults.scss";
import { Link } from "react-router-dom";
import NewBattleCompleteTableRow from "../NewBattleTableCompleteRow copy/NewBattleCompleteTableRow";

export default function UsersResults({ battleArray }: any) {
  let currentDate = "";
  if (!battleArray) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }
  return (
    <section className="completedbattles">
      <div className="completedbattles__header-wrap">
        <Link to={"/battles/completed"} className="completedbattles__header">
          Recent Results
        </Link>
      </div>
      <article className="completedbattles-list">
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
                <NewBattleCompleteTableRow
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
              <NewBattleCompleteTableRow
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
                <NewBattleCompleteTableRow
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
