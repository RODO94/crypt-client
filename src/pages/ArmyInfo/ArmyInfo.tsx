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
      setArmyObj(response);
    };
    fetchArmy();
  }, []);

  useEffect(() => {
    if (armyObj) {
      const fetchBattleCount = async () => {
        const response = await getBattleCount(armyObj.user_id, userToken);
        console.log("battle Request");
        setBattleCount(response);
      };
      const fetchWinPercent = async () => {
        const response = await getWinPercent(armyObj.user_id, userToken);
        console.log("win percent request");
        setWinPercent(response);
      };

      const fetchArmyRankScore = async () => {
        const response = await getArmyRank(armyObj.id);
        console.log("army score request");
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
      <ArmyAlly armyID={armyObj.id} />
    </main>
  );
}
