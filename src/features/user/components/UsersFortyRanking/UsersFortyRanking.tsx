import FiveColTableHeader from "../../../../shared/components/tables/FiveColTableHeader/FiveColTableHeader";
import FiveColTableRow from "../../../../shared/components/tables/FiveColTableRow/FiveColTableRow";
import { Rank } from "../../../../utils/Interfaces";
import "./UsersFortyRanking.scss";
import { CircularProgress } from "@mui/material";

export default function UsersFortyRanking({
  rankArray,
  user,
}: {
  rankArray: Rank[];
  user: string;
}) {
  if (!rankArray) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }
  return (
    <section className='user-dash-rankings'>
      <div className='user-dash-rankings__title-wrap'>
        <h2 className='user-dash-rankings__title'>40k Rankings</h2>
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
            navTo={"/armies/information"}
            id={army.army_id}
          />
        );
      })}
    </section>
  );
}
