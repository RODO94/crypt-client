import { useLocation } from "react-router-dom";
import "./ArmyInfo.scss";
import { useEffect, useState } from "react";
import ArmyDash from "../../components/ArmyDash/ArmyDash";
import ArmyNemesis from "../../components/ArmyNemesis/ArmyNemesis";
import ArmyAlly from "../../components/ArmyAlly/ArmyAlly";
import { Player } from "../../utils/Interfaces";
import { CircularProgress } from "@mui/material";
import RankGraph from "../../components/RankGraph/RankGraph";
import { useArmiesStore } from "../../store/armies";

export default function ArmyInfo() {
  const [battleCount, setBattleCount] = useState(0);
  const [winPercent, setWinPercent] = useState("");
  const [armyRank, setArmyRank] = useState(0);
  const [nemesisObj, setNemesisObj] = useState<Player | null>(null);
  const [allyObj, setAllyObj] = useState<Player | null>(null);

  const location = useLocation();
  const { fetchArmyDetails, selectedArmy } = useArmiesStore();

  const armyID = location.state.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedArmy) {
        await fetchArmyDetails(armyID);
      } else {
        setBattleCount(selectedArmy.battleCount);
        setWinPercent(selectedArmy.winPercent);
        setArmyRank(Number(selectedArmy.user.ranking));
        setNemesisObj(selectedArmy.nemesis);
        setAllyObj(selectedArmy.ally);
      }
    };

    fetchData();
  }, [armyID, selectedArmy, fetchArmyDetails]);

  if (!selectedArmy) {
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
        armyObj={selectedArmy.user}
        armyRank={armyRank}
      />
      <RankGraph army_id={selectedArmy.user.id} name={selectedArmy.user.name} />
      <section className="army-info__nemesis-ally">
        <div className="army-info__container">
          <ArmyNemesis nemesis={nemesisObj} />
          <ArmyAlly ally={allyObj} />
        </div>
      </section>
    </main>
  );
}
