import { FiveColTableHeader, FiveColTableRow } from "../../../../shared";
import { Rank } from "../../../../utils/Interfaces";
import "./UsersFantasyRanking.scss";
import { CircularProgress } from "@mui/material";

export default function UsersFantasyRanking({ rankArray, user }: any) {
  if (!rankArray) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }
  return (
    <section className='user-dash-rankings user-dash-rankings--fantasy'>
      <div className='user-dash-rankings__title-wrap'>
        <h2 className='user-dash-rankings__title'>Fantasy Rankings</h2>
      </div>
      <FiveColTableHeader />
      {rankArray.map((army: Rank, index: number) => {
        let colour = "dark";
        if (index % 2 === 0) {
          colour = "light";
        }
        return (
          <FiveColTableRow
            key={crypto.randomUUID()}
            rank={String(army.current_position)}
            known_as={user}
            name={army.name}
            ranking={army.ranking}
            status={army.status}
            colour={colour}
            navTo='/armies/information'
            id={army.army_id}
          />
        );
      })}
    </section>
  );
}
