import { useEffect, useState } from "react";
import FiveColTableHeader from "../FiveColTableHeader/FiveColTableHeader";
import FiveColTableRow from "../FiveColTableRow/FiveColTableRow";
import "./FortyKTopFive.scss";
import { getRankingTopFive } from "../../utils/RankingRequests";
import { RankObj } from "../../utils/Interfaces";

interface RankArray extends Array<RankObj> {}

export default function FortyKTopFive() {
  const [fortyKRankingArray, setFortyKRankingArray] = useState<RankArray>();

  useEffect(() => {
    const fetchTopFiveRanking = async () => {
      const response = await getRankingTopFive();
      const sortedResponse = response.fortyK.sort(
        (a: any, b: any) => b.ranking - a.ranking
      );
      setFortyKRankingArray(sortedResponse);
    };
    fetchTopFiveRanking();
  }, []);

  if (!fortyKRankingArray) {
    return <p>Please wait while we load your content</p>;
  }

  return (
    <section className="fortyk-rankings">
      <div className="fortyk-rankings__title-wrap">
        <h2 className="fortyk-rankings__title">40k Rankings</h2>
      </div>
      <FiveColTableHeader />
      {fortyKRankingArray.map((army: RankObj, index: number) => {
        let colour = "dark";
        if (index % 2 === 0) {
          colour = "light";
        }
        console.log(colour);
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
