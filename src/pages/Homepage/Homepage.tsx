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
      <section className="homepage__content">
        <div className="homepage__rankings">
          <FortyKTopFive />
          <FantasyTopFive />
        </div>
        <UpcomingBattles />
        <CompletedBattles />
      </section>
    </main>
  );
}
