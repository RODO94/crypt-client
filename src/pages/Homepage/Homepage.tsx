import FortyKTopFive from "../../components/FortyKTopFive/FortyKTopFive";
import HomeHero from "../../components/HomeHero/HomeHero";
import UpcomingBattles from "../../components/UpcomingBattles/UpcomingBattles";
import "./Homepage.scss";

export default function Homepage() {
  return (
    <main>
      <HomeHero />
      <UpcomingBattles />
      <FortyKTopFive />
    </main>
  );
}
