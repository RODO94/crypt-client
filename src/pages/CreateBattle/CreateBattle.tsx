import { useEffect, useState } from "react";
import "./CreateBattle.scss";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ArrowLeftIcon,
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { getAllArmies } from "../../utils/ArmyRequests";
import { Armies, Player, Users } from "../../utils/Interfaces";
import { getAllUsers } from "../../utils/UserRequests";
import BattleCard from "../../components/BattleCard/BattleCard";
import { createBattleRequest } from "../../utils/BattleRequests";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Header from "../../components/Header/Header";

interface UsersArray extends Array<Users> {}
interface ArmiesArray extends Array<Armies> {}

export default function CreateBattle() {
  const [battleType, setBattleType] = useState<string>("40k");
  const [pointSize, setPointSize] = useState<string | number>(0);
  const [scenario, setScenario] = useState<string>("");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [table, setTable] = useState<string>("Table 0");
  const [start, setStart] = useState(dayjs());
  const [finish, setFinish] = useState<string>("");

  const [pointSizeError, setPointSizeError] = useState(false);
  const [playerOneError, setPlayerOneError] = useState(false);
  const [playerTwoError, setPlayerTwoError] = useState(false);

  const [armyArray, setArmyArray] = useState<ArmiesArray>();
  const [userArray, setUserArray] = useState<UsersArray>();
  const [filteredArmyArray, setFilteredArmyArray] = useState<ArmiesArray>();
  const [filteredUserArray, setFilteredUserArray] = useState<UsersArray>();
  const [playerOne, setPlayerOne] = useState<Player[]>([]);
  const [playerTwo, setPlayerTwo] = useState<Player[]>([]);
  const [userOneFilter, setUserOneFilter] = useState("");
  const [userTwoFilter, setUserTwoFilter] = useState("");
  const [userOne, setUserOne] = useState("");
  const [userTwo, setUserTwo] = useState("");
  const [armyOne, setArmyOne] = useState("");
  const [armyTwo, setArmyTwo] = useState("");

  const [successBool, setSuccessBool] = useState(false);
  const [loadingBool, setLoadingBool] = useState(false);

  const navigate = useNavigate();

  const userToken = sessionStorage.getItem("token");
  if (!userToken) {
    navigate("/login");
    return <h1>You need to log in</h1>;
  }

  useEffect(() => {
    const fetchArmies = async () => {
      console.log(armyArray);
      if (!armyArray) {
        const response = await getAllArmies();
        console.log({ armyResponse: response });
        if (!response) {
          const response = await getAllArmies();
          setArmyArray(response);
        }
        setArmyArray(response);
        console.log("army request");
        const filteredResponse = response.filter(
          (army: any) => army.type === battleType
        );
        return setFilteredArmyArray(filteredResponse);
      }
      if (armyArray) {
        const filteredResponse = armyArray.filter(
          (army: any) => army.type === battleType
        );

        console.log({
          armyArray: armyArray,
          filteredResponse: filteredResponse,
        });

        setArmyOne(filteredResponse[0].name);
        setArmyTwo(filteredResponse[0].name);
        return setFilteredArmyArray(filteredResponse);
      }
    };
    fetchArmies();
    console.log("run fetch armies");
  }, [battleType]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userArray) {
        const response = await getAllUsers();
        console.log("server request");
        setUserOneFilter(response[0].id);
        setUserTwoFilter(response[0].id);

        setUserOne(response[0].id);
        setUserTwo(response[0].id);
        setUserArray(response);
      }

      if (filteredArmyArray && userArray) {
        // Battle Type User Filter
        const filteredResponse = userArray.filter((user: Player) => {
          const army = filteredArmyArray.find(
            (army) => army.user_id === user.id
          );
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

        return setFilteredUserArray(secondFilteredResponse);
      }
    };

    fetchUsers();
    console.log("run fetch users");
  }, [playerOne, playerTwo, filteredArmyArray]);

  const removePlayer = (event: any, targetID: string, player: number) => {
    event.preventDefault();
    if (player === 1) {
      let newArmyArray = playerOne.filter((army) => army.army_id !== targetID);
      setPlayerOne(newArmyArray);
    } else if (player === 2) {
      let newArmyArray = playerTwo.filter((army) => army.army_id !== targetID);
      setPlayerTwo(newArmyArray);
    }
  };
  const addArmy = (event: any, player: number) => {
    let userID = "1";
    let userName = "";
    let armyName = "Necrons";
    let armyID = "";

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
      return setPlayerOne(newArray);
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
      return setPlayerTwo(newArray);
    }
  };

  const createBattle = async () => {
    let playerType = "single";
    let playerOneErr = null;
    let playerTwoErr = null;
    let pointSizeErr = null;
    if (playerOne.length > 1 || playerTwo.length > 1) {
      playerType = "multi";
    }
    if (playerOne.length < 1) {
      playerOneErr = true;
    }
    if (playerTwo.length < 1) {
      playerTwoErr = true;
    }

    if (!pointSize) {
      pointSizeErr = true;
    }

    if (playerOneErr) {
      setPlayerOneError(true);
    }
    if (playerTwoErr) {
      setPlayerTwoError(true);
    }
    if (pointSizeErr) {
      setPointSizeError(true);
    }

    if (playerOneErr || playerTwoErr || pointSizeErr) {
      return;
    }

    const formattedPlayerOne = playerOne.map((player) => {
      return {
        army_id: player.army_id,
      };
    });
    const formattedPlayerTwo = playerTwo.map((player) => {
      return {
        army_id: player.army_id,
      };
    });

    const requestBody = {
      battle_type: battleType,
      player_type: playerType,
      points_size: pointSize,
      scenario: scenario,
      player_1: formattedPlayerOne,
      player_2: formattedPlayerTwo,
      date: dayjs(date).format("YYYY-MM-DD"),
      start: dayjs(start).format("HH:mm:ss"),
      finish: !finish
        ? dayjs(start).format("HH:mm:ss")
        : dayjs(finish).format("HH:mm:ss"),
      table: table,
    };

    try {
      setLoadingBool(true);
      const response = await createBattleRequest(userToken, requestBody);

      if (response) {
        setLoadingBool(false);
        setSuccessBool(true);
        setTimeout(() => {
          navigate(`/battles/information`, { state: { id: response } });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      return (
        <main className="create-battle">
          <section className="create-battle_section">
            <p className="error-message">
              Unable to create battle, please refresh and try again
            </p>
          </section>
        </main>
      );
    }
  };

  console.log(userOneFilter);
  if (
    !armyArray ||
    !userArray ||
    !filteredArmyArray ||
    !filteredUserArray ||
    !userOneFilter ||
    !userTwoFilter ||
    !playerOne ||
    !playerTwo
  ) {
    return (
      <main className="create-battle">
        <section className="create-battle_section">
          <p className="error-message">Content is loading... please wait</p>
        </section>
      </main>
    );
  }

  return (
    <main className="create-battle">
      <Header />{" "}
      <section className="create-battle__section">
        <h2 className="create-battle__header">Create New Battle</h2>
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="create-battle__back-arrow"
        >
          <ArrowLeftIcon />
        </div>
        <form className="create-battle__form">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="create-battle__battletype">
              <div id="battletype" className="create-battle__select-wrap">
                <label htmlFor="battletype" className="create-battle__label">
                  {" "}
                  Battle Type*
                </label>
                <select
                  name="battletype"
                  onChange={(event) => {
                    setBattleType(event.target.value);
                  }}
                  className="create-battle__select"
                >
                  <option hidden value={battleType}>
                    {battleType}
                  </option>
                  <option value="fantasy">Fantasy</option>
                  <option value="40k">40k</option>
                </select>
              </div>
            </div>
            <div className="create-battle__pointsize">
              <label htmlFor="pointsize" className="create-battle__label">
                Point Size*
                <input
                  type="number"
                  className={
                    pointSizeError
                      ? "create-battle__input create-battle__input--error"
                      : "create-battle__input"
                  }
                  name="pointsize"
                  value={pointSize}
                  onChange={(event) => {
                    pointSizeError ? setPointSizeError(false) : pointSizeError;
                    setPointSize(event.target.value);
                  }}
                />
                <p
                  className={
                    pointSizeError
                      ? "create-battle__error"
                      : "create-battle__error--hide"
                  }
                >
                  Please add a point size
                </p>
              </label>
            </div>
            <div className="create-battle__scenario">
              <label htmlFor="scenario" className="create-battle__label">
                Scenario
                <input
                  type="text"
                  className="create-battle__input"
                  name="scenario"
                  value={scenario}
                  onChange={(event) => {
                    setScenario(event.target.value);
                  }}
                />
              </label>
            </div>
            <div className="create-battle__date">
              <label
                htmlFor="date"
                className="create-battle__label create-battle__label--date"
              >
                Date*
                <DatePicker
                  name="date"
                  value={date}
                  onChange={(newValue: any) => {
                    setDate(newValue);
                  }}
                />
              </label>
              <label
                htmlFor="date"
                className="create-battle__label create-battle__label--date"
              >
                Table
                <select
                  value={table}
                  name="table"
                  className="create-battle__select"
                  onChange={(event) => {
                    setTable(event.target.value);
                  }}
                >
                  <option hidden>{table}</option>
                  <option value="Table 1">Table 1</option>
                  <option value="Table 2">Table 2</option>
                  <option value="Table 3">Table 3</option>
                </select>
              </label>
              <label
                htmlFor="start"
                className="create-battle__label create-battle__label--date"
              >
                Start
                <TimePicker
                  name="start
                "
                  ampm={false}
                  value={start}
                  onChange={(newValue: any) => {
                    setStart(newValue);
                  }}
                />
              </label>
              <label
                htmlFor="finish"
                className="create-battle__label create-battle__label--date"
              >
                Finish
                <TimePicker
                  name="finish"
                  ampm={false}
                  value={finish}
                  minTime={start}
                  onChange={(newValue: any) => {
                    setFinish(newValue);
                  }}
                />
              </label>
            </div>
            <div id="1" className="create-battle__combatant">
              <div className="create-battle__combatant-container">
                <label className="create-battle__label" htmlFor="users_1">
                  Player / Team 1
                </label>
                {playerOne.map((player) => (
                  <article
                    key={crypto.randomUUID()}
                    className="create-battle__combatant-card"
                  >
                    <BattleCard
                      key={crypto.randomUUID()}
                      army_id={player.army_id}
                      name={player.name}
                      known_as={player.known_as}
                      ranking={player.ranking}
                    />
                    <button
                      key={crypto.randomUUID()}
                      className="create-battle__remove"
                      onClick={(event: any) => {
                        const targetID =
                          event.target.parentElement.children[0].id;
                        removePlayer(event, targetID, 1);
                      }}
                    >
                      Remove
                    </button>
                  </article>
                ))}{" "}
                <div className="create-battle__combatant-edit-row">
                  <select
                    name="users_1"
                    className={
                      !playerOneError
                        ? "create-battle__select"
                        : "create-battle__select create-battle__select--error"
                    }
                    id="users_1"
                    value={userOne}
                    onChange={(event) => {
                      playerOneError
                        ? setPlayerOneError(false)
                        : playerOneError;
                      setUserOneFilter(event.target.value.split("+")[0]);
                      setUserOne(event.target.value);
                    }}
                  >
                    <option hidden>Select User </option>
                    {filteredUserArray.map((user) => {
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
                    className={
                      !playerOneError
                        ? "create-battle__select"
                        : "create-battle__select create-battle__select--error"
                    }
                    id="army_1"
                    value={armyOne}
                    onChange={(event) => {
                      playerOneError
                        ? setPlayerOneError(false)
                        : playerOneError;
                      setArmyOne(event.target.value);
                    }}
                  >
                    <option hidden> Select Army </option>

                    {armyArray.length === 0 ? (
                      <option>No Armies for this User</option>
                    ) : (
                      filteredArmyArray.map((army) => {
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
                    className="create-battle__add"
                    onClick={(event) => {
                      event?.preventDefault();
                      playerOneError
                        ? setPlayerOneError(false)
                        : playerOneError;
                      addArmy(event, 1);
                    }}
                  >
                    +
                  </button>
                  <p
                    className={
                      !playerOneError
                        ? "create-battle__error--hide"
                        : "create-battle__error"
                    }
                  >
                    Please add Player 1
                  </p>
                </div>{" "}
              </div>
            </div>
            <div id="2" className="create-battle__combatant">
              <div className="create-battle__combatant-container">
                <label className="create-battle__label" htmlFor="users_1">
                  Player / Team 2
                </label>
                {playerTwo.map((player) => (
                  <article
                    key={crypto.randomUUID()}
                    className="create-battle__combatant-card"
                  >
                    <BattleCard
                      key={player.army_id}
                      army_id={player.army_id}
                      name={player.name}
                      known_as={player.known_as}
                      ranking={player.ranking}
                    />
                    <button
                      key={crypto.randomUUID()}
                      className="create-battle__remove"
                      onClick={(event: any) => {
                        const targetID =
                          event.target.parentElement.children[0].id;
                        removePlayer(event, targetID, 2);
                      }}
                    >
                      Remove
                    </button>
                  </article>
                ))}{" "}
                <div className="create-battle__combatant-edit-row">
                  <select
                    name="users_2"
                    id="users_2"
                    className={
                      !playerTwoError
                        ? "create-battle__select"
                        : "create-battle__select create-battle__select--error"
                    }
                    value={userTwo}
                    onChange={(event) => {
                      playerTwoError
                        ? setPlayerTwoError(false)
                        : playerTwoError;
                      setUserTwoFilter(event.target.value.split("+")[0]);

                      setUserTwo(event.target.value);
                    }}
                  >
                    {" "}
                    <option hidden>Select User</option>
                    {filteredUserArray.map((user) => (
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
                    className={
                      !playerTwoError
                        ? "create-battle__select"
                        : "create-battle__select create-battle__select--error"
                    }
                    value={armyTwo}
                    onChange={(event) => {
                      playerTwoError
                        ? setPlayerTwoError(false)
                        : playerTwoError;
                      setArmyTwo(event.target.value);
                    }}
                  >
                    <option hidden> Select Army</option>
                    {filteredArmyArray.map((army) => {
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
                    className="create-battle__add"
                    onClick={(event) => {
                      event.preventDefault();
                      playerTwoError
                        ? setPlayerTwoError(false)
                        : playerTwoError;
                      addArmy(event, 2);
                    }}
                  >
                    +
                  </button>
                  <p
                    className={
                      !playerTwoError
                        ? "create-battle__error--hide"
                        : "create-battle__error"
                    }
                  >
                    Please add Player 2
                  </p>
                </div>
              </div>
            </div>
          </LocalizationProvider>
          {!successBool && !loadingBool ? (
            <button
              onClick={(event) => {
                event.preventDefault();
                createBattle();
              }}
              className="create-battle__create"
            >
              Create
            </button>
          ) : loadingBool && !successBool ? (
            <div className="create-battle__success-message">
              <CircularProgress />
            </div>
          ) : (
            <div className="create-battle__success-message">
              <span>Battle Created!</span> <DoneIcon />
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
