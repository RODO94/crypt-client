import "./HomeHero.scss";
import birdsEyeBattle from "../../assets/birdseye-battle.png";
import NavButton from "../NavButton/NavButton";

export default function HomeHero() {
  return (
    <section className="hero">
      <img
        src={birdsEyeBattle}
        alt="birds eye view of a warhammer battle table"
        className="hero__img"
      />
      <h1 className="hero__title">
        The Crypt is a Warhammer gaming club in the East Neuk of Fife
      </h1>
      <div className="hero__button-wrap">
        <NavButton colour="blue" text="Member's Log In" page="" />
        <NavButton colour="dark" text="Sign Up" page="" />
      </div>
    </section>
  );
}
