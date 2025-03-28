import { useEffect } from "react";
import DashboardHero from "../../components/DashboardHero/DashboardHero";

import UsersFantasyRanking from "../../components/UsersFantasyRanking/UsersFantasyRanking";
import UsersFortyRanking from "../../components/UsersFortyRanking/UsersFortyRanking";
import UsersResults from "../../components/UsersResults/UsersResults";
import UsersUpcomingBattles from "../../components/UsersUpcomingBattles/UsersUpcomingBattles";
import "./UserDashboard.scss";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useBattlesStore } from "../../store/battles";
import { useUserStore } from "../../store/user";
import { useArmiesStore } from "../../store/armies";

export default function UserDashboard() {
  const { token, userInfo, fetchUserInfo } = useUserStore();
  const { fetchUserBattles, userBattles } = useBattlesStore();
  const { fetchUserArmies } = useArmiesStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    fetchUserInfo(token);
    fetchUserBattles(token);
    userInfo?.user.id && fetchUserArmies(userInfo?.user.id);
  }, []);

  if (!userInfo) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  return (
    <main className="user-dash__main">
      <section className="user-dash">
        <DashboardHero
          nextBattle={userBattles?.battleArray[0]}
          user={userInfo.user}
          nemesis={userInfo.nemesis}
          ally={userInfo.ally}
          fortykRanked={userInfo.rankArray.fortyK[0]}
          fantasyRanked={userInfo.rankArray.fantasy[0]}
        />
      </section>
      <section className="user-ranking">
        <UsersFortyRanking
          rankArray={userInfo.rankArray.fortyK}
          user={userInfo.user.known_as}
        />
        <UsersFantasyRanking
          rankArray={userInfo.rankArray.fantasy}
          user={userInfo.user.known_as}
        />
      </section>
      <section className="user-battles">
        <UsersUpcomingBattles battleArray={userBattles?.battleArray} />
        <UsersResults battleArray={userInfo.userResults} />
      </section>
    </main>
  );
}
