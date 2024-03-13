import { useEffect, useState } from "react";
import DashboardHero from "../../components/DashboardHero/DashboardHero";
import NavFooter from "../../components/NavFooter/NavFooter";
import UsersFantasyRanking from "../../components/UsersFantasyRanking/UsersFantasyRanking";
import UsersFortyRanking from "../../components/UsersFortyRanking/UsersFortyRanking";
import UsersResults from "../../components/UsersResults/UsersResults";
import UsersUpcomingBattles from "../../components/UsersUpcomingBattles/UsersUpcomingBattles";
import "./UserDashboard.scss";
import { getAllUserRanking } from "../../utils/RankingRequests";
import { RankObj } from "../../utils/Interfaces";
import { getUsersBattles, getUsersResults } from "../../utils/BattleRequests";

interface RankArray extends Array<RankObj> {}

interface AllRankArray {
  fortyK: RankArray;
  fantasy: RankArray;
}

export default function UserDashboard() {
  const [rankArray, setRankArray] = useState<AllRankArray>();
  const [upcomingBattles, setUpcomingBattles] = useState();
  const [userResults, setUserResults] = useState();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchRankings = async () => {
      if (token) {
        const response = await getAllUserRanking(token);
        setRankArray(response);
      }
    };

    const fetchBattles = async () => {
      if (token) {
        const upcomingBattles = await getUsersBattles(token);
        const completedBattles = await getUsersResults(token);

        setUpcomingBattles(upcomingBattles.battleArray);
        setUserResults(completedBattles);
      }
    };
    fetchRankings();
    fetchBattles();
  }, []);
  if (!rankArray || !upcomingBattles || !userResults) {
    return (
      <>
        <section className="user-dash">
          <DashboardHero />
        </section>
        <NavFooter />
      </>
    );
  }

  console.log({
    rankArray: rankArray,
    upcomingBattles: upcomingBattles,
    userResults: userResults,
  });
  return (
    <>
      <section className="user-dash">
        <DashboardHero />
      </section>
      <UsersFortyRanking rankArray={rankArray?.fortyK} />
      <UsersFantasyRanking rankArray={rankArray?.fantasy} />
      <UsersUpcomingBattles battleArray={upcomingBattles} />
      <UsersResults battleArray={userResults} />
      <NavFooter />
    </>
  );
}
