import { useEffect, useState } from "react";
import "./NextBattleCard.scss";
import { Battle, Player } from "../../utils/Interfaces";
import { getUsersBattles } from "../../utils/BattleRequests";
import { useNavigate } from "react-router-dom";
import BattleTableRow from "../BattleTableRow/BattleTableRow";
import BattleCard from "../BattleCard/BattleCard";
import ArmyPill from "../ArmyPill/ArmyPill";
import dayjs from "dayjs";

interface BattleArray extends Array<Battle> {}
interface PlayerArray extends Array<Player> {}

export default function NextBattleCard() {
  const [nextBattle, setNextBattle] = useState<PlayerArray>();
  const [battleArray, setBattleArray] = useState<BattleArray>();

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return <p>You need to log in before you can see your dashboard</p>;
  }

  useEffect(() => {
    const battleFn = async () => {
      const data = await getUsersBattles(token);
      const tempBattleArray = await data.battleArray[0];
      const playerOneBoolArray = tempBattleArray.player_1.map((player: any) => {
        if (player.id === data.user.id) {
          return true;
        }
        return false;
      });
      playerOneBoolArray.includes(true)
        ? setNextBattle(tempBattleArray.player_2)
        : setNextBattle(tempBattleArray.player_1);

      setBattleArray(data.battleArray);
      return data;
    };

    battleFn();
  }, []);

  if (!nextBattle || !battleArray) {
    return <p>Please wait for your content to load</p>;
  }

  console.log(nextBattle);
  return (
    <article className="next-battle-card">
      <h3 className="next-battle-card__header">Next Battle</h3>
      <div className="next-battle-card__container">
        <p className="next-battle-card__date">
          {dayjs(battleArray[0].date).format("DD/MM")}
        </p>
        <p className="next-battle-card__versus">Vs</p>
        {nextBattle.map((player: Player) => (
          <BattleCard
            name={player.name}
            known_as={player.known_as}
            rank={player.rank}
          />
        ))}
      </div>
    </article>
  );
}
