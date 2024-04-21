import { useEffect, useState } from "react";
import { getUpcomingBattles } from "../../utils/BattleRequests";
import "./UpcomingBattlesPage.scss";
import { Battle } from "../../utils/Interfaces";
import DateTableHeader from "../../components/DateTableHeader/DateTableHeader";

import { Link } from "react-router-dom";
import { getAllUsersNames } from "../../utils/UserRequests";
import logo from "../../assets/logo.svg";
import NewBattleTableRow from "../../components/NewBattleTableRow/NewBattleTableRow";

interface BattleArray extends Array<Battle> {}
interface NameArray extends Array<string> {}

export default function UpcomingBattlesPage() {
  const [battleArray, setBattleArray] = useState<BattleArray>();
  const [nameArray, setNameArray] = useState<NameArray>();
  const [nameFilter, setNameFilter] = useState<String>("Name");
  const [battleTypeFilter, setBattleTypeFilter] =
    useState<String>("Battle Type");

  let currentDate = "";

  useEffect(() => {
    const battleFn = async () => {
      const data = await getUpcomingBattles(3);
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
  }, []);

  useEffect(() => {
    let tempBattleArray: BattleArray = [];
    const filterFn = async () => {
      const data = await getUpcomingBattles(3);
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
      } else if (
        battleTypeFilter !== "Battle Type" &&
        battleTypeFilter !== "all"
      ) {
        filterArray = tempBattleArray?.filter(
          (battle) => battle.battle_type === battleTypeFilter
        );
      }

      if (filterArray[0]) {
        setBattleArray(filterArray);
      } else setBattleArray(tempBattleArray);
    };
    filterFn();
  }, [nameFilter, battleTypeFilter]);

  const handleChange = (event: any) => {
    if (event.target.name === "battle-type") {
      return setBattleTypeFilter(event.target.value);
    }
    if (event.target.name === "name") {
      return setNameFilter(event.target.value);
    }
  };

  if (!battleArray || !nameArray) {
    return <p>content loading... please wait</p>;
  }

  return (
    <main className="upcomingbattlespage">
      <div className="upcomingbattlespage__header-wrap">
        <h2 className="upcomingbattlespage__header">Upcoming Battles</h2>
        <Link className="upcomingbattlespage__home-link" to={"/"}>
          <img
            src={logo}
            alt="the crest of the crypt as a home button"
            className="upcomingbattlespage__logo"
          />
        </Link>
      </div>
      <Link className="upcomingbattlespage__link" to={"/battles/completed"}>
        {"Completed Battles  >"}
      </Link>
      <form className="upcomingbattlespage__filters">
        <div className="upcomingbattlespage__filters-container">
          <p className="upcomingbattlespage__filters-txt">Filter by Name</p>
          <select
            className="upcomingbattlespage__filters-box"
            defaultValue={""}
            name="name"
            onChange={handleChange}
          >
            <option className="upcomingbattlespage__option" value={"all"}>
              All
            </option>
            {nameArray.map((name) => (
              <option
                className="upcomingbattlespage__option"
                key={crypto.randomUUID()}
                value={name}
              >
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="upcomingbattlespage__filters-container">
          <p className="upcomingbattlespage__filters-txt">
            Filter by Battle Type (40k or Fantasy)
          </p>
          <select
            className="upcomingbattlespage__filters-box"
            name="battle-type"
            onChange={handleChange}
            defaultValue={""}
          >
            <option value="all">All</option>
            <option value="40k">40k</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </div>
      </form>
      <section className="upcomingbattles">
        <article className="upcomingbattles__battle-list">
          {battleArray.map((battle: Battle, index: number) => {
            if (index === 0) {
              currentDate = battle.date;
              return (
                <article
                  className="upcomingbattles__container"
                  key={crypto.randomUUID()}
                >
                  <DateTableHeader
                    key={crypto.randomUUID()}
                    date={battle.date}
                  />
                  <NewBattleTableRow
                    key={crypto.randomUUID()}
                    battle_type={battle.battle_type}
                    player_1={battle.player_1}
                    player_2={battle.player_2}
                    id={battle.id}
                    table={battle.table}
                    start={battle.start}
                    finish={battle.finish}
                  />
                </article>
              );
            } else if (currentDate === battle.date) {
              return (
                <NewBattleTableRow
                  key={crypto.randomUUID()}
                  battle_type={battle.battle_type}
                  player_1={battle.player_1}
                  player_2={battle.player_2}
                  id={battle.id}
                  table={battle.table}
                  start={battle.start}
                  finish={battle.finish}
                />
              );
            } else if (currentDate !== battle.date) {
              currentDate = battle.date;
              return (
                <article
                  className="upcomingbattles__container"
                  key={crypto.randomUUID()}
                >
                  <DateTableHeader
                    key={crypto.randomUUID()}
                    date={battle.date}
                  />
                  <NewBattleTableRow
                    key={crypto.randomUUID()}
                    battle_type={battle.battle_type}
                    player_type={battle.player_type}
                    player_1={battle.player_1}
                    player_2={battle.player_2}
                    id={battle.id}
                    table={battle.table}
                    start={battle.start}
                    finish={battle.finish}
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
