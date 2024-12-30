import { ReactEventHandler, useEffect, useState } from "react";
import "./CreateBattle.scss";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ArrowLeftIcon,
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
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
import { useFormik } from "formik";
import CreateBattleForm from "../../components/CreateBattleForm/CreateBattleForm";

interface UsersArray extends Array<Users> {}
interface ArmiesArray extends Array<Armies> {}
interface BattleInformation {
  battleType: "40k" | "fantasy";
  pointSize: number;
  scenario?: string;
  date: Dayjs;
  table: "Table 0" | "Table 1" | "Table 2";
  start: string | Dayjs;
  finish: string | Dayjs;
  playerOne?: Player[];
  playerTwo?: Player[];
}

const initialBattleValues: BattleInformation = {
  battleType: "40k",
  pointSize: 0,
  date: dayjs(),
  table: "Table 0",
  start: dayjs(),
  finish: "",
};

export default function CreateBattle() {
  const formik = useFormik({
    initialValues: initialBattleValues,
    onSubmit: () => {},
  });

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
    const fetchData = async () => {
      const armyResponse = await getAllArmies(3);
      const userResponse = await getAllUsers(3);

      setArmyArray(armyResponse);
      setUserArray(userResponse);
      setFilteredArmyArray(armyResponse);
      setFilteredUserArray(userResponse);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredArmyArray = armyArray?.filter(
      (army) => army.type === formik.values.battleType
    );

    setFilteredArmyArray(filteredArmyArray);

    // Filter the user list based on if a user has an army in the army array
    const filteredResponse = userArray?.filter((user: Player) => {
      const army = filteredArmyArray?.find((army) => army.user_id === user.id);
      return army;
    });

    // Filter the user list based on current players
    const secondFilteredResponse = filteredResponse?.filter((user: Player) => {
      const userOneBool = playerOne.find((player) => player.id === user.id);
      const userTwoBool = playerTwo.find((player) => player.id === user.id);

      if (userOneBool || userTwoBool) {
        return false;
      } else {
        return true;
      }
    });

    setFilteredUserArray(secondFilteredResponse);
  }, [
    formik.values.battleType,
    armyArray,
    playerOne,
    playerTwo,
    userOne,
    userTwo,
    armyOne,
    armyTwo,
  ]);

  const removePlayer = (event: any, targetID: string, player: number) => {
    event.preventDefault();
    if (player === 1) {
      const newArmyArray = playerOne.filter(
        (army) => army.army_id !== targetID
      );
      setPlayerOne(newArmyArray);
    } else if (player === 2) {
      const newArmyArray = playerTwo.filter(
        (army) => army.army_id !== targetID
      );
      setPlayerTwo(newArmyArray);
    }
  };
  const addArmy = (event, player: number) => {
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
      const armyObj = armyArray?.find((army) => army.id === armyID);
      const newArray = [
        ...playerOne,
        {
          id: userID,
          known_as: userName,
          name: armyName,
          army_id: armyID,
          emblem: armyObj?.emblem,
        },
      ];
      setPlayerOne(newArray);
      setArmyOne("");
      return setUserOne("");
    } else if (player === 2) {
      userID = event.target.parentElement.children.users_2.value.split("+")[0];
      userName =
        event.target.parentElement.children.users_2.value.split("+")[1];
      armyName = event.target.parentElement.children.army_2.value.split("+")[1];
      armyID = event.target.parentElement.children.army_2.value.split("+")[0];
      const armyObj = armyArray?.find((army) => army.id === armyID);

      const newArray = [
        ...playerTwo,
        {
          id: userID,
          known_as: userName,
          name: armyName,
          army_id: armyID,
          emblem: armyObj?.emblem,
        },
      ];
      setPlayerTwo(newArray);
      setArmyTwo("");
      return setUserTwo("");
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

    if (!formik.values.pointSize) {
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
      battle_type: formik.values.battleType,
      player_type: playerType,
      points_size: formik.values.pointSize,
      scenario: formik.values.scenario,
      player_1: formattedPlayerOne,
      player_2: formattedPlayerTwo,
      date: dayjs(formik.values.date).format("YYYY-MM-DD"),
      start: dayjs(formik.values.start).format("HH:mm:ss"),
      finish: !formik.values.finish
        ? dayjs(formik.values.start).format("HH:mm:ss")
        : dayjs(formik.values.finish).format("HH:mm:ss"),
      table: formik.values.table,
    };

    try {
      setLoadingBool(true);
      const response = await createBattleRequest(userToken, requestBody, 5);

      if (response) {
        setLoadingBool(false);
        setSuccessBool(true);
        setTimeout(() => {
          navigate(`/battles/information`, { state: { id: response } });
        }, 1000);
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

  if (!armyArray || !userArray) {
    return (
      <main className="create-battle">
        <section className="create-battle_section">
          <div className="loading-message">
            <CircularProgress style={{ color: "green" }} />
          </div>
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
            navigate("/user");
          }}
          className="create-battle__back-arrow"
        >
          <ArrowLeftIcon />{" "}
          <p className="create-battle__back-arrow-txt">Go Back</p>
        </div>
        <form className="create-battle__form">
          <CreateBattleForm formik={formik} />
          <div className="create-battle__form-combatants">
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
                      emblem={player.emblem}
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
                    {filteredUserArray?.map((user) => {
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
                    disabled={!userOne ? true : false}
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
                      filteredArmyArray?.map((army) => {
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
                    className={
                      armyOne
                        ? "create-battle__add"
                        : "create-battle__add--disabled"
                    }
                    onClick={(event) => {
                      event?.preventDefault();
                      playerOneError
                        ? setPlayerOneError(false)
                        : playerOneError;
                      addArmy(event, 1);
                    }}
                    disabled={armyOne ? false : true}
                  >
                    + Add Army
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
                      emblem={player.emblem}
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
                    {filteredUserArray?.map((user) => (
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
                    disabled={!userTwo ? true : false}
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
                    {filteredArmyArray?.map((army) => {
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
                    className={
                      armyTwo
                        ? "create-battle__add"
                        : "create-battle__add--disabled"
                    }
                    onClick={(event) => {
                      event.preventDefault();
                      playerTwoError
                        ? setPlayerTwoError(false)
                        : playerTwoError;
                      addArmy(event, 2);
                    }}
                    disabled={armyTwo ? false : true}
                  >
                    + Add Army
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
          </div>
          {!successBool && !loadingBool ? (
            <button
              onClick={(event) => {
                event.preventDefault();
                createBattle();
              }}
              className="create-battle__create"
            >
              Create Battle
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
