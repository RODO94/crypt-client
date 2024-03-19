import "./HomeHero.scss";
import NavButton from "../NavButton/NavButton";
import logo from "../../assets/logo.svg";

export default function HomeHero() {
  return (
    <section className="hero">
      <h1 className="hero__title">
        The Crypt is a Warhammer gaming club in the East Neuk of Fife
      </h1>
      <div className="hero__logo-wrap">
        <img src={logo} alt="the crest of the Crypt" className="hero__logo" />
      </div>
      <div className="hero__button-wrap">
        <NavButton colour="blue" text="Log In" page="/login" />
        <NavButton colour="dark" text="Sign Up" page="/signup" />
      </div>
    </section>
  );
}
