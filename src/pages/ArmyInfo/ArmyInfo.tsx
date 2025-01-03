import { useLocation } from "react-router-dom";
import "./ArmyInfo.scss";
import { useEffect, useState } from "react";
import { getArmyInfo } from "../../utils/ArmyRequests";
import ArmyDash from "../../components/ArmyDash/ArmyDash";
import ArmyNemesis from "../../components/ArmyNemesis/ArmyNemesis";
import ArmyAlly from "../../components/ArmyAlly/ArmyAlly";
import { Player } from "../../utils/Interfaces";
import { CircularProgress } from "@mui/material";
import RankGraph from "../../components/RankGraph/RankGraph";

export interface ArmyInformation {
  id: string;
  ranking: string;
  user_id: string;
  emblem_id: string;
  rn: number;
  type: "fantasy" | "40k";
  name: string;
  emblem: string;
  known_as: string;
}

export default function ArmyInfo() {
  const [armyObj, setArmyObj] = useState<ArmyInformation>();
  const [battleCount, setBattleCount] = useState(0);
  const [winPercent, setWinPercent] = useState("");
  const [armyRank, setArmyRank] = useState(0);
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
      />
      <RankGraph army_id={armyObj.id} name={armyObj.name} />
      <section className="army-info__nemesis-ally">
        <div className="army-info__container">
          <ArmyNemesis nemesis={nemesisObj} />
          <ArmyAlly ally={allyObj} />
        </div>
      </section>
    </main>
  );
}
