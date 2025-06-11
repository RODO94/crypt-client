import { CompletedBattles, UpcomingBattles } from "../features/battle";
import { FantasyTopFive, FortyKTopFive } from "../features/ranking";
import Header from "../shared/components/layout/Header/Header";
import HomeHero from "../shared/components/layout/HomeHero/HomeHero";
import "./Homepage.scss";

export default function Homepage() {
  return (
    <main>
      <Header />
      <HomeHero />
      <section className='homepage__content'>
        <div className='homepage__rankings'>
          <FortyKTopFive />
          <FantasyTopFive />
        </div>
        <UpcomingBattles />
        <CompletedBattles />
      </section>
    </main>
  );
}
