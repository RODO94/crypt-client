import { useEffect, useState } from "react";
import FiveColTableHeader from "../FiveColTableHeader/FiveColTableHeader";
import FiveColTableRow from "../FiveColTableRow/FiveColTableRow";
import "./FantasyTopFive .scss";
import { getRankingTopFive } from "../../utils/RankingRequests";
import { RankObj } from "../../utils/Interfaces";

interface RankArray extends Array<RankObj> {}

export default function FantasyTopFive() {
  const [fantasyRankingArray, setFantasyRankingArray] = useState<RankArray>();

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

  if (!fantasyRankingArray) {
    return <p>Please wait while we load your content</p>;
  }

  return (
    <section className="fantasy-rankings">
      <div className="fantasy-rankings__title-wrap">
        <h2 className="fantasy-rankings__title">Fantasy Rankings</h2>
      </div>
      <FiveColTableHeader />
      {fantasyRankingArray.map((army: RankObj, index: number) => {
        let colour = "dark";
        if (index % 2 === 0) {
          colour = "light";
        }
        return (
          <FiveColTableRow
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
          />
        );
      })}
    </section>
  );
}
