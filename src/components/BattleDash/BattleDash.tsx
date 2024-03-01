import { Armies, Player, Users } from "../../utils/Interfaces";
import "./BattleDash.scss";
import logo from "../../assets/logo.svg";
import save from "../../assets/save.svg";
import cancel from "../../assets/cancel.svg";
import BattleCard from "../BattleCard/BattleCard";
import PlayerTypePill from "../PlayerTypePill/PlayerTypePill";
import BattleTypePill from "../BattleTypePill/BattleTypePill";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/UserRequests";
import { getAllArmies, updateArmyCombatants } from "../../utils/ArmyRequests";
import { updateBattleDetail } from "../../utils/BattleRequests";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";

interface BattleComp {
  playerOne: Player[];
  playerTwo: Player[];
  gameType: "single" | "multi";
  battleType: "40k" | "fantasy";
  scenario?: string;
  pointsSize?: number;
  result: string;
  winner: string;
  date: string | undefined;
  table: string | undefined;
  start: string | undefined;
  finish: string | undefined;
  battleID: string | undefined;
  token: string;
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
  battleID,
  token,
}: BattleComp) {
  const [pointsSizeValue, setPointsSizeValue] = useState(pointsSize);
  const [scenarioValue, setScenarioValue] = useState(scenario);
  const [gameTypeValue, setGameTypeValue] = useState(gameType);
  const [battleTypeValue, setBattleTypeValue] = useState(battleType);
  const [resultValue, setResultValue] = useState(result);
  const [winnerValue, setWinnerValue] = useState(winner);
  const [dateValue, setDateValue] = useState(date);
  const [tableValue, setTableValue] = useState(table);
  const [startValue, setStartValue] = useState(dayjs(start, "HH:mm:ss"));
  const [finishValue, setFinishValue] = useState(dayjs(finish, "HH:mm:ss"));
  const [playerEditBool, setPlayerEditBool] = useState(false);
  const [battleDetailsEditBool, setBattleDetailsEditBool] = useState(false);
  const [userEditBool, setUserEditBool] = useState(false);
  const [editBattleTypeBool, setEditBattleTypeBool] = useState(false);
  const [editScenarioBool, setEditScenarioBool] = useState(false);
  const [editPointSizeBool, setEditPointSizeBool] = useState(false);
  const [editTableBool, setEditTableBool] = useState(false);
  const [editDateBool, setEditDateBool] = useState(false);
  const [editStartBool, setEditStartBool] = useState(false);
  const [editFinishBool, setEditFinishBool] = useState(false);

  const [playerOneArray, setPlayerOneArray] = useState(playerOne);
  const [playerTwoArray, setPlayerTwoArray] = useState(playerTwo);
  const [userArray, setUserArray] = useState<UsersArray>();
  const [armyArray, setArmyArray] = useState<ArmiesArray>();
  const [userOneFilter, setUserOneFilter] = useState("");
  const [userTwoFilter, setUserTwoFilter] = useState("");
  const [armyOne, setArmyOne] = useState("");
  const [userOne, setUserOne] = useState("");
  const [armyTwo, setArmyTwo] = useState("");
  const [userTwo, setUserTwo] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUserOneFilter(response[0].id);
      setUserTwoFilter(response[0].id);

      setUserOne(response[0].id);
      setUserTwo(response[0].id);
      return setUserArray(response);
    };

    if (token) {
      setUserEditBool(true);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchArmies = async () => {
      const response = await getAllArmies();
      const filteredResponse = response.filter(
        (army: any) => army.type === battleType
      );
      setArmyOne(response[0].name);
      setArmyTwo(response[0].name);

      return setArmyArray(filteredResponse);
    };
    fetchArmies();
  }, []);

  const handleClick = (event: any) => {
    playerEditBool === false
      ? setPlayerEditBool(true)
      : setPlayerEditBool(false);
  };

  const addArmy = async (event: any, player: any) => {
    event.preventDefault();

    let userID = "1";
    let userName = "";
    let armyName = "Necrons";
    let armyID = "";

    if (!event.target) {
      return "No Target";
    }
    if (player === 1) {
      userID = event.target.parentElement.children.users_1.value.split("+")[0];
      userName =
        event.target.parentElement.children.users_1.value.split("+")[1];
      armyName = event.target.parentElement.children.army_1.value.split("+")[1];
      armyID = event.target.parentElement.children.army_1.value.split("+")[0];
      let newArray = [
        ...playerOneArray,
        { known_as: userName, name: armyName, army_id: armyID },
      ];
      setPlayerOneArray(newArray);

      let armyIDArrayOne = newArray.map((army) => ({ army_id: army.army_id }));
      let armyIDArrayTwo = playerTwoArray.map((army) => ({
        army_id: army.army_id,
      }));

      let requestBody = { player_1: armyIDArrayOne, player_2: armyIDArrayTwo };
      setIsLoading(true);
      let successBool = await updateArmyCombatants(
        requestBody,
        battleID,
        token
      );
      console.log(successBool);
      setIsLoading(false);
    } else if (player === 2) {
      userID = event.target.parentElement.children.users_2.value.split("+")[0];
      userName =
        event.target.parentElement.children.users_2.value.split("+")[1];
      armyName = event.target.parentElement.children.army_2.value.split("+")[1];
      armyID = event.target.parentElement.children.army_2.value.split("+")[0];
      let newArray = [
        ...playerTwoArray,
        { known_as: userName, name: armyName, army_id: armyID },
      ];
      setPlayerTwoArray(newArray);

      let armyIDArrayTwo = newArray.map((army) => ({ army_id: army.army_id }));
      let armyIDArrayOne = playerOneArray.map((army) => ({
        army_id: army.army_id,
      }));

      let requestBody = { player_1: armyIDArrayOne, player_2: armyIDArrayTwo };
      let successBool = await updateArmyCombatants(
        requestBody,
        battleID,
        token
      );
    }
  };

  const removePlayer = async (event: any, player: any) => {
    let targetArmyID = event.target.parentElement.children[0].id;
    if (player === 1) {
      let newArmyArray = playerOneArray.filter(
        (army) => army.army_id !== targetArmyID
      );
      console.log(newArmyArray);
      setPlayerOneArray(newArmyArray);

      let newIDArrayOne = newArmyArray.map((army) => ({
        army_id: army.army_id,
      }));
      let newIDArrayTwo = playerTwoArray.map((army) => ({
        army_id: army.army_id,
      }));

      let requestBody = { player_1: newIDArrayOne, player_2: newIDArrayTwo };
      setIsLoading(true);
      let successBool = await updateArmyCombatants(
        requestBody,
        battleID,
        token
      );
      setIsLoading(false);

      console.log(successBool);
    } else if (player === 2) {
      let newArmyArray = playerTwoArray.filter(
        (army) => army.army_id !== targetArmyID
      );
      setPlayerTwoArray(newArmyArray);

      let newIDArrayTwo = newArmyArray.map((army) => ({
        army_id: army.army_id,
      }));
      let newIDArrayOne = playerOneArray.map((army) => ({
        army_id: army.army_id,
      }));

      let requestBody = { player_1: newIDArrayOne, player_2: newIDArrayTwo };

      let successBool = await updateArmyCombatants(
        requestBody,
        battleID,
        token
      );
    }
  };

  const handleChangeSubmit = async (detail: string, value?: any) => {
    console.log(detail);
    if (detail === "scenario") {
      let requestBody = { scenario: scenarioValue };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
      console.log(response);
    } else if (detail === "pointsize") {
      let requestBody = { points_size: pointsSizeValue };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
      console.log(response);
    } else if (detail === "date") {
      let requestBody = { date: dateValue };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
      console.log(response);
    } else if (detail === "start") {
      let requestBody = { start: dayjs(startValue).format("HH:mm:ss") };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
      console.log(response);
    } else if (detail === "finish") {
      let requestBody = { finish: dayjs(finishValue).format("HH:mm:ss") };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
      console.log(response);
    } else if (detail === "table") {
      let requestBody = { table: tableValue };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
      console.log(response);
    } else if (detail === "gametype") {
      let requestBody = { battle_type: value };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
      console.log(response);
    }
  };

  if (!armyArray || !userArray || !userOneFilter || !userTwoFilter) {
    return <p> Please wait while we load your content</p>;
  }

  return (
    <section className="battle-dash">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <div
            className={
              playerEditBool === false
                ? "battle-dash__combatant-wrap"
                : "battle-dash__combatant-wrap battle-dash__combatant-wrap--hide"
            }
          >
            <div className="battle-dash__player-wrap">
              {playerOneArray.map((player) => (
                <BattleCard
                  key={crypto.randomUUID()}
                  name={player.name}
                  known_as={player.known_as}
                  rank={player.rank}
                />
              ))}{" "}
            </div>
            <p className="battle-dash__versus">vs</p>
            <div className="battle-dash__player-wrap">
              {playerTwoArray.map((player) => (
                <BattleCard
                  key={crypto.randomUUID()}
                  name={player.name}
                  known_as={player.known_as}
                  rank={player.rank}
                />
              ))}{" "}
            </div>
          </div>
          <div
            className={
              playerEditBool === true
                ? "battle-dash__combatant-wrap battle-dash__combatant-wrap--edit"
                : "battle-dash__combatant-wrap battle-dash__combatant-wrap--hide"
            }
          >
            {playerOneArray.map((player) => (
              <article
                key={crypto.randomUUID()}
                className="battle-dash__combatant"
              >
                <BattleCard
                  key={crypto.randomUUID()}
                  army_id={player.army_id}
                  name={player.name}
                  known_as={player.known_as}
                  rank={player.rank}
                />
                <button
                  key={crypto.randomUUID()}
                  className="battle-dash__remove"
                  onClick={(event) => {
                    removePlayer(event, 1);
                  }}
                >
                  Remove
                </button>
              </article>
            ))}{" "}
            <div className="battle-dash__combatant-edit-row">
              <select
                name="users_1"
                className="battle-dash__select"
                id="users_1"
                value={userOne}
                onChange={(event) => {
                  setUserOneFilter(event.target.value.split("+")[0]);
                  setUserOne(event.target.value);
                }}
              >
                <option hidden>Select User </option>
                {userArray
                  .filter((user) => {
                    const army = armyArray.find(
                      (army) => army.user_id === user.id
                    );
                    return army;
                  })
                  .map((user) => {
                    return (
                      <option
                        key={crypto.randomUUID()}
                        value={`${user.id}+${user.known_as}`}
                      >
                        {user.known_as}
                      </option>
                    );
                  })}
              </select>
              <select
                name="army_1"
                className="battle-dash__select"
                id="army_1"
                value={armyOne}
                onChange={(event) => {
                  setArmyOne(event.target.value);
                }}
              >
                <option hidden> --- Army ---</option>

                {armyArray.length === 0 ? (
                  <option>No Armies for this User</option>
                ) : (
                  armyArray.map((army) => {
                    if (army.user_id === userOneFilter) {
                      return (
                        <option
                          key={crypto.randomUUID()}
                          value={`${army.id}+${army.name}`}
                        >
                          {army.name}
                        </option>
                      );
                    }
                  })
                )}
              </select>

              <button
                className="battle-dash__add"
                onClick={(event) => {
                  addArmy(event, 1);
                }}
              >
                +
              </button>
            </div>{" "}
            <p className="battle-dash__versus">vs</p>
            {playerTwoArray.map((player) => (
              <article
                key={crypto.randomUUID()}
                className="battle-dash__combatant"
              >
                <BattleCard
                  key={player.army_id}
                  army_id={player.army_id}
                  name={player.name}
                  known_as={player.known_as}
                  rank={player.rank}
                />
                <button
                  key={crypto.randomUUID()}
                  className="battle-dash__remove"
                  onClick={(event) => {
                    console.log("Remove has been clicked");
                    removePlayer(event, 2);
                  }}
                >
                  Remove
                </button>
              </article>
            ))}{" "}
            <div className="battle-dash__combatant-edit-row">
              <select
                name="users_2"
                id="users_2"
                className="battle-dash__select"
                value={userTwo}
                onChange={(event) => {
                  setUserTwoFilter(event.target.value.split("+")[0]);

                  setUserTwo(event.target.value);
                }}
              >
                {" "}
                <option hidden>Select User</option>
                {userArray
                  .filter((user) => {
                    const army = armyArray.find(
                      (army) => army.user_id === user.id
                    );
                    return army;
                  })
                  .map((user) => (
                    <option
                      key={crypto.randomUUID()}
                      value={`${user.id}+${user.known_as}`}
                    >
                      {user.known_as}
                    </option>
                  ))}
              </select>
              <select
                name="army_2"
                id="army_2"
                className="battle-dash__select"
                value={armyTwo}
                onChange={(event) => {
                  setArmyTwo(event.target.value);
                }}
              >
                <option hidden> --- Army ---</option>
                {armyArray.map((army) => {
                  if (army.user_id === userTwoFilter) {
                    return (
                      <option
                        key={crypto.randomUUID()}
                        value={`${army.id}+${army.name}`}
                      >
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
            </div>{" "}
          </div>
          <button
            className={
              userEditBool === true
                ? "battle-dash__edit"
                : "battle-dash__edit battle-dash__edit--hide"
            }
            onClick={handleClick}
          >
            Edit
          </button>
        </div>
        <div className="battle-dash__info-wrap">
          <article className="battle-dash__info-container">
            <h2 className="battle-dash__subheader">Game Type</h2>
            <div className="battle-dash__info">
              <PlayerTypePill player_type={gameType} />
              {editBattleTypeBool === true ? (
                <select
                  name="battletype"
                  id=""
                  onChange={(event) => {
                    event.target.value === "40k"
                      ? setBattleTypeValue("40k")
                      : setBattleTypeValue("fantasy");
                    setEditBattleTypeBool(false);
                    handleChangeSubmit("gametype", event.target.value);
                  }}
                >
                  <option value={battleTypeValue}>{battleTypeValue}</option>
                  <option value={battleTypeValue === "40k" ? "fantasy" : "40k"}>
                    {battleTypeValue === "40k" ? "fantasy" : "40k"}
                  </option>
                </select>
              ) : (
                <div
                  onClick={() => {
                    setEditBattleTypeBool(true);
                  }}
                >
                  <BattleTypePill battle_type={battleTypeValue} />
                </div>
              )}
            </div>
          </article>
          <article className="battle-dash__info-container">
            <h2 className="battle-dash__subheader">Narrative / Scenario</h2>
            <div className="battle-dash__info">
              <input
                value={scenarioValue}
                name="scenario"
                maxLength={80}
                className="battle-dash__info-text"
                onClick={() => {
                  setEditScenarioBool(true);
                }}
                onChange={(event) => {
                  setScenarioValue(event.target.value);
                }}
                readOnly={
                  userEditBool && editScenarioBool === true ? false : true
                }
              />
              <button
                className={
                  userEditBool && editScenarioBool === true
                    ? "battle-dash__submit-button"
                    : "battle-dash__submit-button battle-dash__submit-button--hide"
                }
              >
                <img
                  className="battle-dash__toggle-icon"
                  src={save}
                  alt="saving toggle"
                  onClick={() => {
                    setEditScenarioBool(false);
                    handleChangeSubmit("scenario");
                  }}
                />
              </button>
            </div>
          </article>
          <article className="battle-dash__info-container">
            <h2 className="battle-dash__subheader">Points Size</h2>
            <div className="battle-dash__info">
              <input
                className="battle-dash__info-text"
                value={pointsSizeValue}
                type="number"
                onClick={() => {
                  setEditPointSizeBool(true);
                }}
                onChange={(event: any) => {
                  if (isNaN(event.target.value)) {
                    return setPointsSizeValue(pointsSizeValue);
                  }
                  setPointsSizeValue(Number(event.target.value));
                }}
                readOnly={
                  userEditBool && editPointSizeBool === true ? false : true
                }
              />{" "}
              <button
                className={
                  userEditBool && editPointSizeBool === true
                    ? "battle-dash__submit-button"
                    : "battle-dash__submit-button battle-dash__submit-button--hide"
                }
              >
                <img
                  className="battle-dash__toggle-icon"
                  src={save}
                  alt="saving toggle"
                  onClick={() => {
                    handleChangeSubmit("pointsize");
                    setEditPointSizeBool(false);
                  }}
                />
              </button>
            </div>
          </article>
          <article className="battle-dash__info-container">
            <h2 className="battle-dash__subheader">Result</h2>
            <div className="battle-dash__info">
              <p className="battle-dash__info-text">
                {!result ? "TBC" : result}
              </p>
            </div>
          </article>
          <article className="battle-dash__info-container">
            <h2 className="battle-dash__subheader">Winner</h2>
            <div className="battle-dash__info">
              <p className="battle-dash__info-text">
                {!winner ? "TBC" : winner}
              </p>
            </div>
          </article>
          <article className="battle-dash__info-container">
            <h2 className="battle-dash__subheader">Table</h2>{" "}
            <div className="battle-dash__info">
              <div
                onClick={() => {
                  console.log("Clicked");
                  setEditTableBool(true);
                }}
                className={
                  userEditBool && editTableBool === false
                    ? "battle-dash__select-wrap"
                    : "battle-dash__select-wrap battle-dash__select-wrap--hide"
                }
              >
                <p className="battle-dash__info-text">
                  {`Table ${tableValue[5]}`}
                </p>
              </div>
              <select
                value={tableValue}
                name="table"
                className={
                  userEditBool && editTableBool === true
                    ? "battle-dash__info-text"
                    : "battle-dash__select-wrap--hide"
                }
                onChange={(event) => {
                  setTableValue(event.target.value);
                }}
                disabled={userEditBool && editTableBool === true ? false : true}
              >
                <option value="table1">Table 1</option>
                <option value="table2">Table 2</option>
                <option value="table3">Table 3</option>
              </select>
              <button
                className={
                  userEditBool && editTableBool === true
                    ? "battle-dash__submit-button"
                    : "battle-dash__submit-button battle-dash__submit-button--hide"
                }
              >
                <img
                  className="battle-dash__toggle-icon"
                  src={save}
                  alt="saving toggle"
                  onClick={() => {
                    handleChangeSubmit("table");
                    setEditTableBool(false);
                  }}
                />
              </button>
            </div>
          </article>{" "}
          <article className="battle-dash__info-container battle-dash__info-container--date">
            <h2 className="battle-dash__subheader">Date</h2>{" "}
            <div className="battle-dash__info">
              <div
                className="battle-dash__date-wrapper"
                onClick={() => {
                  setEditDateBool(true);
                }}
              >
                <DatePicker
                  value={dayjs(dateValue)}
                  onChange={(newValue: any) => {
                    setDateValue(newValue.format("YYYY-MM-DD"));
                  }}
                  readOnly={
                    userEditBool && editDateBool === true ? false : true
                  }
                />
              </div>
              <img
                className={
                  userEditBool && editDateBool === true
                    ? "battle-dash__toggle-icon"
                    : "battle-dash__toggle-icon--hide"
                }
                src={save}
                alt="saving toggle"
                onClick={() => {
                  handleChangeSubmit("date");
                  setEditDateBool(false);
                }}
              />
            </div>
          </article>{" "}
          <article className="battle-dash__info-container battle-dash__info-container--date">
            <h2 className="battle-dash__subheader">Start</h2>{" "}
            <div className="battle-dash__info">
              <div
                className="battle-dash__date-wrap"
                onClick={() => {
                  setEditStartBool(true);
                }}
              >
                <TimePicker
                  sx={{ fontWeight: 900 }}
                  ampm={false}
                  value={startValue}
                  onChange={(newValue: any) => {
                    setStartValue(newValue);
                  }}
                  readOnly={
                    userEditBool && editStartBool === true ? false : true
                  }
                />
              </div>
              <img
                className={
                  userEditBool && editStartBool === true
                    ? "battle-dash__toggle-icon"
                    : "battle-dash__toggle-icon--hide"
                }
                src={save}
                alt="saving toggle"
                onClick={() => {
                  handleChangeSubmit("start");
                  setEditStartBool(false);
                }}
              />
            </div>
          </article>{" "}
          <article className="battle-dash__info-container battle-dash__info-container--date">
            <h2 className="battle-dash__subheader">Finish</h2>{" "}
            <div className="battle-dash__info">
              <div
                className="battle-dash__date-wrap"
                onClick={() => {
                  setEditFinishBool(true);
                }}
              >
                <TimePicker
                  ampm={false}
                  value={finishValue}
                  minTime={startValue}
                  onChange={(newValue: any) => {
                    setFinishValue(newValue);
                  }}
                  readOnly={
                    userEditBool && editFinishBool === true ? false : true
                  }
                />
              </div>
              <img
                className={
                  userEditBool && editFinishBool === true
                    ? "battle-dash__toggle-icon"
                    : "battle-dash__toggle-icon--hide"
                }
                src={save}
                alt="saving toggle"
                onClick={() => {
                  handleChangeSubmit("finish");
                  setEditFinishBool(false);
                }}
              />
            </div>
          </article>
        </div>
      </LocalizationProvider>
    </section>
  );
}
