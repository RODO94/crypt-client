import "./BattleTypePill.scss";

interface BattleTypePill {
  battle_type: string;
}

export default function BattleTypePill({ battle_type }: BattleTypePill) {
  let pillType = "";
  let pillText = "";

  battle_type === "40k"
    ? (pillType = "battle-type battle-type--40k")
    : (pillType = "battle-type battle-type--fantasy");

  battle_type === "40k" ? (pillType = "40k") : (pillType = "Fantasy");

  return (
    <article className={pillType}>
      <p className="battle-type__text">{pillText}</p>
    </article>
  );
}
