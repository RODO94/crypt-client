import { useEffect, useState } from "react";
import "./BattleResultBanner.scss";
import Chip from "@mui/material/Chip";
import { getUserLastFiveBattles } from "../../../../utils/BattleRequests";

export default function BattleResultBanner() {
  const [resultArray, setResultArray] = useState<string[]>();
  const userToken = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchResults = async () => {
      const response = userToken && (await getUserLastFiveBattles(userToken));
      response && setResultArray(response);
    };
    fetchResults();
  }, [userToken]);

  const chipSize = screen.width < 768 ? "small" : "medium";
  return (
    <article className='result-card'>
      {/* <h3 className="result-card__header">Recent Results</h3> */}
      <div className='result-card__wrap'>
        {resultArray?.map((result) => {
          switch (result) {
            case "win":
              return (
                <Chip
                  size={chipSize}
                  className='result-card__chip'
                  color='success'
                  label={"W"}
                />
              );
            case "loss":
              return (
                <Chip
                  size={chipSize}
                  color='error'
                  className='result-card__chip'
                  label={"L"}
                />
              );
            case "draw":
              return (
                <Chip
                  size={chipSize}
                  color='info'
                  className='result-card__chip'
                  label={"D"}
                />
              );
            default:
              break;
          }
        })}
      </div>
    </article>
  );
}
