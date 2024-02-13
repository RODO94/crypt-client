import AllyCard from "../AllyCard/AllyCard";
import NavFooter from "../NavFooter/NavFooter";
import NemesisCard from "../NemesisCard/NemesisCard";
import NextBattleCard from "../NextBattleCard/NextBattleCard";
import UsersFantasyRanking from "../UsersFantasyRanking/UsersFantasyRanking";
import UsersFortyRanking from "../UsersFortyRanking/UsersFortyRanking";
import UsersResults from "../UsersResults/UsersResults";
import UsersUpcomingBattles from "../UsersUpcomingBattles/UsersUpcomingBattles";
import "./DashboardHero.scss";

export default function DashboardHero() {
  return (
    <section className="dashboard-hero">
      <NextBattleCard />
      <NemesisCard />
      <AllyCard />
      <UsersFortyRanking />
      <UsersFantasyRanking />
      <UsersUpcomingBattles />
      <UsersResults />
      <NavFooter />
    </section>
  );
}
