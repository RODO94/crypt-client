import AllyCard from "../AllyCard/AllyCard";
import NemesisCard from "../NemesisCard/NemesisCard";
import NextBattleCard from "../NextBattleCard/NextBattleCard";
import "./DashboardHero.scss";
import Emblem from "../Emblem/Emblem";
import NavButton from "../NavButton/NavButton";
import { Battle, RankObj, UsersObj } from "../../utils/Interfaces";

interface dashboardType {
  userObj: UsersObj;
  nemesis: RankObj | undefined;
  ally: RankObj | undefined;
  nextBattle: Battle | undefined;
}

export default function DashboardHero({
  userObj,
  nemesis,
  ally,
  nextBattle,
}: dashboardType) {
  if (!userObj) {
    return;
  }
  return (
    <section className="dashboard-hero">
      <div className="dashboard-hero__container">
        <h1 className="dashboard-hero__header">{`Hey ${userObj?.known_as}!`}</h1>
        <Emblem emblem={userObj.user_emblem} />
      </div>
      <div className="dashboard-hero__content">
        <div className="dashboard-hero__info">
          <div className="dashboard-hero__battle-wrap">
            <article className="dashboard-hero__next-battle">
              <NextBattleCard nextBattle={nextBattle} id={userObj.id} />
            </article>
            <article className="dashboard-hero__armies">
              <NemesisCard nemesis={nemesis} />
              <AllyCard ally={ally} />
            </article>
          </div>
        </div>
        <div className="dashboard-hero__actions">
          <div className="dashboard-hero__buttons">
            <NavButton colour="blue" text="Add an Army" page="/armies/add" />
            <NavButton
              colour="dark"
              text="Create a Battle"
              page="/battles/create"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
