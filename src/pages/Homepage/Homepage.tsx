import CompletedBattles from "../../components/CompletedBattles/CompletedBattles";
import FantasyTopFive from "../../components/FantasyTopFive/FantasyTopFive ";
import FortyKTopFive from "../../components/FortyKTopFive/FortyKTopFive";
import HomeHero from "../../components/HomeHero/HomeHero";
import NavFooter from "../../components/NavFooter/NavFooter";
import UpcomingBattles from "../../components/UpcomingBattles/UpcomingBattles";
import "./Homepage.scss";

export default function Homepage() {
  return (
    <main>
      <HomeHero />
      <UpcomingBattles />
      <FortyKTopFive />
      <FantasyTopFive />
      <CompletedBattles />
    </main>
  );
}
