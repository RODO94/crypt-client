import { useEffect, useState } from "react";
import { RankObj } from "../../utils/Interfaces";
import "./FantasyRankingPage.scss";
import FiveColTableHeader from "../../components/FiveColTableHeader/FiveColTableHeader";
import FiveColTableRow from "../../components/FiveColTableRow/FiveColTableRow";
import { getRanking } from "../../utils/RankingRequests";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import crown from "../../assets/crown.svg";
import ArmyPill from "../../components/ArmyPill/ArmyPill";
import { CircularProgress } from "@mui/material";

interface RankArray extends Array<RankObj> {}

export default function FantasyRankingPage() {
  const [fantasyRankingArray, setFantasyRankingArray] = useState<RankArray>();

  useEffect(() => {
    const fetchRanking = async () => {
      const response = await getRanking("fantasy");
      const sortedResponse = response.sort(
        (a: any, b: any) => b.ranking - a.ranking
      );
      setFantasyRankingArray(sortedResponse);
    };
    fetchRanking();
  }, []);

  if (!fantasyRankingArray) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "green" }} />
      </div>
    );
  }
  return (
    <main>
      <header className="fantasy-ranking-page__header">
        <h2 className="fantasy-ranking-page__title">Fantasy Rankings</h2>
        <Link className="fantasy-ranking-page__home-link" to={"/"}>
          <img
            src={logo}
            alt="the crest of the crypt as a home button"
            className="fantasy-ranking-page__logo"
          />
        </Link>
      </header>
      <section className="fantasy-ranking-page__hero">
        <div className="fantasy-ranking-page__container">
          <h2 className="fantasy-ranking-page__subtitle">
            Top Ranked Competitor
          </h2>
          <div className="fantasy-ranking-page__wrap">
            <img
              src={crown}
              alt="crown"
              className="fantasy-ranking-page__logo"
            />
            <p className="fantasy-ranking-page__txt">
              {fantasyRankingArray[0].known_as}
            </p>
            <div className="fantasy-ranking-page__army-pill">
              <ArmyPill
                name={fantasyRankingArray[0].name}
                emblem={fantasyRankingArray[0].emblem}
                known_as=""
                ranking=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="fantasy-rankings">
        <FiveColTableHeader />
        {fantasyRankingArray.map((army: RankObj, index: number) => {
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
                  ? "decrease"
                  : Number(army.prev_ranking) > index + 1
                  ? "increase"
                  : "no change"
              }
              colour={colour}
              navTo="/armies/information"
              id={army.army_id}
            />
          );
        })}
      </section>
    </main>
  );
}
