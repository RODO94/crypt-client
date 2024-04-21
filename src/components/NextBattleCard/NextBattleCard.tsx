import "./NextBattleCard.scss";
import { Battle, Player } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";
import dayjs from "dayjs";

interface nextBattleType {
  nextBattle: Battle | undefined;
  id: string | undefined;
}

export default function NextBattleCard({ nextBattle, id }: nextBattleType) {
  let nextBattleComp = <p>A Challenger is yet to appear.</p>;

  const startTime = dayjs(nextBattle?.start, "HH:mm:ss").format("HH:mm");

  if (nextBattle) {
    const opponentBool = nextBattle.player_1.find((player) => player.id === id);
    console.log(opponentBool);
    const battleOpponentArray = opponentBool
      ? nextBattle.player_2
      : nextBattle.player_1;
    nextBattleComp = (
      <>
        <div className="next-battle-card__timing">
          <p className="next-battle-card__date">
            {dayjs(nextBattle.date).format("DD/MM")}
          </p>
          <p className="next-battle-card__start">{startTime}</p>
        </div>
        <p className="next-battle-card__versus">vs</p>
        <div className="next-battle-card__container--50">
          {battleOpponentArray.map((player: Player) => (
            <BattleCard
              key={crypto.randomUUID()}
              name={player.name}
              known_as={player.known_as}
              ranking={player.ranking}
              emblem={player.emblem}
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
