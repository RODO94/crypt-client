import { FormikProps } from "formik";
import { BattleInformation } from "./CreateBattle";
import React from "react";
import { SelectedPlayer } from "../../components/CreateBattleCombatants/CreateBattleCombatants";

export type OnClickEventType = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type Formik = FormikProps<BattleInformation>;

export const removePlayer = (
  event: OnClickEventType,
  targetID: string,
  player: number,
  formik: FormikProps<BattleInformation>
) => {
  event.preventDefault();
  const { playerOne, playerTwo } = formik.values;
  if (player === 1) {
    const newArmyArray = playerOne.filter((army) => army.army_id !== targetID);
    formik.setFieldValue("playerOne", newArmyArray);
  } else if (player === 2) {
    const newArmyArray = playerTwo.filter((army) => army.army_id !== targetID);
    formik.setFieldValue("playerTwo", newArmyArray);
  }
};

export const addArmy = (
  selectedPlayer: SelectedPlayer,
  playerNumber: number,
  formik: Formik
) => {
  if (playerNumber === 1) {
    const { user: selectedUser, army: selectedArmy } = selectedPlayer;
    const newArray = [
      ...formik.values.playerOne,
      {
        id: selectedUser?.id,
        known_as: selectedUser?.known_as,
        name: selectedArmy?.name,
        army_id: selectedArmy?.id,
        emblem: selectedArmy?.emblem,
      },
    ];
    formik.setFieldValue("playerOne", newArray);
    return;
  } else if (playerNumber === 2) {
    const { user: selectedUser, army: selectedArmy } = selectedPlayer;
    const newArray = [
      ...formik.values.playerTwo,
      {
        id: selectedUser?.id,
        known_as: selectedUser?.known_as,
        name: selectedArmy?.name,
        army_id: selectedArmy?.id,
        emblem: selectedArmy?.emblem,
      },
    ];
    formik.setFieldValue("playerTwo", newArray);
    return;
  }
};
