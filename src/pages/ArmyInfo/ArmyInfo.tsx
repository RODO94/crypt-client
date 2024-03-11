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
    const fetchArmy = async () => {
      const response = await getOneArmy(armyID, userToken);
      console.log("get one army");
      if (response) {
        setArmyObj(response);
      }
    };
    fetchArmy();
  }, []);

  useEffect(() => {
    if (armyObj) {
      const fetchArmyInfo = async () => {
        const responseBattleCount = await getBattleCount(
          armyObj.user_id,
          userToken
        );
        const responseWinPercent = await getWinPercent(
          armyObj.user_id,
          userToken
        );
        const responseArmyRank = await getArmyRank(armyObj.id);
        setBattleCount(responseBattleCount);
        setWinPercent(responseWinPercent);
        setArmyRank(Number(responseArmyRank.ranking));
      };

      fetchArmyInfo();
    }
  }, [armyObj]);

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
