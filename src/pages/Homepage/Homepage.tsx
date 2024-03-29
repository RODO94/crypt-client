import CompletedBattles from "../../components/CompletedBattles/CompletedBattles";
import FantasyTopFive from "../../components/FantasyTopFive/FantasyTopFive ";
import FortyKTopFive from "../../components/FortyKTopFive/FortyKTopFive";
import Header from "../../components/Header/Header";
import HomeHero from "../../components/HomeHero/HomeHero";

import UpcomingBattles from "../../components/UpcomingBattles/UpcomingBattles";
import "./Homepage.scss";

export default function Homepage() {
  return (
    <main>
      <Header />
      <HomeHero />
      <FortyKTopFive />
      <FantasyTopFive />
      <UpcomingBattles />
      <CompletedBattles />
    </main>
  );
}
