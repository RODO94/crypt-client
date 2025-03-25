import { useLocation } from "react-router-dom";
import "./ArmyInfo.scss";
import { useEffect } from "react";
import ArmyDash from "../../components/ArmyDash/ArmyDash";
import ArmyNemesis from "../../components/ArmyNemesis/ArmyNemesis";
import ArmyAlly from "../../components/ArmyAlly/ArmyAlly";
import { CircularProgress } from "@mui/material";
import { useArmiesStore } from "../../store/armies";
import { useRankingsStore } from "../../store/rankings";
import RankTracker from "../../components/RankTracker/RankTracker";

export default function ArmyInfo() {
  const location = useLocation();
  const { fetchArmyDetails, selectedArmy } = useArmiesStore();
  const { fetchSingleRanking, selectedArmyRankings } = useRankingsStore();

  const armyID = location.state.id;

  useEffect(() => {
    const fetchData = async () => {
      await fetchArmyDetails(armyID);
      await fetchSingleRanking(armyID);
    };

    fetchData();
  }, [armyID, fetchArmyDetails, fetchSingleRanking]);

  if (!selectedArmy) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  console.log(selectedArmyRankings);

  return (
    <main className="army-info">
      <ArmyDash
        winPercent={selectedArmy.winPercent}
        battleCount={selectedArmy.battleCount}
        armyObj={selectedArmy.user}
        armyRank={Number(selectedArmy.user.ranking)}
      />
      <RankTracker rankings={selectedArmyRankings || []} />
      <section className="army-info__nemesis-ally">
        <div className="army-info__container">
          <ArmyNemesis nemesis={selectedArmy.nemesis} />
          <ArmyAlly ally={selectedArmy.ally} />
        </div>
      </section>
    </main>
  );
}
