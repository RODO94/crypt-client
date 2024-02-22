import "./BattlePointsForm.scss";

interface BattlePoints {
  playerOne: string;
  playerTwo: string;
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
