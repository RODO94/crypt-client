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

export default function ArmyInfo() {
  const [armyObj, setArmyObj] = useState(null);
  const [battleCount, setBattleCount] = useState(0);
  const [winPercent, setWinPercent] = useState("");
  const [armyRank, setArmyRank] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const armyID = location.state.id;
  console.log(armyID);
  const userToken = sessionStorage.getItem("token");
  if (!userToken) {
    return navigate("/login");
  }

  useEffect(() => {
    const fetchArmy = async () => {
      const response = await getOneArmy(armyID, userToken);
      console.log(response);
      setArmyObj(response);
    };
    fetchArmy();
  }, []);

  useEffect(() => {
    if (armyObj) {
      const fetchBattleCount = async () => {
        const response = await getBattleCount(armyObj.user_id, userToken);
        setBattleCount(response);
      };
      const fetchWinPercent = async () => {
        const response = await getWinPercent(armyObj.user_id, userToken);
        setWinPercent(response);
      };

      const fetchArmyRankScore = async () => {
        const response = await getArmyRank(armyObj.id);
        setArmyRank(Number(response.ranking));
      };

      fetchBattleCount();
      fetchWinPercent();
      fetchArmyRankScore();
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
      <ArmyAlly />
    </main>
  );
}
