import { useEffect, useState } from "react";
import DashboardHero from "../../components/DashboardHero/DashboardHero";

import UsersFantasyRanking from "../../components/UsersFantasyRanking/UsersFantasyRanking";
import UsersFortyRanking from "../../components/UsersFortyRanking/UsersFortyRanking";
import UsersResults from "../../components/UsersResults/UsersResults";
import UsersUpcomingBattles from "../../components/UsersUpcomingBattles/UsersUpcomingBattles";
import "./UserDashboard.scss";
import { Battle, RankObj, UsersObj } from "../../utils/Interfaces";
import { getUsersBattles } from "../../utils/BattleRequests";
import { getUserInfo, verifyUser } from "../../utils/UserRequests";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface RankArray extends Array<RankObj> {}

interface AllRankArray {
  fortyK: RankArray;
  fantasy: RankArray;
}

export default function UserDashboard() {
  const [rankArray, setRankArray] = useState<AllRankArray>();
  const [upcomingBattles, setUpcomingBattles] = useState();
  const [userResults, setUserResults] = useState();
  const [ally, setAlly] = useState<RankObj | undefined>();
  const [nemesis, setNemesis] = useState<RankObj | undefined>();
  const [userObj, setUserObj] = useState<UsersObj>();
  const [nextBattle, setNextBattle] = useState<Battle | undefined>();

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    const fetchData = async () => {
      if (token) {
        const response = await verifyUser(token, 2);

        if (response) {
          const [infoResponse, battlesResponse] = await Promise.all([
            getUserInfo(token, 5),
            getUsersBattles(token, 5),
          ]);

          if (!infoResponse || !battlesResponse) {
            return navigate("/login");
          }

          setRankArray(infoResponse.rankArray);
          setUpcomingBattles(battlesResponse.battleArray);
          setUserResults(infoResponse.userResults);
          setAlly(infoResponse.ally);
          setNemesis(infoResponse.nemesis);
          setUserObj(infoResponse.user);
          setNextBattle(battlesResponse.battleArray[0]);
        } else if (!response) {
          return navigate("/login/redirect");
        }
      }
    };

    fetchData();
  }, []);

  if (!userObj) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
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
            fortykRanked={rankArray?.fortyK[0]}
            fantasyRanked={rankArray?.fantasy[0]}
          />
        </section>
      </>
    );
  }

  return (
    <main className="user-dash__main">
      <section className="user-dash">
        <DashboardHero
          nextBattle={nextBattle}
          userObj={userObj}
          nemesis={nemesis}
          ally={ally}
          fortykRanked={rankArray?.fortyK[0]}
          fantasyRanked={rankArray?.fantasy[0]}
        />
      </section>
      <section className="user-ranking">
        <UsersFortyRanking
          rankArray={rankArray?.fortyK}
          user={userObj.known_as}
        />
        <UsersFantasyRanking
          rankArray={rankArray?.fantasy}
          user={userObj.known_as}
        />
      </section>
      <section className="user-battles">
        <UsersUpcomingBattles battleArray={upcomingBattles} />
        <UsersResults battleArray={userResults} />
      </section>
    </main>
  );
}
