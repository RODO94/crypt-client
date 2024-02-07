import "./HomeHero.scss";
import birdsEyeBattle from "../../assets/birdseye-battle.png";
import NavButton from "../NavButton/NavButton";

export default function HomeHero() {
  return (
    <section className="hero">
      <h1 className="hero__title">
        The Crypt is a Warhammer gaming club in the East Neuk of Fife
      </h1>
      <div className="hero__button-wrap">
        <NavButton colour="blue" text="Log In" page="" />
        <NavButton colour="dark" text="Sign Up" page="" />
      </div>
    </section>
  );
}
