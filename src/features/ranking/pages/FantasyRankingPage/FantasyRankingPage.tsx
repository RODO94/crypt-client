import "./FantasyRankingPage.scss";
import { Link } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import crown from "../../../../assets/crown.svg";
import { CircularProgress } from "@mui/material";
import { useRankingsStore } from "../../../../store/rankings";
import { NewBattleCard } from "../../../battle";
import { FiveColTableHeader, FiveColTableRow } from "../../../../shared";
import { Rank } from "../../../../utils/Interfaces";

export default function FantasyRankingPage() {
  const { fantasyRankings } = useRankingsStore();

  if (!fantasyRankings) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "green" }} />
      </div>
    );
  }
  return (
    <main>
      <header className='fantasy-ranking-page__header'>
        <h2 className='fantasy-ranking-page__title'>Fantasy Rankings</h2>
        <Link className='fantasy-ranking-page__home-link' to={"/"}>
          <img
            src={logo}
            alt='the crest of the crypt as a home button'
            className='fantasy-ranking-page__logo'
          />
        </Link>
      </header>
      <section className='fantasy-ranking-page__hero'>
        <div className='fantasy-ranking-page__container'>
          <h2 className='fantasy-ranking-page__subtitle'>
            Top Ranked Competitor
          </h2>
          <div className='fantasy-ranking-page__wrap'>
            <div className='fantasy-ranking-page__army-pill'>
              <NewBattleCard
                player={fantasyRankings[0]}
                player_number={"one"}
              />
            </div>
            <img
              src={crown}
              alt='crown'
              className='fantasy-ranking-page__logo'
            />
          </div>
        </div>
      </section>
      <section className='fantasy-rankings'>
        <FiveColTableHeader />
        {fantasyRankings
          .filter((army) => army.prev_ranking !== "99.00")
          .map((army: Rank, index: number) => {
            let colour = "dark";
            if (index % 2 === 0) {
              colour = "light";
            }
            return (
              <FiveColTableRow
                key={crypto.randomUUID()}
                rank={`${index + 1}`}
                known_as={army.known_as}
                name={army.name}
                ranking={army.ranking}
                status={
                  Number(army.prev_ranking) < index + 1
                    ? "increase"
                    : Number(army.prev_ranking) > index + 1
                    ? "decrease"
                    : "no change"
                }
                colour={colour}
                navTo='/armies/information'
                id={army.army_id}
              />
            );
          })}
      </section>
    </main>
  );
}
