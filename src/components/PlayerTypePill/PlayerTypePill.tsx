import "./PlayerTypePill.scss";

interface PlayerTypePill {
  player_type: string;
}

export default function PlayerTypePill({ player_type }: PlayerTypePill) {
  let pillType = "";
  let pillText = "";

  player_type === "single"
    ? (pillType = "battle-type battle-type--single")
    : (pillType = "battle-type battle-type--multi");

  player_type === "single"
    ? (pillType = "Single Player")
    : (pillType = "Multiplayer");

  return (
    <article className={pillType}>
      <p className="battle-type__text">{pillText}</p>
    </article>
  );
}
