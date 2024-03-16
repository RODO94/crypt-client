import { useEffect, useState } from "react";
import DashboardHero from "../../components/DashboardHero/DashboardHero";
import NavFooter from "../../components/NavFooter/NavFooter";
import UsersFantasyRanking from "../../components/UsersFantasyRanking/UsersFantasyRanking";
import UsersFortyRanking from "../../components/UsersFortyRanking/UsersFortyRanking";
import UsersResults from "../../components/UsersResults/UsersResults";
import UsersUpcomingBattles from "../../components/UsersUpcomingBattles/UsersUpcomingBattles";
import "./UserDashboard.scss";
import { Battle, RankObj, UsersObj } from "../../utils/Interfaces";
import { getUsersBattles } from "../../utils/BattleRequests";
import { getUserInfo } from "../../utils/UserRequests";

interface RankArray extends Array<RankObj> {}

interface AllRankArray {
  fortyK: RankArray;
  fantasy: RankArray;
}

export default function UserDashboard() {
  const [rankArray, setRankArray] = useState<AllRankArray>();
  const [upcomingBattles, setUpcomingBattles] = useState();
  const [userResults, setUserResults] = useState();
  const [ally, setAlly] = useState<RankObj>();
  const [nemesis, setNemesis] = useState<RankObj>();
  const [userObj, setUserObj] = useState<UsersObj>();
  const [nextBattle, setNextBattle] = useState<Battle | undefined>();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const [infoResponse, battlesResponse] = await Promise.all([
          getUserInfo(token, 5),
          getUsersBattles(token, 5),
        ]);

        setRankArray(infoResponse.rankArray);
        setUpcomingBattles(battlesResponse.battleArray);
        setUserResults(infoResponse.userResults);
        setAlly(infoResponse.ally);
        setNemesis(infoResponse.nemesis);
        setUserObj(infoResponse.user);
        setNextBattle(battlesResponse.battleArray[0]);
      }
    };

    fetchData();
  }, []);

  if (!userObj || !nemesis || !ally) {
    return <p>content loading</p>;
  }

  if (!rankArray || !upcomingBattles || !userResults) {
    return (
      <>
        <section className="user-dash">
          <DashboardHero
            userObj={userObj}
            nemesis={nemesis}
            ally={ally}
            nextBattle={nextBattle}
          />
        </section>
        <NavFooter />
      </>
    );
  }

  return (
    <>
      <section className="user-dash">
        <DashboardHero
          nextBattle={nextBattle}
          userObj={userObj}
          nemesis={nemesis}
          ally={ally}
        />
      </section>
      <UsersFortyRanking
        rankArray={rankArray?.fortyK}
        user={userObj.known_as}
      />
      <UsersFantasyRanking
        rankArray={rankArray?.fantasy}
        user={userObj.known_as}
      />
      <UsersUpcomingBattles battleArray={upcomingBattles} />
      <UsersResults battleArray={userResults} />
      <NavFooter />
    </>
  );
}
