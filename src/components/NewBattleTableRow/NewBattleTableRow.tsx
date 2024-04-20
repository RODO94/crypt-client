import { useNavigate } from "react-router-dom";
import { Player } from "../../utils/Interfaces";
import BattleTypePill from "../BattleTypePill/BattleTypePill";
import NewBattleCard from "../NewBattleCard/NewBattleCard";
import "./NewBattleTableRow.scss";
import dayjs from "dayjs";

interface BattleTableRow {
  battle_type: string;
  player_type?: string;
  player_1: Array<Player>;
  player_2: Array<Player>;
  id: string;
  table: string;
  start: string;
  finish: string;
}

export default function NewBattleTableRow({
  battle_type,
  player_1,
  player_2,
  id,
  table,
  start,
}: BattleTableRow) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/battles/information`, { state: { id: id } });
  };
  return (
    <article className="new-battle-table-row" onClick={handleNavigation}>
      <div className="new-battle-table-row__combatant-wrap">
        {player_1.map((player: Player) => (
          <NewBattleCard
            key={player.id}
            player={player}
            player_number={"one"}
          />
        ))}
      </div>
      <div className="new-battle-table-row__details">
        <div className="new-battle-table-row__details-table">{table}</div>
        <div className="new-battle-table-row__details-time">
          {dayjs(start, "HH:mm:ss").format("HH:mm")}
        </div>
        <BattleTypePill battle_type={battle_type} />
      </div>
      <div className="new-battle-table-row__combatant-wrap">
        {player_2.map((player) => (
          <NewBattleCard
            key={player.id}
            player={player}
            player_number={"two"}
          />
        ))}
      </div>
    </article>
  );
}
