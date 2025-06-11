import "./PlayerTypePill.scss";

interface PlayerTypePill {
  player_type: string;
}

export default function PlayerTypePill({ player_type }: PlayerTypePill) {
  let pillType = "";
  let pillText = "";

  if (player_type === "single") {
    pillType = "player-type player-type--single";
    pillText = "Single Player";
  } else if (player_type === "multi") {
    pillType = "player-type player-type--multi";
    pillText = "Multiplayer";
  }

  return (
    <article className={pillType}>
      <p className='player-type__text'>{pillText}</p>
    </article>
  );
}
