import { useEffect, useState } from "react";
import "./BattlePointsForm.scss";
import BattleCard from "../BattleCard/BattleCard";
import save from "../../../../assets/save.svg";
import { CircularProgress } from "@mui/material";
import { Player } from "../../../../utils/Interfaces";
import { useUserStore } from "../../../../store/user";
import { useBattlesStore } from "../../../../store/battles";
import {
  reSubmitBattle,
  submitBattle,
  updateBattleDetail,
} from "../../../../utils/BattleRequests";
interface BattlePoints {
  playerOne: Player[];
  playerTwo: Player[];
  playerOnePoints: number | string;
  playerTwoPoints: number | string;
  battleID: string;
  result: string;
}

export default function BattlePointsForm({
  playerOne,
  playerTwo,
  playerOnePoints,
  playerTwoPoints,
  result,
  battleID,
}: BattlePoints) {
  const [playerOneVictoryPoints, setPlayerOneVictoryPoints] =
    useState(playerOnePoints);
  const [playerTwoVictoryPoints, setPlayerTwoVictoryPoints] =
    useState(playerTwoPoints);
  const [editPlayerOneBool, setEditPlayerOneBool] = useState(false);
  const [editPlayerTwoBool, setEditPlayerTwoBool] = useState(false);
  const [userEditBool, setUserEditBool] = useState(false);
  const [battleOverBool, setBattleOverBool] = useState(false);
  const [submitBool, setSubmitBool] = useState(false);

  const { token, userRole } = useUserStore();
  const { fetchCompletedBattles } = useBattlesStore();

  useEffect(() => {
    if (token) {
      setUserEditBool(true);
    }
    if (result === "victory" || result === "draw") {
      setUserEditBool(false);
      setBattleOverBool(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (token) {
      const response = await submitBattle(battleID, token);
      if (response) {
        fetchCompletedBattles();
        window.location.reload();
      }
    }
  };

  const handleReSubmit = async () => {
    if (token) {
      const response = await reSubmitBattle(battleID, token);
      if (response) {
        window.location.reload();
      }
    }
  };

  const handlePointChange = async (player: number) => {
    if (player === 1 && token) {
      const requestBody = { points: Number(playerOneVictoryPoints) };
      const response = await updateBattleDetail(
        battleID,
        token,
        "points_1",
        requestBody
      );
      return response;
    } else if (player === 2 && token) {
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
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  const isAdmin = userRole === "admin";
  return (
    <section className='battle-points'>
      <div className='battle-points__header-wrap'>
        <h2 className='battle-points__header'>Combatant Points</h2>
      </div>
      <article className='battle-points__player-wrap'>
        <div className='battle-points__players'>
          {playerOne.map((player) => (
            <BattleCard
              key={crypto.randomUUID()}
              name={player.name}
              known_as={player.known_as}
              ranking={player.ranking}
              army_id={player.army_id}
              emblem={player.emblem}
            />
          ))}
        </div>
        <input
          type='number'
          name='playerOnePoints'
          id='playerOnePoints'
          className='battle-points__point-input'
          step={"any"}
          value={playerOneVictoryPoints}
          readOnly={
            editPlayerOneBool && (userEditBool || isAdmin) === true
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
            (userEditBool || isAdmin) && editPlayerOneBool === true
              ? "battle-dash__submit-button"
              : "battle-dash__submit-button battle-dash__submit-button--hide"
          }
        >
          <img
            className='battle-dash__toggle-icon'
            src={save}
            alt='saving toggle'
            onClick={() => {
              setEditPlayerOneBool(false);
              handlePointChange(1);
            }}
          />
        </button>
      </article>
      <article className='battle-points__player-wrap'>
        <div className='battle-points__players'>
          {playerTwo.map((player) => (
            <BattleCard
              key={crypto.randomUUID()}
              name={player.name}
              known_as={player.known_as}
              ranking={player.ranking}
              army_id={player.army_id}
              emblem={player.emblem}
            />
          ))}
        </div>
        <input
          type='number'
          name='playerTwoPoints'
          id='playerTwoPoints'
          className='battle-points__point-input'
          value={playerTwoVictoryPoints}
          readOnly={
            editPlayerTwoBool && (userEditBool || isAdmin) === true
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
            (userEditBool || isAdmin) && editPlayerTwoBool === true
              ? "battle-dash__submit-button"
              : "battle-dash__submit-button battle-dash__submit-button--hide"
          }
        >
          <img
            className='battle-dash__toggle-icon'
            src={save}
            alt='saving toggle'
            onClick={() => {
              setEditPlayerTwoBool(false);
              handlePointChange(2);
            }}
          />
        </button>
      </article>
      <button
        className={
          battleOverBool && isAdmin === true
            ? "battle-points__submit-button"
            : "battle-points__submit-button--hide"
        }
        type='submit'
        onClick={() => {
          setSubmitBool(true);
          handleReSubmit();
        }}
        disabled={submitBool ? true : false}
      >
        Re-Submit
      </button>

      <button
        className={
          battleOverBool === false && userEditBool
            ? "battle-points__submit-button"
            : "battle-points__submit-button--hide"
        }
        type='submit'
        onClick={() => {
          setSubmitBool(true);
          handleSubmit();
        }}
        disabled={submitBool ? true : false}
      >
        Submit
      </button>
    </section>
  );
}
