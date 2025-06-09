import { Player } from "../../utils/Interfaces";
import "./ArmyPill.scss";

export default function ArmyPill({ name, emblem }: Player) {
  let nameArray = emblem ? emblem.toLowerCase().split(" ") : "";
  let nameColour: string = " ";

  for (let i = 0; i < nameArray.length; i++) {
    nameArray[i] !== " "
      ? (nameColour = nameColour + nameArray[i])
      : nameColour;
    return (
      <div className={`battle-card__army ${nameColour}`}>
        <p className={`battle-card__txt ${nameColour}`}>{name}</p>
      </div>
    );
  }
}
