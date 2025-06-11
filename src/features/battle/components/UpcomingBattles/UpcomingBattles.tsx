import { useState } from "react";
import "./UpcomingBattles.scss";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CircularProgress } from "@mui/material";
import NewBattleTableRow from "../NewBattleTableRow/NewBattleTableRow";
import { Player } from "../../../../utils/Interfaces";
import { useBattlesStore } from "../../../../store/battles";
import DateTableHeader from "../../../../shared/components/tables/DateTableHeader/DateTableHeader";

interface Battle {
  id: string;
  date: string;
  battle_type: "40k" | "fantasy";
  player_type: "single" | "multi";
  player_1: Player[];
  player_2: Player[];
  table: string;
  start: string;
  finish: string;
}

export default function UpcomingBattles() {
  const [hideSectionBool, setHideSectionBool] = useState<boolean>(false);

  const { upcomingBattles } = useBattlesStore();

  let currentDate = "";

  const handleClick = () => {
    hideSectionBool === false
      ? setHideSectionBool(true)
      : setHideSectionBool(false);
  };

  if (!upcomingBattles) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  return (
    <section className='upcomingbattles'>
      <div className='upcomingbattles__header-wrap'>
        <Link to={"/battles/upcoming"} className='upcomingbattles__header'>
          Upcoming Battles
        </Link>
        <div className='upcomingbattles__toggle' onClick={handleClick}>
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
          hideSectionBool === false
            ? "upcomingbattles__battle-list"
            : "section--hide"
        }
      >
        {upcomingBattles.map((battle: Battle, index: number) => {
          if (index > 4) {
            return;
          }
          if (index === 0) {
            currentDate = battle.date;
            return (
              <article
                className='upcomingbattles__container'
                key={crypto.randomUUID()}
              >
                <DateTableHeader key={crypto.randomUUID()} date={battle.date} />
                <NewBattleTableRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  id={battle.id}
                  table={battle.table}
                  start={battle.start}
                  finish={battle.finish}
                />
              </article>
            );
          } else if (currentDate === battle.date) {
            return (
              <NewBattleTableRow
                key={crypto.randomUUID()}
                battle_type={battle.battle_type}
                player_1={battle.player_1}
                player_2={battle.player_2}
                id={battle.id}
                table={battle.table}
                start={battle.start}
                finish={battle.finish}
              />
            );
          } else if (currentDate !== battle.date) {
            currentDate = battle.date;
            return (
              <article
                className='upcomingbattles__container'
                key={crypto.randomUUID()}
              >
                <DateTableHeader key={crypto.randomUUID()} date={battle.date} />
                <NewBattleTableRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  id={battle.id}
                  table={battle.table}
                  start={battle.start}
                  finish={battle.finish}
                />
              </article>
            );
          }
        })}
      </article>
    </section>
  );
}
