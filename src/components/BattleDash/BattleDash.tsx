import { Armies, Player, Users } from "../../utils/Interfaces";
import "./BattleDash.scss";
import logo from "../../assets/logo.svg";
import BattleCard from "../BattleCard/BattleCard";
import PlayerTypePill from "../PlayerTypePill/PlayerTypePill";
import BattleTypePill from "../BattleTypePill/BattleTypePill";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/UserRequests";
import { getAllArmies } from "../../utils/ArmyRequests";

interface BattleComp {
  playerOne: Player[];
  playerTwo: Player[];
  gameType: "single" | "multi";
  battleType: "40k" | "fantasy";
  scenario: string;
  pointsSize: number;
  result: string;
  winner: string;
  date: string;
  table: string;
  start: string;
  finish: string;
}

interface UsersArray extends Array<Users> {}
interface ArmiesArray extends Array<Armies> {}

export default function BattleDash({
  playerOne,
  playerTwo,
  gameType,
  battleType,
  scenario,
  pointsSize,
  result,
  winner,
  date,
  table,
  start,
  finish,
}: BattleComp) {
  const [pointsSizeValue, setPointsSizeValue] = useState(pointsSize);
  const [scenarioValue, setScenarioValue] = useState(scenario);
  const [gameTypeValue, setGameTypeValue] = useState(gameType);
  const [battleTypeValue, setBattleTypeValue] = useState(battleType);
  const [resultValue, setResultValue] = useState(result);
  const [winnerValue, setWinnerValue] = useState(winner);
  const [dateValue, setDateValue] = useState(pointsSize);
  const [tableValue, setTableValue] = useState(table);
  const [startValue, setStartValue] = useState(start);
  const [finishValue, setFinishValue] = useState(finish);

  const [userArray, setUserArray] = useState<UsersArray>();
  const [armyArray, setArmyArray] = useState<ArmiesArray>();
  const [userOneFilter, setUserOneFilter] = useState("");
  const [userTwoFilter, setUserTwoFilter] = useState("");
  const [armyOne, setArmyOne] = useState("");
  const [userOne, setUserOne] = useState("");
  const [armyTwo, setArmyTwo] = useState("");
  const [userTwo, setUserTwo] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUserOneFilter(response[0].id);
      setUserTwoFilter(response[0].id);

      setUserOne(response[0].id);
      setUserTwo(response[0].id);
      return setUserArray(response);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchArmies = async () => {
      const response = await getAllArmies();
      const filteredResponse = response.filter(
        (army) => army.type === battleType
      );
      setArmyOne(response[0].name);
      setArmyTwo(response[0].name);

      return setArmyArray(filteredResponse);
    };
    fetchArmies();
  }, []);

  const handleClick = (event) => {
    console.log(event);
  };

  const submitPlayer = (event) => {
    console.log(event);
  };
  const addArmy = (event, player) => {
    event.preventDefault();
    let userID = "1";
    let armyName = "Necrons";
    if (player === 1) {
      userID = event.target.parentElement.children.users_1.value;
      armyName = event.target.parentElement.children.army_1.value;
    } else if (player === 2) {
      userID = event.target.parentElement.children.users_2.value;
      armyName = event.target.parentElement.children.army_2.value;
    }

    const targetArmy = armyArray?.filter(
      (army) => army.name === armyName && army.user_id === userID
    );

    console.log(targetArmy);
  };

  const removePlayer = (event) => {
    console.log(event.target.parentElement.children[0].id);
  };

  if (!armyArray || !userArray || !userOneFilter || !userTwoFilter) {
    return <p> Please wait while we load your content</p>;
  }

  return (
    <section className="battle-dash">
      <div className="battle-dash__header-wrap">
        <h1 className="battle-dash__header">Battle Information</h1>
        <img
          className="battle-dash__header-img"
          src={logo}
          alt="the crest of the crypt"
        />
      </div>
      <div className="battle-dash__battle-wrap">
        <h2 className="battle-dash__subheader">Combatants</h2>
        <div className="battle-dash__combatant-wrap battle-dash__combatant-wrap--hide">
          {playerOne.map((player) => (
            <BattleCard
              key={crypto.randomUUID()}
              name={player.name}
              known_as={player.known_as}
              rank={player.rank}
            />
          ))}{" "}
          <p className="battle-dash__versus">vs</p>
          {playerTwo.map((player) => (
            <BattleCard
              key={crypto.randomUUID()}
              name={player.name}
              known_as={player.known_as}
              rank={player.rank}
            />
          ))}{" "}
        </div>
        <div className="battle-dash__combatant-wrap battle-dash__combatant-edit">
          {playerOne.map((player) => (
            <article className="battle-dash__combatant">
              <BattleCard
                key={crypto.randomUUID()}
                army_id={player.army_id}
                name={player.name}
                known_as={player.known_as}
                rank={player.rank}
              />
              <button className="battle-dash__remove" onClick={removePlayer}>
                {" "}
                -{" "}
              </button>
            </article>
          ))}{" "}
          <div className="battle-dash__combatant-edit-row">
            <select
              name="users_1"
              id="users_1"
              value={userOne}
              onChange={(event) => {
                setUserOneFilter(event.target.value);
                setUserOne(event.target.value);
              }}
            >
              {userArray.map((user) => (
                <option key={crypto.randomUUID()} value={user.id}>
                  {user.known_as}
                </option>
              ))}
            </select>
            <select
              name="army_1"
              id="army_1"
              value={armyOne}
              onChange={(event) => {
                setArmyOne(event.target.value);
              }}
            >
              {armyArray.map((army) => {
                if (army.user_id === userOneFilter) {
                  return (
                    <option key={crypto.randomUUID()} value={army.name}>
                      {army.name}
                    </option>
                  );
                }
              })}
            </select>

            <button
              className="battle-dash__add"
              onClick={(event) => {
                addArmy(event, 1);
              }}
            >
              +
            </button>
            <button className="battle-dash__submit" onClick={submitPlayer}>
              Submit
            </button>
          </div>{" "}
          <p className="battle-dash__versus">vs</p>
          {playerTwo.map((player) => (
            <article className="battle-dash__combatant">
              <BattleCard
                key={player.army_id}
                army_id={player.army_id}
                name={player.name}
                known_as={player.known_as}
                rank={player.rank}
              />
              <button className="battle-dash__remove" onClick={removePlayer}>
                {" "}
                -{" "}
              </button>
            </article>
          ))}{" "}
          <div className="battle-dash__combatant-edit-row">
            <select
              name="users_2"
              id="users_2"
              value={userTwo}
              onChange={(event) => {
                setUserTwoFilter(event.target.value);

                setUserTwo(event.target.value);
              }}
            >
              {userArray.map((user) => (
                <option key={crypto.randomUUID()} value={user.id}>
                  {user.known_as}
                </option>
              ))}
            </select>
            <select
              name="army_2"
              id="army_2"
              value={armyTwo}
              onChange={(event) => {
                setArmyTwo(event.target.value);
              }}
            >
              {armyArray.map((army) => {
                if (army.user_id === userTwoFilter) {
                  return (
                    <option key={crypto.randomUUID()} value={army.name}>
                      {army.name}
                    </option>
                  );
                }
              })}
            </select>
            <button
              className="battle-dash__add"
              onClick={(event) => {
                addArmy(event, 2);
              }}
            >
              +
            </button>
            <button className="battle-dash__submit" onClick={submitPlayer}>
              Submit
            </button>
          </div>{" "}
        </div>
        <button className="battle-dash__edit" onClick={handleClick}>
          EDIT
        </button>
      </div>
      <div className="battle-dash__info-wrap">
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Game Type</h2>
          <div className="battle-dash__info">
            <PlayerTypePill player_type={gameType} />
            <BattleTypePill battle_type={battleType} />
          </div>
        </article>
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Narrative / Scenario</h2>
          <div className="battle-dash__info">
            <input name="scenario" className="battle-dash__info-text" />
          </div>
        </article>
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Points Size</h2>
          <div className="battle-dash__info">
            <input
              className="battle-dash__info-text"
              value={pointsSizeValue}
              onChange={(event) => {
                console.log(event);
              }}
            ></input>
          </div>
        </article>
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Result</h2>
          <div className="battle-dash__info">
            <p className="battle-dash__info-text">{!result ? "TBC" : result}</p>
          </div>
        </article>
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Winner</h2>
          <div className="battle-dash__info">
            <p className="battle-dash__info-text">{!winner ? "TBC" : winner}</p>
          </div>
        </article>
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Date</h2>{" "}
          <div className="battle-dash__info">
            <p className="battle-dash__info-text">{date}</p>
          </div>
        </article>{" "}
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Table</h2>{" "}
          <div className="battle-dash__info">
            <p className="battle-dash__info-text">{date}</p>
          </div>
        </article>{" "}
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Start</h2>{" "}
          <div className="battle-dash__info">
            <p className="battle-dash__info-text">{date}</p>
          </div>
        </article>{" "}
        <article className="battle-dash__info-container">
          <h2 className="battle-dash__subheader">Finish</h2>{" "}
          <div className="battle-dash__info">
            <p className="battle-dash__info-text">{date}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
