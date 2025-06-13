import "./NextBattleCard.scss";
import dayjs from "dayjs";
import NewBattleCard from "../NewBattleCard/NewBattleCard";
import { Battle, Player } from "../../../../utils/Interfaces";

interface nextBattleType {
  nextBattle: Battle | undefined;
  id: string | undefined;
}

export default function NextBattleCard({ nextBattle, id }: nextBattleType) {
  let nextBattleComp = <p>A Challenger is yet to appear.</p>;

  const startTime = dayjs(nextBattle?.start, "HH:mm:ss").format("HH:mm");

  if (nextBattle) {
    const opponentBool = nextBattle.user_1_id === id;
    const battleOpponentArray = opponentBool
      ? nextBattle.player_2
      : nextBattle.player_1;
    nextBattleComp = (
      <>
        <div className='next-battle-card__timing'>
          <p className='next-battle-card__date'>
            {dayjs(nextBattle.date).format("DD/MM")}
          </p>
          <p className='next-battle-card__start'>{startTime}</p>
        </div>
        <p className='next-battle-card__versus'>vs</p>
        <div className='next-battle-card__container--50'>
          {battleOpponentArray.map((player: Player) => (
            <NewBattleCard
              key={crypto.randomUUID()}
              player={player}
              player_number='two'
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <article className='next-battle-card' data-testid='next-battle-card'>
      <h3 className='next-battle-card__header'>Next Battle</h3>
      <div className='next-battle-card__container'>{nextBattleComp}</div>
    </article>
  );
}
