import { Player } from "../../utils/Interfaces";
import "./BattlePointsForm.scss";

interface BattlePoints {
  playerOne: Player[];
  playerTwo: Player[];
  playerOnePoints: number;
  playerTwoPoints: number;
}

export default function BattlePointsForm({
  playerOne,
  playerTwo,
  playerOnePoints,
  playerTwoPoints,
}: BattlePoints) {
  return <section className="battle-points"></section>;
}
