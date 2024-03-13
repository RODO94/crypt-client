import { useEffect, useState } from "react";
import AllyCard from "../AllyCard/AllyCard";
import NemesisCard from "../NemesisCard/NemesisCard";
import NextBattleCard from "../NextBattleCard/NextBattleCard";
import "./DashboardHero.scss";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/UserRequests";
import { UsersObj } from "../../utils/Interfaces";
import Emblem from "../Emblem/Emblem";
import NavButton from "../NavButton/NavButton";

export default function DashboardHero() {
  const [userObj, setUserObj] = useState<UsersObj>();
  const [token, setToken] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    const assignToken = () => {
      if (userToken) {
        setToken(userToken);
      }
    };
    assignToken();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      if (token) {
        const data = await getUser(token);
        if (!data) {
          return navigate("/login");
        }
        setUserObj(data);
        return data;
      }
    };

    getUserInfo();
  }, [token]);

  if (!userObj || !token) {
    return (
      <>
        <Emblem emblem="tau" /> <p>Page is still loading</p>
      </>
    );
  }

  return (
    <section className="dashboard-hero">
      <div className="dashboard-hero__container">
        <h1 className="dashboard-hero__header">{`Hey ${userObj?.known_as}!`}</h1>
        <Emblem emblem={userObj.user_emblem} />
      </div>
      <NextBattleCard />
      <div className="dashboard-hero__armies">
        <NemesisCard />
        <AllyCard />
      </div>
      <div className="dashboard-hero__buttons">
        <NavButton colour="blue" text="Add an Army" page="/armies/add" />
        <NavButton
          colour="dark"
          text="Create a Battle"
          page="/battles/create"
        />
      </div>
    </section>
  );
}
