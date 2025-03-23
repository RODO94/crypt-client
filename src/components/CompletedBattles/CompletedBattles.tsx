import { useState } from "react";
import { CompletedBattle } from "../../utils/Interfaces";
import DateTableHeader from "../DateTableHeader/DateTableHeader";
import "./CompletedBattles.scss";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewBattleCompleteTableRow from "../NewBattleTableCompleteRow copy/NewBattleCompleteTableRow";
import { useBattlesStore } from "../../store/battles";

export default function CompletedBattles() {
  const [hideSectionBool, setHideSectionBool] = useState<boolean>(false);

  const { completedBattles } = useBattlesStore();

  let currentDate = "";

  const handleClick = () => {
    hideSectionBool === false
      ? setHideSectionBool(true)
      : setHideSectionBool(false);
  };

  return (
    <section className="completedbattles">
      <div className="completedbattles__header-wrap">
        <Link to={"/battles/completed"} className="completedbattles__header">
          Completed Battles
        </Link>
        <div className="completedbattles__toggle" onClick={handleClick}>
          {hideSectionBool === false ? (
            <ExpandLessIcon
              style={{ color: "#fff", width: "100%", height: "auto" }}
            />
          ) : (
            <ExpandMoreIcon
              style={{ color: "#fff", width: "100%", height: "auto" }}
            />
          )}{" "}
        </div>
      </div>
      <article
        className={
          hideSectionBool === false ? "completedbattles-list" : "section--hide"
        }
      >
        {completedBattles.map((battle: CompletedBattle, index: number) => {
          if (index > 4) {
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
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  combatant_1_id={
                    battle.combatant_1_id ? battle.combatant_1_id : ""
                  }
                  combatant_2_id={
                    battle.combatant_2_id ? battle.combatant_2_id : ""
                  }
                  result={battle.result}
                  winner={battle.winner}
                  id={battle.id}
                />
              </article>
            );
          } else if (currentDate === battle.date) {
            return (
              <NewBattleCompleteTableRow
                key={crypto.randomUUID()}
                player_1={battle.player_1}
                player_2={battle.player_2}
                combatant_1_id={
                  battle.combatant_1_id ? battle.combatant_1_id : ""
                }
                combatant_2_id={
                  battle.combatant_2_id ? battle.combatant_2_id : ""
                }
                result={battle.result}
                winner={battle.winner}
                id={battle.id}
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
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  combatant_1_id={
                    battle.combatant_1_id ? battle.combatant_1_id : ""
                  }
                  combatant_2_id={
                    battle.combatant_2_id ? battle.combatant_2_id : ""
                  }
                  result={battle.result}
                  winner={battle.winner}
                  id={battle.id}
                />
              </article>
            );
          }
        })}
      </article>
    </section>
  );
}
