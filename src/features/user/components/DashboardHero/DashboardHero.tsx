import "./DashboardHero.scss";
import NavButton from "../../../../shared/components/layout/NavButton/NavButton";
import { Battle, Rank, Users } from "../../../../utils/Interfaces";
import Emblem from "../../../../shared/components/ui/Emblem/Emblem";
import { NewBattleCard, NextBattleCard } from "../../../battle";
import { AllyCard, NemesisCard } from "../../../army";
import { Emblems } from "../../../../utils/emblems";

interface DashboardType {
  user: Users;
  nemesis: Rank | undefined;
  ally: Rank | undefined;
  nextBattle: Battle | undefined;
  fortykRanked: Rank | undefined;
  fantasyRanked: Rank | undefined;
}

export default function DashboardHero({
  user,
  nemesis,
  ally,
  nextBattle,
  fortykRanked,
  fantasyRanked,
}: DashboardType) {
  return (
    <section className='dashboard-hero'>
      <div className='dashboard-hero__container'>
        <h1 className='dashboard-hero__header'>{`Hey ${user?.known_as}!`}</h1>
        <Emblem emblem={(user.user_emblem as Emblems) || "tau"} />
      </div>
      <div className='dashboard-hero__content'>
        <div className='dashboard-hero__info'>
          <div className='dashboard-hero__battle-wrap'>
            <article className='dashboard-hero__armies'>
              <NextBattleCard nextBattle={nextBattle} id={user.id} />
            </article>
            <article className='dashboard-hero__armies'>
              <NemesisCard nemesis={nemesis} />
              <AllyCard ally={ally} />
            </article>
          </div>
        </div>
        <div className='dashboard-hero__topcombatant'>
          <p className='dashboard-hero__topcombatant-title'>Top Armies</p>
          <article className='dashboard-hero__combatant-wrap'>
            <div className='dashboard-hero__combatant'>
              {fortykRanked ? (
                <NewBattleCard
                  player_number='one'
                  player={{ ...fortykRanked, known_as: user.known_as }}
                />
              ) : (
                <p>You have no top ranked 40,000 armies</p>
              )}
            </div>
            <div className='dashboard-hero__combatant'>
              {fantasyRanked ? (
                <NewBattleCard
                  player_number='one'
                  player={{ ...fantasyRanked, known_as: user.known_as }}
                />
              ) : (
                <p>You have no top ranked Fantasy armies</p>
              )}
            </div>
          </article>
        </div>
      </div>
      <div className='dashboard-hero__actions'>
        <div className='dashboard-hero__buttons'>
          <NavButton colour='blue' text='Add an Army' page='/armies/add' />
          <NavButton
            colour='dark'
            text='Create a Battle'
            page='/battles/create'
          />
        </div>
      </div>
    </section>
  );
}
