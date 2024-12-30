import { FormikProps } from "formik";
import { addArmy, removePlayer } from "../../pages/CreateBattle/utils";
import { Armies, Player, Users } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";
import "./CreateBattleCombatants.scss";
import { BattleInformation } from "../../pages/CreateBattle/CreateBattle";
import { useEffect, useState } from "react";
import { getAllArmies } from "../../utils/ArmyRequests";
import { getAllUsers } from "../../utils/UserRequests";
import { filterArrays } from "../../pages/CreateBattle/filterFunctions";
import { CircularProgress } from "@mui/material";

interface Props {
  formik: FormikProps<BattleInformation>;
}

export type SelectedPlayer = {
  user?: Users;
  army?: Armies;
};
export default function CreateBattleCombatants({ formik }: Props) {
  const [armyArray, setArmyArray] = useState<Armies[]>([]);
  const [userArray, setUserArray] = useState<Users[]>([]);
  const [filteredArmyArray, setFilteredArmyArray] = useState<Armies[]>([]);
  const [filteredUserArray, setFilteredUserArray] = useState<Users[]>([]);
  const [selectedPlayerOne, setSelectedPlayerOne] = useState<SelectedPlayer>();
  const [selectedPlayerTwo, setSelectedPlayerTwo] = useState<SelectedPlayer>();

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
    filterArrays(
      userArray,
      armyArray,
      setFilteredArmyArray,
      setFilteredUserArray,
      formik
    );
  }, [
    formik.values.battleType,
    armyArray,
    userArray,
    formik,
    formik.values.playerOne,
    formik.values.playerTwo,
  ]);

  if (!armyArray || !userArray) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "green" }} />
      </div>
    );
  }

  console.log(formik.values.playerOne);
  console.log(formik.values.playerTwo);

  return (
    <div className="create-battle__form-combatants">
      <div id="1" className="create-battle__combatant">
        <div className="create-battle__combatant-container">
          <label className="create-battle__label" htmlFor="users_1">
            Player / Team 1
          </label>
          {formik.values.playerOne.map((player: Player) => (
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
                onClick={(event) => {
                  const { parentElement } = event.currentTarget;
                  const targetID: string = parentElement
                    ? parentElement.children[0].id
                    : "";
                  event && removePlayer(event, targetID, 1, formik);
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
                !formik.errors.playerOne
                  ? "create-battle__select"
                  : "create-battle__select create-battle__select--error"
              }
              id="users_1"
              value={selectedPlayerOne?.user?.id}
              onChange={(event) => {
                const userId = event.target.value;
                const user = userArray.find((user) => user.id === userId);
                setSelectedPlayerOne({ ...selectedPlayerOne, user: user });
              }}
            >
              <option hidden>Select User </option>
              {filteredUserArray?.map((user) => {
                return (
                  <option key={crypto.randomUUID()} value={`${user.id}`}>
                    {user.known_as}
                  </option>
                );
              })}
            </select>
            <select
              name="army_1"
              className={
                !formik.errors.playerOne
                  ? "create-battle__select"
                  : "create-battle__select create-battle__select--error"
              }
              id="army_1"
              value={selectedPlayerOne?.army?.id}
              disabled={!selectedPlayerOne?.user ? true : false}
              onChange={(event) => {
                const armyId = event.target.value;
                const army = armyArray.find((army) => army.id === armyId);
                setSelectedPlayerOne({ ...selectedPlayerOne, army: army });
              }}
            >
              <option hidden> Select Army </option>

              {armyArray.length === 0 ? (
                <option>No Armies for this User</option>
              ) : (
                filteredArmyArray?.map((army) => {
                  if (army.user_id === selectedPlayerOne?.user?.id) {
                    return (
                      <option key={crypto.randomUUID()} value={`${army.id}`}>
                        {army.name}
                      </option>
                    );
                  }
                })
              )}
            </select>

            <button
              className={
                selectedPlayerOne?.army
                  ? "create-battle__add"
                  : "create-battle__add--disabled"
              }
              onClick={(event) => {
                event?.preventDefault();

                selectedPlayerOne && addArmy(selectedPlayerOne, 1, formik);
                setSelectedPlayerOne(undefined);
              }}
              disabled={
                selectedPlayerOne?.army && selectedPlayerOne.user ? false : true
              }
            >
              + Add Army
            </button>
            <p
              className={
                !formik.errors.playerOne
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
          {formik.values.playerTwo.map((player) => (
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
                onClick={(event) => {
                  const targetID =
                    event.currentTarget.parentElement?.children[0].id;
                  targetID && removePlayer(event, targetID, 2, formik);
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
                !formik.errors.playerTwo
                  ? "create-battle__select"
                  : "create-battle__select create-battle__select--error"
              }
              value={selectedPlayerTwo?.user?.id}
              onChange={(event) => {
                const userId = event.target.value;
                const user = userArray.find((user) => user.id === userId);
                setSelectedPlayerTwo({ ...selectedPlayerTwo, user: user });
              }}
            >
              {" "}
              <option hidden>Select User</option>
              {filteredUserArray?.map((user) => (
                <option key={crypto.randomUUID()} value={`${user.id}`}>
                  {user.known_as}
                </option>
              ))}
            </select>
            <select
              name="army_2"
              id="army_2"
              disabled={!selectedPlayerTwo?.user ? true : false}
              className={
                !formik.errors.playerTwo
                  ? "create-battle__select"
                  : "create-battle__select create-battle__select--error"
              }
              value={selectedPlayerTwo?.army?.id}
              onChange={(event) => {
                const armyId = event.target.value;
                const army = armyArray.find((army) => army.id === armyId);
                setSelectedPlayerTwo({ ...selectedPlayerTwo, army: army });
              }}
            >
              <option hidden> Select Army</option>
              {filteredArmyArray?.map((army) => {
                if (army.user_id === selectedPlayerTwo?.user?.id) {
                  return (
                    <option key={crypto.randomUUID()} value={`${army.id}`}>
                      {army.name}
                    </option>
                  );
                }
              })}
            </select>
            <button
              className={
                selectedPlayerTwo?.army
                  ? "create-battle__add"
                  : "create-battle__add--disabled"
              }
              onClick={(event) => {
                event.preventDefault();
                selectedPlayerTwo && addArmy(selectedPlayerTwo, 2, formik);
                setSelectedPlayerTwo(undefined);
              }}
              disabled={
                selectedPlayerTwo?.army && selectedPlayerTwo.user ? false : true
              }
            >
              + Add Army
            </button>
            <p
              className={
                !formik.errors.playerTwo
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
  );
}
