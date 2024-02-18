import DashboardHero from "../../components/DashboardHero/DashboardHero";
import NavFooter from "../../components/NavFooter/NavFooter";
import UsersFantasyRanking from "../../components/UsersFantasyRanking/UsersFantasyRanking";
import UsersFortyRanking from "../../components/UsersFortyRanking/UsersFortyRanking";
import UsersResults from "../../components/UsersResults/UsersResults";
import UsersUpcomingBattles from "../../components/UsersUpcomingBattles/UsersUpcomingBattles";
import "./UserDashboard.scss";

export default function UserDashboard() {
  return (
    <>
      <section className="user-dash">
        <DashboardHero />
      </section>
      <UsersFortyRanking />
      <UsersFantasyRanking />
      <UsersUpcomingBattles />
      <UsersResults />
      <NavFooter />
    </>
  );
}
