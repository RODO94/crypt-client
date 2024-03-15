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
    const fetchData = async () => {
      if (token) {
        const [rankingsResponse, battlesResponse] = await Promise.all([
          getAllUserRanking(token, 5),
          Promise.all([getUsersBattles(token, 5), getUsersResults(token, 5)]),
        ]);

        setRankArray(rankingsResponse);
        setUpcomingBattles(battlesResponse[0].battleArray);
        setUserResults(battlesResponse[1]);
      }
    };

    fetchData();
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
