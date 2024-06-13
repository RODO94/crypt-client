import { useEffect, useState } from "react";
import FiveColTableHeader from "../FiveColTableHeader/FiveColTableHeader";
import FiveColTableRow from "../FiveColTableRow/FiveColTableRow";
import "./FantasyTopFive .scss";
import { getRankingTopFive } from "../../utils/RankingRequests";
import { RankObj } from "../../utils/Interfaces";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CircularProgress } from "@mui/material";

interface RankArray extends Array<RankObj> {}

export default function FantasyTopFive() {
  const [fantasyRankingArray, setFantasyRankingArray] = useState<RankArray>();
  const [hideSectionBool, setHideSectionBool] = useState<boolean>(false);

  useEffect(() => {
    const fetchTopFiveRanking = async () => {
      const response = await getRankingTopFive();
      const sortedResponse = response.fantasy.sort(
        (a: any, b: any) => b.ranking - a.ranking
      );
      setFantasyRankingArray(sortedResponse);
    };
    fetchTopFiveRanking();
  }, []);

  const handleClick = () => {
    hideSectionBool === false
      ? setHideSectionBool(true)
      : setHideSectionBool(false);
  };

  if (!fantasyRankingArray) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  return (
    <section className="fantasy-rankings">
      <div className="fantasy-rankings__title-wrap">
        <Link to={"/rankings/fantasy"} className="fantasy-rankings__title">
          Fantasy Rankings
        </Link>
        <div className="fantasy-rankings__toggle" onClick={handleClick}>
          {hideSectionBool === false ? (
            <ExpandLessIcon
              style={{ color: "#fff", width: "100%", height: "auto" }}
            />
          ) : (
            <ExpandMoreIcon
              style={{ color: "#fff", width: "100%", height: "auto" }}
            />
          )}{" "}
        </div>
      </div>
      <article
        className={
          hideSectionBool === false ? "fantasy-rankings__list" : "section--hide"
        }
      >
        <FiveColTableHeader />
        {fantasyRankingArray
          .filter((army) => army.prev_ranking !== "99.00")
          .map((army: RankObj, index: number) => {
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
      </article>
    </section>
  );
}
