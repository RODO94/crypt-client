import { Player } from "../../utils/Interfaces";
import BattleTypePill from "../BattleTypePill/BattleTypePill";
import NewBattleCard from "../NewBattleCard/NewBattleCard";
import "./NewBattleTableRow.scss";
import dayjs from "dayjs";
import NavigationLink from "../NavigationLink/NavigationLink";

interface BattleTableRow {
  battle_type: "40k" | "fantasy";
  player_type?: string;
  player_1: Player[];
  player_2: Player[];
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
  return (
    <NavigationLink to={`/battles/information/${id}`}>
      <article className="new-battle-table-row">
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
          <span className="new-battle-table-row__details-table">{table}</span>
          <strong className="new-battle-table-row__details-time">
            {dayjs(start, "HH:mm:ss").format("HH:mm")}
          </strong>
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
    </NavigationLink>
  );
}
