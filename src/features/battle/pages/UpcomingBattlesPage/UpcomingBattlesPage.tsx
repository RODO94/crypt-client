import { useEffect, useState } from "react";
import "./UpcomingBattlesPage.scss";

import { Link } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import NewBattleTableRow from "../../components/NewBattleTableRow/NewBattleTableRow";
import { CircularProgress } from "@mui/material";
import { Battle } from "../../../../utils/Interfaces";
import { useBattlesStore } from "../../../../store/battles";
import { useUserStore } from "../../../../store/user";
import { DateTableHeader } from "../../../../shared";

export default function UpcomingBattlesPage() {
  const { upcomingBattles } = useBattlesStore();

  const [battleArray, setBattleArray] = useState<Battle[]>(upcomingBattles);
  const [nameArray, setNameArray] = useState<string[]>();
  const [nameFilter, setNameFilter] = useState<string>("Name");
  const [battleTypeFilter, setBattleTypeFilter] =
    useState<string>("Battle Type");

  let currentDate = "";

  const { allUsers } = useUserStore();

  useEffect(() => {
    const nameFn = async () => {
      const userNames = allUsers?.map((user) => user.known_as);
      setNameArray(userNames);
      return userNames;
    };
    nameFn();
  }, [allUsers]);

  useEffect(() => {
    let tempBattleArray: Battle[] = [];
    const filterFn = async () => {
      tempBattleArray = upcomingBattles;
      let filterArray: Battle[] = [];
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
      }

      if (
        battleTypeFilter !== "Battle Type" &&
        filterArray[0] &&
        battleTypeFilter !== "all"
      ) {
        const battleFilterArray = filterArray?.filter(
          (battle: Battle) => battle.battle_type === battleTypeFilter
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
  }, [nameFilter, battleTypeFilter, upcomingBattles]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === "battle-type") {
      return setBattleTypeFilter(event.target.value);
    }
    if (event.target.name === "name") {
      return setNameFilter(event.target.value);
    }
  };

  if (!battleArray || !nameArray) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "green" }} />
      </div>
    );
  }

  return (
    <main className='upcomingbattlespage'>
      <div className='upcomingbattlespage__header-wrap'>
        <h2 className='upcomingbattlespage__header'>Upcoming Battles</h2>
        <Link className='upcomingbattlespage__home-link' to={"/"}>
          <img
            src={logo}
            alt='the crest of the crypt as a home button'
            className='upcomingbattlespage__logo'
          />
        </Link>
      </div>
      <Link className='upcomingbattlespage__link' to={"/battles/completed"}>
        {"Completed Battles  >"}
      </Link>
      <form className='upcomingbattlespage__filters'>
        <div className='upcomingbattlespage__filters-container'>
          <p className='upcomingbattlespage__filters-txt'>Filter by Name</p>
          <select
            className='upcomingbattlespage__filters-box'
            name='name'
            value={nameFilter}
            onChange={handleChange}
          >
            <option className='upcomingbattlespage__option' value={"all"}>
              All
            </option>
            {nameArray.map((name) => (
              <option
                className='upcomingbattlespage__option'
                key={crypto.randomUUID()}
                value={name}
              >
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className='upcomingbattlespage__filters-container'>
          <p className='upcomingbattlespage__filters-txt'>
            Filter by Battle Type (40k or Fantasy)
          </p>
          <select
            className='upcomingbattlespage__filters-box'
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
      <section className='upcomingbattlespage-list'>
        <article className='upcomingbattles__battle-list'>
          {battleArray.map((battle: Battle, index: number) => {
            if (index === 0) {
              currentDate = battle.date;
              return (
                <article
                  className='upcomingbattles__container'
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
                  className='upcomingbattles__container'
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
