import { useLocation } from "react-router-dom";
import "./ArmyInfo.scss";
import { useEffect } from "react";
import ArmyDash from "../../components/ArmyDash/ArmyDash";
import ArmyNemesis from "../../components/ArmyNemesis/ArmyNemesis";
import ArmyAlly from "../../components/ArmyAlly/ArmyAlly";
import { CircularProgress } from "@mui/material";
import RankGraph from "../../components/RankGraph/RankGraph";
import { useArmiesStore } from "../../store/armies";

export default function ArmyInfo() {
  const location = useLocation();
  const { fetchArmyDetails, selectedArmy } = useArmiesStore();

  const armyID = location.state.id;

  useEffect(() => {
    const fetchData = async () => {
      await fetchArmyDetails(armyID);
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
        winPercent={selectedArmy.winPercent}
        battleCount={selectedArmy.battleCount}
        armyObj={selectedArmy.user}
        armyRank={Number(selectedArmy.user.ranking)}
      />
      <RankGraph army_id={selectedArmy.user.id} name={selectedArmy.user.name} />
      <section className="army-info__nemesis-ally">
        <div className="army-info__container">
          <ArmyNemesis nemesis={selectedArmy.nemesis} />
          <ArmyAlly ally={selectedArmy.ally} />
        </div>
      </section>
    </main>
  );
}
