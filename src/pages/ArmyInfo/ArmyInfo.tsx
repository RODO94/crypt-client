import { useLocation } from "react-router-dom";
import "./ArmyInfo.scss";
import { useEffect, useState } from "react";
import { getArmyInfo } from "../../utils/ArmyRequests";
import ArmyDash from "../../components/ArmyDash/ArmyDash";
import ArmyNemesis from "../../components/ArmyNemesis/ArmyNemesis";
import ArmyAlly from "../../components/ArmyAlly/ArmyAlly";
import { ArmyObj, Player } from "../../utils/Interfaces";
import { CircularProgress } from "@mui/material";
import RankGraph from "../../components/RankGraph/RankGraph";

export default function ArmyInfo() {
  const [armyObj, setArmyObj] = useState<ArmyObj | null>(null);
  const [battleCount, setBattleCount] = useState(0);
  const [winPercent, setWinPercent] = useState("");
  const [armyRank, setArmyRank] = useState(0);
  const [owner, setOwner] = useState("");
  const [nemesisObj, setNemesisObj] = useState<Player | null>(null);
  const [allyObj, setAllyObj] = useState<Player | null>(null);

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
          setNemesisObj(response.nemesis);
          setAllyObj(response.ally);
        }
      }
    };

    fetchData();
  }, [armyID]);

  if (!armyObj) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
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
      <RankGraph army_id={armyObj.army_id} name={armyObj.name} />
      <section className="army-info__nemesis-ally">
        <div className="army-info__container">
          <ArmyNemesis nemesis={nemesisObj} />
          <ArmyAlly ally={allyObj} />
        </div>
      </section>
    </main>
  );
}
