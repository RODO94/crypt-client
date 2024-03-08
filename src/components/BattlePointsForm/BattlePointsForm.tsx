import { useEffect, useState } from "react";
import { Player } from "../../utils/Interfaces";
import "./BattlePointsForm.scss";
import BattleCard from "../BattleCard/BattleCard";
import save from "../../assets/save.svg";
import {
  reSubmitBattle,
  submitBattle,
  updateBattleDetail,
} from "../../utils/BattleRequests";
import { getUser } from "../../utils/UserRequests";
import { useNavigate } from "react-router";

interface BattlePoints {
  playerOne: Player[];
  playerTwo: Player[];
  playerOnePoints: number | string;
  playerTwoPoints: number | string;
  battleID: string;
  token: string | "";
  result: string;
}

export default function BattlePointsForm({
  playerOne,
  playerTwo,
  playerOnePoints,
  playerTwoPoints,
  result,
  battleID,
  token,
}: BattlePoints) {
  const [playerOneVictoryPoints, setPlayerOneVictoryPoints] =
    useState(playerOnePoints);
  const [playerTwoVictoryPoints, setPlayerTwoVictoryPoints] =
    useState(playerTwoPoints);
  const [editPlayerOneBool, setEditPlayerOneBool] = useState(false);
  const [editPlayerTwoBool, setEditPlayerTwoBool] = useState(false);
  const [userEditBool, setUserEditBool] = useState(false);
  const [battleOverBool, setBattleOverBool] = useState(false);
  const [adminBool, setAdminBool] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserRole = async (token: string) => {
      const response = await getUser(token);
      if (!response) {
        return navigate("/");
      }

      if (response.role === "admin") {
        setAdminBool(true);
      }
    };
    if (token) {
      setUserEditBool(true);
      getUserRole(token);
    }
    if (result === "victory" || result === "draw") {
      setUserEditBool(false);
      setBattleOverBool(true);
    }
  }, []);

  const handleSubmit = async () => {
    await submitBattle(battleID, token);
    window.location.reload();
  };

  const handleReSubmit = async () => {
    await reSubmitBattle(battleID, token);
    window.location.reload();
  };

  const handlePointChange = async (player: number) => {
    if (player === 1) {
      const requestBody = { points: Number(playerOneVictoryPoints) };
      const response = await updateBattleDetail(
        battleID,
        token,
        "points_1",
        requestBody
      );
      return response;
    } else if (player === 2) {
      const requestBody = { points: Number(playerTwoVictoryPoints) };
      const response = await updateBattleDetail(
        battleID,
        token,
        "points_2",
        requestBody
      );
      return response;
    }
  };

  if (!playerOne || !playerTwo) {
    return <h1>Loading Content, please wait</h1>;
  }

  return (
    <section className="battle-points">
      <div className="battle-points__header-wrap">
        <h2 className="battle-points__header">Combatant Points</h2>
      </div>
      <article className="battle-points__player-wrap">
        <div className="battle-points__players">
          {playerOne.map((player) => (
            <BattleCard
              key={crypto.randomUUID()}
              name={player.name}
              known_as={player.known_as}
              rank={player.rank}
              army_id={player.army_id}
            />
          ))}
        </div>
        <input
          type="number"
          name="playerOnePoints"
          id="playerOnePoints"
          className="battle-points__point-input"
          step={"any"}
          value={playerOneVictoryPoints}
          readOnly={
            editPlayerOneBool && (userEditBool || adminBool) === true
              ? false
              : true
          }
          onClick={() => {
            setEditPlayerOneBool(true);
          }}
          onChange={(event) => {
            let newScore = event.target.value;

            Number(event.target.value) <= 0 ? (newScore = "") : newScore;

            setPlayerOneVictoryPoints(newScore);
          }}
        />
        <button
          className={
            (userEditBool || adminBool) && editPlayerOneBool === true
              ? "battle-dash__submit-button"
              : "battle-dash__submit-button battle-dash__submit-button--hide"
          }
        >
          <img
            className="battle-dash__toggle-icon"
            src={save}
            alt="saving toggle"
            onClick={() => {
              setEditPlayerOneBool(false);
              handlePointChange(1);
            }}
          />
        </button>
      </article>
      <article className="battle-points__player-wrap">
        <div className="battle-points__players">
          {playerTwo.map((player) => (
            <BattleCard
              key={crypto.randomUUID()}
              name={player.name}
              known_as={player.known_as}
              rank={player.rank}
              army_id={player.army_id}
            />
          ))}
        </div>
        <input
          type="number"
          name="playerTwoPoints"
          id="playerTwoPoints"
          className="battle-points__point-input"
          value={playerTwoVictoryPoints}
          readOnly={
            editPlayerTwoBool && (userEditBool || adminBool) === true
              ? false
              : true
          }
          onClick={() => {
            setEditPlayerTwoBool(true);
          }}
          onChange={(event) => {
            let newScore = event.target.value;

            Number(event.target.value) <= 0 ? (newScore = "") : newScore;

            setPlayerTwoVictoryPoints(newScore);
          }}
        />
        <button
          className={
            (userEditBool || adminBool) && editPlayerTwoBool === true
              ? "battle-dash__submit-button"
              : "battle-dash__submit-button battle-dash__submit-button--hide"
          }
        >
          <img
            className="battle-dash__toggle-icon"
            src={save}
            alt="saving toggle"
            onClick={() => {
              setEditPlayerTwoBool(false);
              handlePointChange(2);
            }}
          />
        </button>
      </article>
      <button
        className={
          battleOverBool && adminBool === true
            ? "battle-points__submit-button"
            : "battle-points__submit-button--hide"
        }
        type="submit"
        onClick={handleReSubmit}
      >
        Re-Submit
      </button>

      <button
        className={
          battleOverBool === false
            ? "battle-points__submit-button"
            : "battle-points__submit-button--hide"
        }
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </section>
  );
}