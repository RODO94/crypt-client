import { useEffect, useState } from "react";
import DashboardHero from "../../components/DashboardHero/DashboardHero";

import UsersFantasyRanking from "../../components/UsersFantasyRanking/UsersFantasyRanking";
import UsersFortyRanking from "../../components/UsersFortyRanking/UsersFortyRanking";
import UsersResults from "../../components/UsersResults/UsersResults";
import UsersUpcomingBattles from "../../components/UsersUpcomingBattles/UsersUpcomingBattles";
import "./UserDashboard.scss";
import { Rank, UsersObj } from "../../utils/Interfaces";
import { getUserInfo, verifyUser } from "../../utils/UserRequests";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useArmiesStore } from "../../store/armies";
import { useBattlesStore } from "../../store/battles";

interface RankArray extends Array<Rank> {}

interface AllRankArray {
  fortyK: RankArray;
  fantasy: RankArray;
}

export default function UserDashboard() {
  const [rankArray, setRankArray] = useState<AllRankArray>();
  const [userResults, setUserResults] = useState();
  const [ally, setAlly] = useState<Rank | undefined>();
  const [nemesis, setNemesis] = useState<Rank | undefined>();
  const [userObj, setUserObj] = useState<UsersObj>();

  const token = sessionStorage.getItem("token");
  const { fetchUserArmies } = useArmiesStore();
  const { fetchUserBattles, userBattles } = useBattlesStore();
  console.log(userBattles);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    const fetchData = async () => {
      if (token) {
        const response = await verifyUser(token, 2);

        if (response) {
          const infoResponse = await getUserInfo(token, 5);

          if (!infoResponse) {
            return navigate("/login");
          }

          if (!userBattles) fetchUserBattles(token);

          fetchUserArmies(infoResponse.user.id);

          setRankArray(infoResponse.rankArray);
          setUserResults(infoResponse.userResults);
          setAlly(infoResponse.ally);
          setNemesis(infoResponse.nemesis);
          setUserObj(infoResponse.user);
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

  if (!rankArray || !userResults) {
    return (
      <>
        <section className="user-dash">
          <DashboardHero
            userObj={userObj}
            nemesis={nemesis}
            ally={ally}
            nextBattle={userBattles?.battleArray[0]}
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
          nextBattle={userBattles?.battleArray[0]}
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
        <UsersUpcomingBattles battleArray={userBattles?.battleArray} />
        <UsersResults battleArray={userResults} />
      </section>
    </main>
  );
}
