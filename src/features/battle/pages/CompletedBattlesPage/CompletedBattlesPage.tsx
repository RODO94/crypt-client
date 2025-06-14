import React, { useEffect, useState } from "react";
import "./CompletedBattlesPage.scss";

import { Link } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import dayjs from "dayjs";
import NewBattleCompleteTableRow from "../../components/NewBattleTableCompleteRow/NewBattleCompleteTableRow";
import { CircularProgress } from "@mui/material";
import { useBattlesStore } from "../../../../store/battles";
import { useUserStore } from "../../../../store/user";
import { CompletedBattle } from "../../../../utils/Interfaces";
import { DateTableHeader } from "../../../../shared";

export default function CompletedBattlesPage() {
  const { completedBattles } = useBattlesStore();
  const [battleArray, setBattleArray] =
    useState<CompletedBattle[]>(completedBattles);
  const [nameArray, setNameArray] = useState<string[]>();
  const [yearArray, setYearArray] = useState<number[]>();
  const [nameFilter, setNameFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [battleTypeFilter, setBattleTypeFilter] = useState<string>("all");

  let currentDate = "";

  const { allUsers } = useUserStore();

  useEffect(() => {
    const nameFn = async () => {
      const userNames = allUsers?.map((user) => user.known_as);
      setNameArray(userNames);
      return userNames;
    };
    nameFn();
    let dateArray: number[] = [];
    if (battleArray !== undefined) {
      dateArray = battleArray?.map((battle) => {
        if (dateArray.includes(dayjs(battle.date).year())) {
          return 999;
        } else {
          dateArray.push(dayjs(battle.date).year());
          return dayjs(battle.date).year();
        }
      });

      dateArray = dateArray.filter((date) => date !== 999);

      setYearArray(dateArray);
    }
  }, [battleArray, allUsers]);

  useEffect(() => {
    let tempBattleArray: CompletedBattle[] = [];
    const filterFn = async () => {
      tempBattleArray = completedBattles;
      let filterArray: Array<CompletedBattle> = [];

      if (nameFilter !== "Name" && nameFilter !== "all") {
        filterArray = tempBattleArray?.filter((battle) => {
          const playerOneArray = battle.player_1.map((player) => {
            if (player.known_as === nameFilter) {
              return true;
            }
          });
          const playerTwoArray = battle.player_2.map((player) => {
            if (player.known_as === nameFilter) {
              return true;
            }
          });

          if (playerOneArray.includes(true) || playerTwoArray.includes(true)) {
            return true;
          }
        });
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      }
      if (monthFilter !== "all" && filterArray[0]) {
        filterArray = filterArray.filter(
          (battle: CompletedBattle) =>
            dayjs(battle.date).month() === Number(monthFilter)
        );
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      } else if (monthFilter !== "all") {
        filterArray = tempBattleArray.filter(
          (battle: CompletedBattle) =>
            dayjs(battle.date).month() === Number(monthFilter)
        );
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      }
      if (yearFilter !== "all" && filterArray[0]) {
        filterArray = filterArray.filter(
          (battle: CompletedBattle) =>
            dayjs(battle.date).year() === Number(yearFilter)
        );
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      } else if (yearFilter !== "all") {
        filterArray = tempBattleArray.filter(
          (battle: CompletedBattle) =>
            dayjs(battle.date).year() === Number(yearFilter)
        );
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      }

      if (
        battleTypeFilter !== "Battle Type" &&
        filterArray[0] &&
        battleTypeFilter !== "all"
      ) {
        const battleFilterArray = filterArray?.filter(
          (battle: CompletedBattle) => battle.battle_type === battleTypeFilter
        );

        filterArray = battleFilterArray;

        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      } else if (
        battleTypeFilter !== "Battle Type" &&
        battleTypeFilter !== "all"
      ) {
        filterArray = tempBattleArray?.filter(
          (battle) => battle.battle_type === battleTypeFilter
        );
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      }
      if (filterArray[0]) {
        setBattleArray(filterArray);
      } else setBattleArray(tempBattleArray);
    };
    filterFn();
  }, [nameFilter, battleTypeFilter, yearFilter, monthFilter, completedBattles]);

  const handleChange = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    if (event.target.name === "battle-type") {
      return setBattleTypeFilter(event.target.value);
    }
    if (event.target.name === "name") {
      return setNameFilter(event.target.value);
    }
    if (event.target.name === "year") {
      return setYearFilter(event.target.value);
    }
    if (event.target.name === "month") {
      return setMonthFilter(event.target.value);
    }
  };

  if (!battleArray || !nameArray || !yearArray) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "green" }} />
      </div>
    );
  }

  return (
    <main className='completed-battles-page'>
      <div className='completed-battles-page__header-wrap'>
        <h2 className='completed-battles-page__header'>Completed Battles</h2>
        <Link className='completed-battles-page__home-link' to={"/"}>
          <img
            src={logo}
            alt='the crest of the crypt as a home button'
            className='completed-battles-page__logo'
          />
        </Link>
      </div>
      <Link className='completed-battles-page__link' to={"/battles/upcoming"}>
        {"Upcoming Battles  >"}
      </Link>
      <form className='completed-battles-page__filters'>
        <div className='completed-battles-page__filters-container'>
          <p className='completed-battles-page__filters-txt'>Filter by Name</p>
          <select
            className='completed-battles-page__filters-box'
            name='name'
            value={nameFilter}
            onChange={handleChange}
          >
            <option hidden value={""}>
              All
            </option>
            <option value={"all"}>All</option>
            {nameArray.map((name) => (
              <option key={crypto.randomUUID()} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className='completed-battles-page__filters-container'>
          <p className='completed-battles-page__filters-txt'>Filter by Month</p>
          <select
            className='completed-battles-page__filters-box'
            name='month'
            onChange={handleChange}
            value={monthFilter}
          >
            <option hidden value={""}>
              All
            </option>
            <option value={"all"}>{"All"}</option>
            <option value={0}>Jan</option>
            <option value={1}>Feb</option>
            <option value={2}>Mar</option>
            <option value={3}>Apr</option>
            <option value={4}>May</option>
            <option value={5}>Jun</option>
            <option value={6}>Jul</option>
            <option value={7}>Aug</option>
            <option value={8}>Sep</option>
            <option value={9}>Oct</option>
            <option value={10}>Nov</option>
            <option value={11}>Dec</option>
          </select>
        </div>{" "}
        <div className='completed-battles-page__filters-container'>
          <p className='completed-battles-page__filters-txt'>Filter by Year</p>
          <select
            className='completed-battles-page__filters-box'
            name='year'
            onChange={handleChange}
            value={yearFilter}
          >
            <option value='all'>All</option>
            {yearArray.map((year, index) => (
              <option key={`${year} ${index}`} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>{" "}
        <div className='completed-battles-page__filters-container'>
          <p className='completed-battles-page__filters-txt'>
            Filter by Battle Type (40k or Fantasy)
          </p>
          <select
            className='completed-battles-page__filters-box'
            name='battle-type'
            onChange={handleChange}
            value={battleTypeFilter}
          >
            <option value='all'>All</option>
            <option value='40k'>40k</option>
            <option value='fantasy'>Fantasy</option>
          </select>
        </div>
      </form>
      <section className='completed-battles-page-list'>
        <article className='completedbattles__battle-list'>
          {battleArray.map((battle: CompletedBattle, index: number) => {
            if (index === 0) {
              currentDate = battle.date;
              return (
                <article
                  className='completedbattles__container'
                  key={crypto.randomUUID()}
                >
                  <DateTableHeader
                    key={crypto.randomUUID()}
                    date={battle.date}
                  />
                  <NewBattleCompleteTableRow
                    key={crypto.randomUUID()}
                    battle_type={battle.battle_type}
                    player_type={battle.player_type}
                    player_1={battle.player_1}
                    player_2={battle.player_2}
                    result={battle.result}
                    winner={battle.winner}
                    combatant_1_id={
                      battle.combatant_1_id ? battle.combatant_1_id : ""
                    }
                    combatant_2_id={
                      battle.combatant_2_id ? battle.combatant_2_id : ""
                    }
                    id={battle.id}
                  />
                </article>
              );
            } else if (currentDate === battle.date) {
              return (
                <NewBattleCompleteTableRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_type={battle.player_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  result={battle.result}
                  winner={battle.winner}
                  combatant_1_id={
                    battle.combatant_1_id ? battle.combatant_1_id : ""
                  }
                  combatant_2_id={
                    battle.combatant_2_id ? battle.combatant_2_id : ""
                  }
                  id={battle.id}
                />
              );
            } else if (currentDate !== battle.date) {
              currentDate = battle.date;
              return (
                <article
                  className='completedbattles__container'
                  key={crypto.randomUUID()}
                >
                  <DateTableHeader
                    key={crypto.randomUUID()}
                    date={battle.date}
                  />
                  <NewBattleCompleteTableRow
                    key={crypto.randomUUID()}
                    battle_type={battle.battle_type}
                    player_type={battle.player_type}
                    player_1={battle.player_1}
                    player_2={battle.player_2}
                    result={battle.result}
                    winner={battle.winner}
                    combatant_1_id={
                      battle.combatant_1_id ? battle.combatant_1_id : ""
                    }
                    combatant_2_id={
                      battle.combatant_2_id ? battle.combatant_2_id : ""
                    }
                    id={battle.id}
                  />
                </article>
              );
            }
          })}
        </article>
      </section>
    </main>
  );
}
