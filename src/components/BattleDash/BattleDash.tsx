import { Armies, Player, Users } from "../../utils/Interfaces";
import "./BattleDash.scss";
import logo from "../../assets/logo.svg";
import save from "../../assets/save.svg";
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
  ArrowLeftIcon,
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

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
  battleID: string;
  token: string;
  setPlayerTwoArray: Function;
  setPlayerOneArray: Function;
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
  setPlayerOneArray,
  setPlayerTwoArray,
}: BattleComp) {
  const [pointsSizeValue, setPointsSizeValue] = useState(pointsSize);
  const [scenarioValue, setScenarioValue] = useState(scenario);
  const [battleTypeValue, setBattleTypeValue] = useState(battleType);
  const [dateValue, setDateValue] = useState(date);
  const [tableValue, setTableValue] = useState(table);
  const [startValue, setStartValue] = useState(dayjs(start, "HH:mm:ss"));
  const [finishValue, setFinishValue] = useState(dayjs(finish, "HH:mm:ss"));
  const [playerEditBool, setPlayerEditBool] = useState(false);
  const [userEditBool, setUserEditBool] = useState(false);
  const [editBattleTypeBool, setEditBattleTypeBool] = useState(false);
  const [editScenarioBool, setEditScenarioBool] = useState(false);
  const [editPointSizeBool, setEditPointSizeBool] = useState(false);
  const [editTableBool, setEditTableBool] = useState(false);
  const [editDateBool, setEditDateBool] = useState(false);
  const [editStartBool, setEditStartBool] = useState(false);
  const [editFinishBool, setEditFinishBool] = useState(false);
  const [successBool, setSuccessBool] = useState(false);

  const [userArray, setUserArray] = useState<UsersArray>();
  const [armyArray, setArmyArray] = useState<ArmiesArray>();
  const [userOneFilter, setUserOneFilter] = useState("");
  const [userTwoFilter, setUserTwoFilter] = useState("");
  const [armyOne, setArmyOne] = useState("");
  const [userOne, setUserOne] = useState("");
  const [armyTwo, setArmyTwo] = useState("");
  const [userTwo, setUserTwo] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
        ...playerOne,
        { id: userID, known_as: userName, name: armyName, army_id: armyID },
      ];
      setPlayerOneArray(newArray);

      let armyIDArrayOne = newArray.map((army) => ({ army_id: army.army_id }));
      let armyIDArrayTwo = playerTwo.map((army) => ({
        army_id: army.army_id,
      }));

      let requestBody = { player_1: armyIDArrayOne, player_2: armyIDArrayTwo };
      setSuccessBool(await updateArmyCombatants(requestBody, battleID, token));
    } else if (player === 2) {
      userID = event.target.parentElement.children.users_2.value.split("+")[0];
      userName =
        event.target.parentElement.children.users_2.value.split("+")[1];
      armyName = event.target.parentElement.children.army_2.value.split("+")[1];
      armyID = event.target.parentElement.children.army_2.value.split("+")[0];
      let newArray = [
        ...playerTwo,
        { id: userID, known_as: userName, name: armyName, army_id: armyID },
      ];
      setPlayerTwoArray(newArray);

      let armyIDArrayTwo = newArray.map((army) => ({ army_id: army.army_id }));
      let armyIDArrayOne = playerOne.map((army) => ({
        army_id: army.army_id,
      }));

      let requestBody = { player_1: armyIDArrayOne, player_2: armyIDArrayTwo };

      setSuccessBool(await updateArmyCombatants(requestBody, battleID, token));
    }
  };

  const removePlayer = async (event: any, player: any) => {
    let targetArmyID = event.target.parentElement.children[0].id;
    if (player === 1) {
      let newArmyArray = playerOne.filter(
        (army) => army.army_id !== targetArmyID
      );
      setPlayerOneArray(newArmyArray);

      let newIDArrayOne = newArmyArray.map((army) => ({
        army_id: army.army_id,
      }));
      let newIDArrayTwo = playerTwo.map((army) => ({
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
    } else if (player === 2) {
      let newArmyArray = playerTwo.filter(
        (army) => army.army_id !== targetArmyID
      );
      setPlayerTwoArray(newArmyArray);

      let newIDArrayTwo = newArmyArray.map((army) => ({
        army_id: army.army_id,
      }));
      let newIDArrayOne = playerOne.map((army) => ({
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
    if (detail === "scenario") {
      let requestBody = { scenario: scenarioValue };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
    } else if (detail === "pointsize") {
      let requestBody = { points_size: pointsSizeValue };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
    } else if (detail === "date") {
      let requestBody = { date: dateValue };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
    } else if (detail === "start") {
      let requestBody = { start: dayjs(startValue).format("HH:mm:ss") };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
    } else if (detail === "finish") {
      let requestBody = { finish: dayjs(finishValue).format("HH:mm:ss") };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
    } else if (detail === "table") {
      let requestBody = { table: tableValue };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
    } else if (detail === "gametype") {
      let requestBody = { battle_type: value };
      const response = await updateBattleDetail(
        battleID,
        token,
        detail,
        requestBody
      );
    }
  };

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

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUserOneFilter(response[0].id);
      setUserTwoFilter(response[0].id);

      setUserOne(response[0].id);
      setUserTwo(response[0].id);

      if (armyArray) {
        // Battle Type User Filter
        const filteredResponse = await response.filter((user: Player) => {
          const army = armyArray.find((army) => army.user_id === user.id);
          return army;
        });

        // Filter the user list based on current players
        const secondFilteredResponse = filteredResponse.filter(
          (user: Player) => {
            const userOneBool = playerOne.find(
              (player) => player.id === user.id
            );
            const userTwoBool = playerTwo.find(
              (player) => player.id === user.id
            );

            if (userOneBool || userTwoBool) {
              return false;
            } else {
              return true;
            }
          }
        );

        return setUserArray(secondFilteredResponse);
      }
      setUserArray(response);
    };

    if (token) {
      setUserEditBool(true);
    }
    fetchUsers();
  }, [playerOne, playerTwo, armyArray]);

  useEffect(() => {
    if (userArray && armyArray) {
      const filteredUserArray = userArray;

      setUserArray(filteredUserArray);
    }
  }, []);

  if (
    !armyArray ||
    !userArray ||
    !userOneFilter ||
    !userTwoFilter ||
    !playerOne ||
    !playerTwo
  ) {
    return <p> Please wait while we load your content</p>;
  }

  return (
    <section className="battle-dash">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="battle-dash__back-arrow"
        >
          <ArrowLeftIcon /> Back
        </div>
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
            onClick={handleClick}
          >
            <button
              className={
                userEditBool && !playerEditBool === true
                  ? "battle-dash__edit"
                  : "battle-dash__edit battle-dash__edit--hide"
              }
            >
              {userEditBool && !playerEditBool === true
                ? "Edit Combatants"
                : ""}
            </button>
            <div className="battle-dash__combatant-container">
              <div className="battle-dash__player-wrap">
                {playerOne.map((player) => (
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
                {playerTwo.map((player) => (
                  <BattleCard
                    key={crypto.randomUUID()}
                    name={player.name}
                    known_as={player.known_as}
                    rank={player.rank}
                  />
                ))}{" "}
              </div>
            </div>
          </div>
          <div
            className={
              playerEditBool === true
                ? "battle-dash__combatant-wrap battle-dash__combatant-wrap--edit"
                : "battle-dash__combatant-wrap battle-dash__combatant-wrap--hide"
            }
          >
            <button
              className={
                userEditBool && playerEditBool === true
                  ? "battle-dash__edit"
                  : "battle-dash__edit battle-dash__edit--hide"
              }
              onClick={handleClick}
            >
              {userEditBool && playerEditBool === true ? "Finish edit" : ""}
            </button>
            <div className="battle-dash__combatant-container battle-dash__combatant-container--edit">
              {playerOne.map((player) => (
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
                  {userArray.map((user) => {
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
              {playerTwo.map((player) => (
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
                  {userArray.map((user) => (
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
              </div>
            </div>
          </div>
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
            <h2 className="battle-dash__subheader">Scenario</h2>
            <div className="battle-dash__info">
              <input
                value={scenarioValue}
                name="scenario"
                maxLength={80}
                className={
                  editScenarioBool === true
                    ? "battle-dash__input"
                    : "battle-dash__info-text--hide"
                }
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
              <p
                className={
                  editScenarioBool === false
                    ? "battle-dash__info-text"
                    : "battle-dash__info-text--hide"
                }
                onClick={() => {
                  setEditScenarioBool(true);
                }}
              >
                {scenarioValue}
              </p>
            </div>
          </article>
          <article className="battle-dash__info-container">
            <h2 className="battle-dash__subheader">Points Size</h2>
            <div className="battle-dash__info">
              <input
                className={
                  editPointSizeBool === true
                    ? "battle-dash__input"
                    : "battle-dash__info-text--hide"
                }
                value={pointsSizeValue}
                type="number"
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
              <p
                className={
                  editPointSizeBool === false
                    ? "battle-dash__info-text"
                    : "battle-dash__info-text--hide"
                }
                onClick={() => {
                  setEditPointSizeBool(true);
                }}
              >
                {pointsSizeValue}
              </p>
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
                  {tableValue ? `Table ${tableValue[6]}` : ""}
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
                  console.log(event.target.value);
                  setTableValue(event.target.value);
                }}
                disabled={userEditBool && editTableBool === true ? false : true}
              >
                <option hidden>{tableValue}</option>
                <option value="Table 1">Table 1</option>
                <option value="Table 2">Table 2</option>
                <option value="Table 3">Table 3</option>
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
                className={
                  editDateBool === true
                    ? "battle-dash__date-wrapper"
                    : "battle-dash__info-text--hide"
                }
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
              <p
                className={
                  editDateBool === false
                    ? "battle-dash__info-text"
                    : "battle-dash__info-text--hide"
                }
                onClick={() => {
                  setEditDateBool(true);
                }}
              >
                {dateValue}
              </p>
            </div>
          </article>{" "}
          <article className="battle-dash__info-container battle-dash__info-container--date">
            <h2 className="battle-dash__subheader">Start</h2>{" "}
            <div className="battle-dash__info">
              <div
                className={
                  editStartBool === true
                    ? "battle-dash__date-wrap"
                    : "battle-dash__info-text--hide"
                }
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
              <p
                className={
                  editStartBool === false
                    ? "battle-dash__info-text"
                    : "battle-dash__info-text--hide"
                }
                onClick={() => {
                  setEditStartBool(true);
                }}
              >
                {startValue.format("HH:mm")}
              </p>
            </div>
          </article>{" "}
          <article className="battle-dash__info-container battle-dash__info-container--date">
            <h2 className="battle-dash__subheader">Finish</h2>{" "}
            <div className="battle-dash__info">
              <div
                className={
                  editFinishBool === true
                    ? "battle-dash__date-wrap"
                    : "battle-dash__info-text--hide"
                }
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
              <p
                className={
                  editFinishBool === false
                    ? "battle-dash__info-text"
                    : "battle-dash__info-text--hide"
                }
                onClick={() => {
                  setEditFinishBool(true);
                }}
              >
                {finishValue.format("HH:mm")}
              </p>
            </div>
          </article>
        </div>
      </LocalizationProvider>
    </section>
  );
}
