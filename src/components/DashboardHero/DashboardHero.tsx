import AllyCard from "../AllyCard/AllyCard";
import NemesisCard from "../NemesisCard/NemesisCard";
import NextBattleCard from "../NextBattleCard/NextBattleCard";
import "./DashboardHero.scss";
import Emblem from "../Emblem/Emblem";
import NavButton from "../NavButton/NavButton";
import { Battle, RankObj, UsersObj } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";

interface dashboardType {
  userObj: UsersObj;
  nemesis: RankObj | undefined;
  ally: RankObj | undefined;
  nextBattle: Battle | undefined;
  fortykRanked: RankObj | undefined;
  fantasyRanked: RankObj | undefined;
}

export default function DashboardHero({
  userObj,
  nemesis,
  ally,
  nextBattle,
  fortykRanked,
  fantasyRanked,
}: dashboardType) {
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
        <div className="dashboard-hero__topcombatant">
          <article className="dashboard-hero__combatant-wrap">
            <p className="dashboard-hero__topcombatant-title">Top Armies</p>
            <div className="dashboard-hero__combatant">
              <BattleCard
                name={fortykRanked?.name}
                emblem={fortykRanked?.emblem}
                ranking={fortykRanked?.ranking}
                known_as={userObj.known_as}
              />
            </div>
          </article>
          <article className="dashboard-hero__combatant-wrap">
            <div className="dashboard-hero__combatant">
              <BattleCard
                name={fantasyRanked?.name}
                emblem={fantasyRanked?.emblem}
                ranking={fantasyRanked?.ranking}
                known_as={userObj.known_as}
              />
            </div>
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
    </section>
  );
}
