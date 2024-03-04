import { useEffect, useState } from "react";
import { getUsersBattles } from "../../utils/BattleRequests";
import "./UsersUpcomingBattles.scss";
import DateTableHeader from "../DateTableHeader/DateTableHeader";
import BattleTableRow from "../BattleTableRow/BattleTableRow";
import { Player } from "../../utils/Interfaces";
import { Link } from "react-router-dom";

interface Battle {
  id: string;
  date: string;
  battle_type: "40k" | "fantasy";
  player_type: "single" | "multi";
  player_1: Player[];
  player_2: Player[];
}

interface BattleArray extends Array<Battle> {}

export default function UsersUpcomingBattles() {
  const [battleArray, setBattleArray] = useState<BattleArray>();

  let currentDate = "";
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const battleFn = async (token: string) => {
        const data = await getUsersBattles(token);
        setBattleArray(data.battleArray);
        return data;
      };

      battleFn(token);
    }
  }, []);

  console.log(battleArray);

  if (!battleArray) {
    return <p>content loading... please wait</p>;
  }

  return (
    <section className="upcomingbattles users-upcomingbattles">
      <div className="upcomingbattles__header-wrap">
        <Link to={"/battles/upcoming"} className="upcomingbattles__header">
          Upcoming Battles
        </Link>
      </div>
      <article className="upcomingbattles__battle-list">
        {battleArray.map((battle: Battle, index: number) => {
          if (index === 0) {
            currentDate = battle.date;
            return (
              <article
                className="upcomingbattles__container"
                key={crypto.randomUUID()}
              >
                <DateTableHeader key={crypto.randomUUID()} date={battle.date} />
                <BattleTableRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  id={battle.id}
                />
              </article>
            );
          } else if (currentDate === battle.date) {
            return (
              <BattleTableRow
                key={crypto.randomUUID()}
                battle_type={battle.battle_type}
                player_type={battle.player_type}
                player_1={battle.player_1}
                player_2={battle.player_2}
                id={battle.id}
              />
            );
          } else if (currentDate !== battle.date) {
            currentDate = battle.date;
            return (
              <article
                className="upcomingbattles__container"
                key={crypto.randomUUID()}
              >
                <DateTableHeader key={crypto.randomUUID()} date={battle.date} />
                <BattleTableRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
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
