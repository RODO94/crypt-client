import { RankObj } from "../../utils/Interfaces";
import "./UsersFantasyRanking.scss";
import FiveColTableHeader from "../FiveColTableHeader/FiveColTableHeader";
import FiveColTableRow from "../FiveColTableRow/FiveColTableRow";
import { CircularProgress } from "@mui/material";

export default function UsersFantasyRanking({ rankArray }: any) {
  if (!rankArray) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  return (
    <section className="user-dash-rankings user-dash-rankings--fantasy">
      <div className="user-dash-rankings__title-wrap">
        <h2 className="user-dash-rankings__title">Fantasy Rankings</h2>
      </div>
      <FiveColTableHeader />
      {rankArray.map((army: RankObj, index: number) => {
        let colour = "dark";
        if (index % 2 === 0) {
          colour = "light";
        }
        return (
          <FiveColTableRow
            key={crypto.randomUUID()}
            rank={String(army.current_position)}
            known_as={army.known_as}
            name={army.name}
            ranking={army.ranking}
            status={army.status}
            colour={colour}
            navTo="/armies/information"
            id={army.army_id}
          />
        );
      })}
    </section>
  );
}
