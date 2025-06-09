import { useState } from "react";
import "./FortyKTopFive.scss";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CircularProgress } from "@mui/material";
import { useRankingsStore } from "../../../../store/rankings";
import { FiveColTableHeader, FiveColTableRow } from "../../../../shared";
import { Rank } from "../../../../utils/Interfaces";

export default function FortyKTopFive() {
  const [hideSectionBool, setHideSectionBool] = useState<boolean>(false);

  const { fortyK: fortyKRankings } = useRankingsStore().topRankings;

  const handleClick = () => {
    hideSectionBool === false
      ? setHideSectionBool(true)
      : setHideSectionBool(false);
  };

  if (!fortyKRankings) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  return (
    <section className='fortyk-rankings'>
      <div className='fortyk-rankings__title-wrap'>
        <Link to={"/rankings/40k"} className='fortyk-rankings__title'>
          40,000 Rankings
        </Link>
        <div className='fortyk-rankings__toggle' onClick={handleClick}>
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
          hideSectionBool === false ? "fortyk-rankings__list" : "section--hide"
        }
      >
        <FiveColTableHeader />
        {fortyKRankings
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
                navTo={`/armies/information`}
                id={army.army_id}
              />
            );
          })}
      </article>
    </section>
  );
}
