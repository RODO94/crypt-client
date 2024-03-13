import { useLocation, useNavigate } from "react-router-dom";
import "./ArmyInfo.scss";
import { useEffect, useState } from "react";
import {
  getArmyRank,
  getBattleCount,
  getOneArmy,
  getWinPercent,
} from "../../utils/ArmyRequests";
import ArmyDash from "../../components/ArmyDash/ArmyDash";
import ArmyNemesis from "../../components/ArmyNemesis/ArmyNemesis";
import ArmyAlly from "../../components/ArmyAlly/ArmyAlly";
import { ArmyObj } from "../../utils/Interfaces";

export default function ArmyInfo() {
  const [armyObj, setArmyObj] = useState<ArmyObj | null>(null);
  const [battleCount, setBattleCount] = useState(0);
  const [winPercent, setWinPercent] = useState("");
  const [armyRank, setArmyRank] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const armyID = location.state.id;
  const userToken = sessionStorage.getItem("token");
  if (!userToken) {
    navigate("/login");
    return <h1>You need to log in</h1>;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneArmy(armyID, userToken);
      if (response) {
        setArmyObj(response);

        // Batch multiple queries into a single Promise.all call
        const [battleCount, winPercent, armyRank] = await Promise.all([
          getBattleCount(response.user_id, userToken),
          getWinPercent(response.user_id, userToken),
          getArmyRank(response.id),
        ]);
        console.log(winPercent);
        // Set state after all queries have completed
        if (battleCount) {
          setBattleCount(battleCount);
        } else {
          // Retry or handle case when response is null
        }

        if (winPercent || winPercent === 0) {
          setWinPercent(winPercent);
        } else {
          // Retry or handle case when response is null
        }

        if (armyRank) {
          setArmyRank(Number(armyRank.ranking));
        } else {
          // Retry or handle case when response is null
        }
      }
    };

    fetchData();
  }, [armyID, userToken]);

  if (!armyObj) {
    return;
  }

  return (
    <main className="army-info">
      <ArmyDash
        winPercent={winPercent}
        battleCount={battleCount}
        armyObj={armyObj}
        armyRank={armyRank}
      />
      <ArmyNemesis armyID={armyObj.id} />
      <ArmyAlly armyID={armyObj.id} />
    </main>
  );
}
