import "./PlayerTypePill.scss";

interface PlayerTypePill {
  player_type: string;
}

export default function PlayerTypePill({ player_type }: PlayerTypePill) {
  let pillType = "";
  let pillText = "";

  player_type === "single"
    ? (pillType = "player-type player-type--single")
    : (pillType = "player-type player-type--multi");

  player_type === "single"
    ? (pillText = "Single Player")
    : (pillText = "Multiplayer");

  return (
    <article className={pillType}>
      <p className="player-type__text">{pillText}</p>
    </article>
  );
}
