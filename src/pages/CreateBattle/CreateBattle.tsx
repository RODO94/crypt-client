import { useState } from "react";
import "./CreateBattle.scss";
import dayjs, { Dayjs } from "dayjs";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { Player } from "../../utils/Interfaces";
import { createBattleRequest } from "../../utils/BattleRequests";
import { CircularProgress } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Header from "../../components/Header/Header";
import { useFormik } from "formik";
import CreateBattleForm from "../../components/CreateBattleForm/CreateBattleForm";
import CreateBattleCombatants from "../../components/CreateBattleCombatants/CreateBattleCombatants";
import { battleFormValidationSchema } from "./CreateBattleValidSchema";
import { redirect, useNavigate } from "react-router-dom";
export interface BattleInformation {
  battleType: "40k" | "fantasy";
  pointSize: number;
  scenario?: string;
  date: Dayjs;
  table: "Table 1" | "Table 2" | "Table 3";
  start: string | Dayjs;
  finish: string | Dayjs;
  playerOne: Player[] | [];
  playerTwo: Player[] | [];
}

const initialBattleValues: BattleInformation = {
  battleType: "40k",
  pointSize: 0,
  scenario: "",
  date: dayjs(),
  table: "Table 1",
  start: dayjs(),
  finish: "",
  playerOne: [],
  playerTwo: [],
};

export default function CreateBattle() {
  const formik = useFormik({
    initialValues: initialBattleValues,
    onSubmit: (values) => {
      formik.validateForm(values);
      if (!formik.isValid) {
        console.log(formik.isValid);
      }
      createBattle();
    },
    validationSchema: battleFormValidationSchema,
    validateOnBlur: true,
    validateOnMount: false,
    validateOnChange: false,
  });

  const [successBool, setSuccessBool] = useState(false);
  const [loadingBool, setLoadingBool] = useState(false);

  const navigate = useNavigate();

  const userToken = sessionStorage.getItem("token");
  if (!userToken) {
    return redirect("/login");
  }

  const createBattle = async () => {
    await formik.validateForm();

    let playerType = "single";
    if (
      formik.values.playerOne.length > 1 ||
      formik.values.playerTwo.length > 1
    ) {
      playerType = "multi";
    }

    const formattedPlayerOne = formik.values.playerOne.map((player) => {
      return {
        army_id: player.army_id,
      };
    });
    const formattedPlayerTwo = formik.values.playerTwo.map((player) => {
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
      console.log(response);
      if (response) {
        setLoadingBool(false);
        setSuccessBool(true);
        setTimeout(() => {
          console.log("inside timeout");
          navigate(`/battles/information/${response}`);
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

  console.log(formik.errors);

  return (
    <main className="create-battle">
      <Header />{" "}
      <section className="create-battle__section">
        <h2 className="create-battle__header">Create New Battle</h2>
        <div
          onClick={() => {
            redirect("/user");
          }}
          className="create-battle__back-arrow"
        >
          <ArrowLeftIcon />{" "}
          <p className="create-battle__back-arrow-txt">Go Back</p>
        </div>
        <form className="create-battle__form" onSubmit={formik.handleSubmit}>
          <CreateBattleForm formik={formik} />
          <CreateBattleCombatants formik={formik} />
          {!successBool && !loadingBool ? (
            <button type="submit" className="create-battle__create">
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
