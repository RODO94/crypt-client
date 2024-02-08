import { useEffect, useState } from "react";
import { getCompletedBattlesFive } from "../../utils/BattleRequests";
import "./UpcomingBattles.scss";
import DateTableHeader from "../DateTableHeader/DateTableHeader";
import BattleTableRow from "../BattleTableRow/BattleTableRow";
import { Player } from "../../utils/Interfaces";

interface Battle {
  id: string;
  date: string;
  battle_type: "40k" | "fantasy";
  player_type: "single" | "multi";
  player_1: Player[];
  player_2: Player[];
}

interface BattleArray extends Array<Battle> {}

export default function UpcomingBattles() {
  const [battleArray, setBattleArray] = useState<BattleArray>();

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
    return <p>content loading... please wait</p>;
  }

  return (
    <section className="upcomingbattles">
      <div className="upcomingbattles__header-wrap">
        <h2 className="upcomingbattles__header">Upcoming Battles</h2>
      </div>
      <article className="upcomingbattles__battle-list">
        {battleArray.map((battle: Battle, index: number) => {
          if (index === 0) {
            currentDate = battle.date;
            return (
              <>
                <DateTableHeader date={battle.date} />
                <BattleTableRow
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                />
              </>
            );
          } else if (currentDate === battle.date) {
            return (
              <BattleTableRow
                battle_type={battle.battle_type}
                player_type={battle.player_type}
                player_1={battle.player_1}
                player_2={battle.player_2}
              />
            );
          } else if (currentDate !== battle.date) {
            return (
              <>
                <DateTableHeader date={battle.date} />
                <BattleTableRow
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                />
              </>
            );
          }
        })}
      </article>
    </section>
  );
}
