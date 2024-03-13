import { useEffect, useState } from "react";
import "./NextBattleCard.scss";
import { Battle, Player } from "../../utils/Interfaces";
import { getUsersBattles } from "../../utils/BattleRequests";
import BattleCard from "../BattleCard/BattleCard";
import dayjs from "dayjs";

interface BattleArray extends Array<Battle> {}
interface PlayerArray extends Array<Player> {}

export default function NextBattleCard() {
  const [nextBattle, setNextBattle] = useState<PlayerArray>();
  const [battleArray, setBattleArray] = useState<BattleArray>();

  const token = sessionStorage.getItem("token");

  let nextBattleComp = <p>No Upcoming Battles</p>;

  useEffect(() => {
    const battleFn = async () => {
      if (token) {
        const data = await getUsersBattles(token);
        const tempBattleArray = await data.battleArray[0];
        if (!tempBattleArray) {
          setBattleArray([]);
          return setNextBattle([]);
        }
        const playerOneBoolArray = tempBattleArray.player_1.map(
          (player: any) => {
            if (player.id === data.user.id) {
              return true;
            }
            return false;
          }
        );
        playerOneBoolArray.includes(true)
          ? setNextBattle(tempBattleArray.player_2)
          : setNextBattle(tempBattleArray.player_1);

        setBattleArray(data.battleArray);
        return data;
      }
    };

    battleFn();
  }, []);

  if (!nextBattle || !battleArray) {
    return <p>Please wait for your content to load</p>;
  }

  if (battleArray[0] && nextBattle[0]) {
    nextBattleComp = (
      <>
        <p className="next-battle-card__date">
          {dayjs(battleArray[0].date).format("DD/MM")}
        </p>
        <p className="next-battle-card__versus">Vs</p>
        <div className="next-battle-card__container--50">
          {nextBattle.map((player: Player) => (
            <BattleCard
              key={crypto.randomUUID()}
              name={player.name}
              known_as={player.known_as}
              ranking={player.ranking}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <article className="next-battle-card">
      <h3 className="next-battle-card__header">Next Battle</h3>
      <div className="next-battle-card__container">{nextBattleComp}</div>
    </article>
  );
}
