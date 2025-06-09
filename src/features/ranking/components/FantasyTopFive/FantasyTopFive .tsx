import { useState } from "react";
import "./FantasyTopFive .scss";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CircularProgress } from "@mui/material";
import { useRankingsStore } from "../../../../store/rankings";
import { FiveColTableHeader, FiveColTableRow } from "../../../../shared";
import { Rank } from "../../../../utils/Interfaces";

export default function FantasyTopFive() {
  const [hideSectionBool, setHideSectionBool] = useState<boolean>(false);

  const { fantasy: fantasyRankings } = useRankingsStore().topRankings;

  const handleClick = () => {
    hideSectionBool === false
      ? setHideSectionBool(true)
      : setHideSectionBool(false);
  };

  if (!fantasyRankings) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  return (
    <section className='fantasy-rankings'>
      <div className='fantasy-rankings__title-wrap'>
        <Link to={"/rankings/fantasy"} className='fantasy-rankings__title'>
          Fantasy Rankings
        </Link>
        <div className='fantasy-rankings__toggle' onClick={handleClick}>
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
      </article>
    </section>
  );
}
