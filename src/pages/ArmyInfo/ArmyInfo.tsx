import { useLocation } from "react-router-dom";
import "./ArmyInfo.scss";
import { useEffect, useState } from "react";
import { getArmyInfo } from "../../utils/ArmyRequests";
import ArmyDash from "../../components/ArmyDash/ArmyDash";
import ArmyNemesis from "../../components/ArmyNemesis/ArmyNemesis";
import ArmyAlly from "../../components/ArmyAlly/ArmyAlly";
import { ArmyObj } from "../../utils/Interfaces";

export default function ArmyInfo() {
  const [armyObj, setArmyObj] = useState<ArmyObj | null>(null);
  const [battleCount, setBattleCount] = useState(0);
  const [winPercent, setWinPercent] = useState("");
  const [armyRank, setArmyRank] = useState(0);
  const [owner, setOwner] = useState("");

  const location = useLocation();

  const armyID = location.state.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!armyObj) {
        const response = await getArmyInfo(armyID, 3);

        if (response) {
          setArmyObj(response.user);
          setBattleCount(response.battleCount);
          setWinPercent(response.winPercent);
          setArmyRank(Number(response.user.ranking));
          setOwner(response.user.known_as);
        }
      }
    };

    fetchData();
  }, [armyID]);

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
        owner={owner}
      />
      <ArmyNemesis armyID={armyObj.id} />
      <ArmyAlly armyID={armyObj.id} />
    </main>
  );
}
