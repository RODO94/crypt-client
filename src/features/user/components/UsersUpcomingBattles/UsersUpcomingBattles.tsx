import "./UsersUpcomingBattles.scss";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Battle } from "../../../../utils/Interfaces";
import { NewBattleTableRow } from "../../../battle";
import DateTableHeader from "../../../../shared/components/tables/DateTableHeader/DateTableHeader";

export default function UsersUpcomingBattles({
  battleArray,
}: {
  battleArray: Battle[] | undefined;
}) {
  let currentDate = "";
  if (!battleArray) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }
  return (
    <section className='upcomingbattles users-upcomingbattles'>
      <div className='upcomingbattles__header-wrap'>
        <Link to={"/battles/upcoming"} className='upcomingbattles__header'>
          Upcoming Battles
        </Link>
      </div>
      <article className='upcomingbattles__battle-list'>
        {battleArray.map((battle: Battle, index: number) => {
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
                  player_type={battle.player_type}
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
                player_type={battle.player_type}
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
                  player_type={battle.player_type}
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
