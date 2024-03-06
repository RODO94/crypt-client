import { useEffect, useState } from "react";
import { getCompletedBattles } from "../../utils/BattleRequests";
import "./CompletedBattlesPage.scss";
import { CompletedBattle } from "../../utils/Interfaces";
import DateTableHeader from "../../components/DateTableHeader/DateTableHeader";
import NavFooter from "../../components/NavFooter/NavFooter";
import { Link } from "react-router-dom";
import { getAllUsersNames } from "../../utils/UserRequests";
import logo from "../../assets/logo.svg";
import BattleCompleteRow from "../../components/BattleCompleteRow/BattleCompleteRow";
import dayjs from "dayjs";

interface BattleArray extends Array<CompletedBattle> {}
interface NameArray extends Array<string> {}
interface yearArray extends Array<number> {}

export default function CompletedBattlesPage() {
  const [battleArray, setBattleArray] = useState<BattleArray>();
  const [nameArray, setNameArray] = useState<NameArray>();
  const [yearArray, setYearArray] = useState<yearArray>();
  const [nameFilter, setNameFilter] = useState<String>("Name");
  const [yearFilter, setYearFilter] = useState<String>("All");
  const [monthFilter, setMonthFilter] = useState<String>("All");
  const [battleTypeFilter, setBattleTypeFilter] =
    useState<String>("Battle Type");

  let currentDate = "";

  useEffect(() => {
    const battleFn = async () => {
      const data = await getCompletedBattles();
      setBattleArray(data);
      return data;
    };

    battleFn();
  }, []);

  useEffect(() => {
    const nameFn = async () => {
      const data = await getAllUsersNames();
      setNameArray(data);
      return data;
    };
    nameFn();
    let dateArray: yearArray = [];
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
  }, [battleArray]);

  useEffect(() => {
    let tempBattleArray: BattleArray = [];
    const filterFn = async () => {
      const data = await getCompletedBattles();
      tempBattleArray = await data;
      let filterArray: any = [];

      if (nameFilter !== "Name" && nameFilter !== "all") {
        filterArray = tempBattleArray?.filter((battle) => {
          let playerOneArray = battle.player_1.map((player) => {
            if (player.known_as === nameFilter) {
              return true;
            }
          });
          let playerTwoArray = battle.player_2.map((player) => {
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
      if (monthFilter !== "All" && filterArray[0]) {
        filterArray = filterArray.filter(
          (battle: any) => dayjs(battle.date).month() === Number(monthFilter)
        );
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      } else if (monthFilter !== "All") {
        filterArray = tempBattleArray.filter(
          (battle: any) => dayjs(battle.date).month() === Number(monthFilter)
        );
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      }
      if (yearFilter !== "All" && filterArray[0]) {
        filterArray = filterArray.filter(
          (battle: any) => dayjs(battle.date).year() === Number(yearFilter)
        );
        if (!filterArray[0]) {
          tempBattleArray = [];
        }
      } else if (yearFilter !== "All") {
        filterArray = tempBattleArray.filter(
          (battle: any) => dayjs(battle.date).year() === Number(yearFilter)
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
        let battleFilterArray = filterArray?.filter(
          (battle: any) => battle.battle_type === battleTypeFilter
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
  }, [nameFilter, battleTypeFilter, yearFilter, monthFilter]);

  const handleChange = (event: any) => {
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
    return <p>content loading... please wait</p>;
  }

  return (
    <main className="completed-battles-page">
      <div className="completed-battles-page__header-wrap">
        <h2 className="completed-battles-page__header">Completed Battles</h2>
        <Link className="completed-battles-page__home-link" to={"/"}>
          <img
            src={logo}
            alt="the crest of the crypt as a home button"
            className="completed-battles-page__logo"
          />
        </Link>
      </div>
      <Link className="completed-battles-page__link" to={"/battles/upcoming"}>
        {"Upcoming Battles  >"}
      </Link>
      <form className="completed-battles-page__filters">
        <div className="completed-battles-page__filters-container">
          <p className="completed-battles-page__filters-txt">Filter by Name</p>
          <select
            className="completed-battles-page__filters-box"
            defaultValue={""}
            name="name"
            onChange={handleChange}
          >
            <option value={""}>{nameFilter}</option>
            <option value={"all"}>All</option>
            {nameArray.map((name) => (
              <option key={crypto.randomUUID()} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="completed-battles-page__filters-container">
          <p className="completed-battles-page__filters-txt">Filter by Month</p>
          <select
            className="completed-battles-page__filters-box"
            name="month"
            onChange={handleChange}
            defaultValue={""}
          >
            <option value={""}>{monthFilter}</option>
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
        <div className="completed-battles-page__filters-container">
          <p className="completed-battles-page__filters-txt">Filter by Year</p>
          <select
            className="completed-battles-page__filters-box"
            name="year"
            onChange={handleChange}
            defaultValue={"all"}
          >
            <option value={yearFilter.toString()}>{yearFilter}</option>
            <option value="all">All</option>
            {yearArray.map((year) => (
              <option value={year.toString()}>{year}</option>
            ))}
          </select>
        </div>{" "}
        <div className="completed-battles-page__filters-container">
          <p className="completed-battles-page__filters-txt">
            Filter by Battle Type (40k or Fantasy)
          </p>
          <select
            className="completed-battles-page__filters-box"
            name="battle-type"
            onChange={handleChange}
            defaultValue={""}
          >
            <option value={""}>{battleTypeFilter}</option>

            <option value="all">All</option>
            <option value="40k">40k</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </div>
      </form>
      <section className="completedbattles">
        <article className="completedbattles__battle-list">
          {battleArray.map((battle: CompletedBattle, index: number) => {
            if (index === 0) {
              currentDate = battle.date;
              return (
                <article
                  className="completedbattles__container"
                  key={crypto.randomUUID()}
                >
                  <DateTableHeader
                    key={crypto.randomUUID()}
                    date={battle.date}
                  />
                  <BattleCompleteRow
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
                <BattleCompleteRow
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
                  className="completedbattles__container"
                  key={crypto.randomUUID()}
                >
                  <DateTableHeader
                    key={crypto.randomUUID()}
                    date={battle.date}
                  />
                  <BattleCompleteRow
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
      <NavFooter />
    </main>
  );
}
