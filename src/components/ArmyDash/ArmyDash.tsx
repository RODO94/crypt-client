import { ChangeEvent, useEffect, useState } from "react";
import { Users, UsersObj } from "../../utils/Interfaces";
import "./ArmyDash.scss";
import EmblemHero from "../EmblemHero/EmblemHero";
import BattleCard from "../BattleCard/BattleCard";
import logo from "../../assets/logo.svg";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { emblemNameArray } from "../../utils/EmblemNames";
import Emblem from "../Emblem/Emblem";
import { changeArmyField } from "../../utils/ArmyRequests";
import { getAllUsers, getUserWithToken } from "../../utils/UserRequests";
import { useUserStore } from "../../store/user";
import { ArmyInformation } from "../../pages/ArmyInfo/ArmyInfo";
interface armyDashObj {
  winPercent: string;
  battleCount: number;
  armyObj: ArmyInformation;
  armyRank: number;
}

type UserSelect = Pick<Users, "known_as" | "id">;
interface EmblemNameObj {
  lowercase: string;
  original: string;
}

export default function ArmyDash({
  winPercent,
  battleCount,
  armyObj,
  armyRank,
}: armyDashObj) {
  const [emblemName, setEmblemName] = useState(armyObj.emblem);
  const [userArray, setUserArray] = useState<UsersObj[]>();
  const [selectedUser, setSelectedUser] = useState<UserSelect>({
    known_as: armyObj.known_as,
    id: armyObj.id,
  });
  const [userBool, setUserBool] = useState(false);
  const [editBool, setEditBool] = useState(false);
  const [newName, setNewName] = useState<string>(armyObj.name);
  const [newType, setNewType] = useState(armyObj.type);
  const [newEmblem, setNewEmblem] = useState<string>(armyObj.emblem);
  const [emblemArray, setEmblemArray] = useState<null | EmblemNameObj[]>(null);
  const [successBool, setSuccessBool] = useState({
    name: false,
    type: false,
    emblem: false,
    user: false,
  });

  const navigate = useNavigate();

  const userToken = sessionStorage.getItem("token");
  const { userRole } = useUserStore();
  const isAdmin = userRole === "admin";
  const canEdit = isAdmin || userBool;

  useEffect(() => {
    if (!emblemName) {
      return;
    }
    const stringArray = emblemName.toLowerCase().split(" ").join("");
    setEmblemName(stringArray);
    setNewEmblem(stringArray);
  }, [emblemName]);

  useEffect(() => {
    const formatEmblemArray = () => {
      const filteredArray =
        newType === "40k"
          ? emblemNameArray[0].fortyk
          : emblemNameArray[0].fantasy;
      const formattedArray = filteredArray.map((emblem) => {
        let newString = [];
        const splitString = emblem.split(" ");
        for (let i = 0; i < splitString.length; i++) {
          let lowerCaseString = splitString[i].toLowerCase();
          newString.push(lowerCaseString);
        }
        return { lowercase: newString.join(""), original: emblem };
      });
      const sortedArray = formattedArray.sort((a, b) =>
        a.lowercase.localeCompare(b.lowercase)
      );

      setEmblemArray(sortedArray);
    };
    formatEmblemArray();
  }, [newType]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userToken) {
        const response = await getUserWithToken(userToken);
        response.id === armyObj.user_id
          ? setUserBool(true)
          : setUserBool(false);
      }
    };
    const fetchUsers = async () => {
      const userResponse = await getAllUsers(3);
      userResponse && setUserArray(userResponse);
      const armyUser = userResponse.find(
        (user: UsersObj) => user.id === armyObj.user_id
      );
      setSelectedUser(armyUser);
    };
    fetchUsers();
    fetchUserData();
  }, [userToken, armyObj.user_id]);

  if (!armyObj) {
    return (
      <section className="army-dash">
        <div className="loading-message">
          <CircularProgress style={{ color: "white" }} />
        </div>
      </section>
    );
  }

  const handleChange = async (changeType: string, changeValue: string) => {
    const { id } = armyObj;
    if (userToken && id) {
      await changeArmyField(changeValue, changeType, id, userToken);

      switch (changeType) {
        case "name":
          setSuccessBool({ ...successBool, name: true });
          break;
        case "type":
          setSuccessBool({ ...successBool, type: true });
          break;
        case "user":
          console.log("set success");
          setSuccessBool({ ...successBool, user: true });
          break;
        case "emblem":
          setSuccessBool({ ...successBool, emblem: true });
      }
    }
    return;
  };

  return (
    <section className="army-dash">
      <EmblemHero emblem={newEmblem} />
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="army-dash__back-arrow"
      >
        <ArrowLeftIcon /> Back
      </div>
      <div className="army-dash__header">
        <h2 className="army-dash__title">Army Information</h2>
        <img className="army-dash__logo" src={logo} alt="the crypt emblem" />
      </div>
      {canEdit && (
        <button
          onClick={() => {
            editBool ? setEditBool(false) : setEditBool(true);
          }}
          className="army-dash__update-button army-dash__update-button--edit"
        >
          {editBool ? "Finish Edit" : "Edit Army"}
        </button>
      )}
      {editBool && canEdit ? (
        <section className="army-dash__edit-form">
          <article className="army-dash__stat-wrap">
            <label className="army-dash__label">Army Name</label>
            <input
              name="name"
              className="army-dash__stat"
              value={newName}
              type="text"
              onChange={(event) => {
                setSuccessBool({
                  name: false,
                  type: false,
                  emblem: false,
                  user: false,
                });
                setNewName(event.target.value);
              }}
            />
            <button
              onClick={() => {
                handleChange("name", newName);
              }}
              className="army-dash__update-button"
            >
              {!successBool.name
                ? "Update Name"
                : successBool.name
                ? "Success!"
                : "Update Name"}{" "}
            </button>
          </article>
          <article className="army-dash__stat-wrap">
            <label className="army-dash__label">User</label>
            <select
              name="user"
              className="army-dash__select"
              value={selectedUser?.id || armyObj.id}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const newUser: UsersObj | undefined = userArray?.find(
                  (user: UsersObj) => user.id === event.target.value
                );
                newUser &&
                  setSelectedUser({
                    known_as: newUser.known_as,
                    id: newUser.id!,
                  });
                setSuccessBool({
                  name: false,
                  type: false,
                  emblem: false,
                  user: false,
                });
              }}
            >
              {userArray?.map((user: UsersObj) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.known_as}
                  </option>
                );
              })}
            </select>
            <button
              onClick={() => {
                selectedUser?.id && handleChange("user", selectedUser?.id);
              }}
              className="army-dash__update-button"
            >
              {!successBool.user
                ? "Update User"
                : successBool.user
                ? "Success!"
                : "Update User"}{" "}
            </button>
          </article>
          <article className="army-dash__stat-wrap">
            <label className="army-dash__label">Army Type</label>
            <select
              className="army-dash__stat"
              onChange={(e: any) => {
                setSuccessBool({
                  name: false,
                  type: false,
                  emblem: false,
                  user: false,
                });

                setNewType(e.target.value);
              }}
            >
              <option value="40k">40k</option>
              <option value="fantasy">Fantasy</option>
            </select>
            <button
              onClick={() => {
                handleChange("type", newType);
              }}
              className="army-dash__update-button"
            >
              {!successBool.type
                ? "Update Type"
                : successBool.type
                ? "Success!"
                : "Update Type"}
            </button>
          </article>
          <article className="army-dash__stat-wrap">
            <label htmlFor="army-type" className="army-dash__label">
              Emblem
              <select
                name="emblem"
                className="army-dash__select"
                value={newEmblem || emblemName}
                onChange={(e) => {
                  setSuccessBool({
                    name: false,
                    type: false,
                    emblem: false,
                    user: false,
                  });
                  setNewEmblem(e.target.value);
                  setEmblemName(e.target.value);
                  return;
                }}
              >
                {emblemArray?.map((emblem, index) => {
                  return (
                    <option key={index} value={emblem.lowercase}>
                      {emblem.original}
                    </option>
                  );
                })}
              </select>
            </label>
            <button
              onClick={() => {
                handleChange("emblem", newEmblem);
              }}
              className="army-dash__update-button"
            >
              {!successBool.emblem
                ? "Update Emblem"
                : successBool.emblem
                ? "Success"
                : "Update Emblem"}
            </button>
            <div className="add-army__emblem-wrap">
              <Emblem emblem={newEmblem} />
            </div>
          </article>
        </section>
      ) : (
        <>
          <div className="army-dash__army-wrap">
            <h3 className="army-dash__label">Army</h3>
            <article className="army-dash__army-card">
              <BattleCard name={armyObj.name} emblem={armyObj.emblem} />
            </article>
          </div>
          <div className="army-dash__stat-container">
            <article className="army-dash__stat-wrap">
              <h3 className="army-dash__label">Owner</h3>
              <p className="army-dash__stat">
                {selectedUser?.known_as || armyObj.known_as}
              </p>
            </article>
            <article className="army-dash__stat-wrap">
              <h3 className="army-dash__label">Rank</h3>
              <p className="army-dash__stat">{armyRank}</p>
            </article>
            <article className="army-dash__stat-wrap">
              <h3 className="army-dash__label">Battles Completed</h3>
              <p className="army-dash__stat">{battleCount}</p>
            </article>
            <article className="army-dash__stat-wrap">
              <h3 className="army-dash__label">Win Percentage</h3>
              <p className="army-dash__stat">{`${winPercent}%`}</p>
            </article>
          </div>
        </>
      )}
    </section>
  );
}
