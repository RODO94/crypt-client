import { useEffect, useState } from "react";
import { getCompletedBattlesFive } from "../../utils/BattleRequests";
import { CompletedBattle } from "../../utils/Interfaces";
import BattleCompleteRow from "../BattleCompleteRow/BattleCompleteRow";
import DateTableHeader from "../DateTableHeader/DateTableHeader";
import "./CompletedBattles.scss";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CompletedBattleArray extends Array<CompletedBattle> {}

export default function CompletedBattles() {
  const [battleArray, setBattleArray] = useState<CompletedBattleArray>();
  const [hideSectionBool, setHideSectionBool] = useState<boolean>(false);

  let currentDate = "";

  useEffect(() => {
    const battleFn = async () => {
      const data = await getCompletedBattlesFive();
      setBattleArray(data);
      return data;
    };

    battleFn();
  }, []);

  const handleClick = () => {
    hideSectionBool === false
      ? setHideSectionBool(true)
      : setHideSectionBool(false);
  };

  if (!battleArray) {
    return <p>Please wait while we load your content</p>;
  }

  return (
    <section className="completedbattles">
      <div className="completedbattles__header-wrap">
        <Link to={"/battles/completed"} className="completedbattles__header">
          Completed Battles
        </Link>
        <div className="completedbattles__toggle" onClick={handleClick}>
          {hideSectionBool === false ? (
            <ExpandLessIcon style={{ color: "#fff" }} />
          ) : (
            <ExpandMoreIcon style={{ color: "#fff" }} />
          )}{" "}
        </div>
      </div>
      <article
        className={
          hideSectionBool === false ? "completedbattles-list" : "section--hide"
        }
      >
        {battleArray.map((battle: CompletedBattle, index: number) => {
          if (index > 5) {
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
              <BattleCompleteRow
                key={crypto.randomUUID()}
                battle_type={battle.battle_type}
                player_type={battle.player_type}
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
                <BattleCompleteRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  result={battle.result}
                  combatant_1_id={
                    battle.combatant_1_id ? battle.combatant_1_id : ""
                  }
                  combatant_2_id={
                    battle.combatant_2_id ? battle.combatant_2_id : ""
                  }
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
