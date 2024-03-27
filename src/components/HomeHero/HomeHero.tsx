import "./HomeHero.scss";
import NavButton from "../NavButton/NavButton";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { verifyUser } from "../../utils/UserRequests";

export default function HomeHero() {
  const userToken = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userValidation = async () => {
      if (userToken) {
        const response = await verifyUser(userToken, 2);
        if (response) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    };
    userValidation();
  }, []);

  return (
    <section className="hero">
      <h1 className="hero__title">
        The Crypt is a Warhammer gaming club in the East Neuk of Fife
      </h1>
      <div className="hero__logo-wrap">
        <img src={logo} alt="the crest of the Crypt" className="hero__logo" />
      </div>
      <div className="hero__button-wrap">
        {!isLoggedIn ? (
          <>
            <NavButton colour="blue" text="Log In" page="/login" />
            <NavButton colour="dark" text="Sign Up" page="/signup" />
          </>
        ) : (
          <>
            <NavButton colour="blue" text="Add Army" page="/armies/add" />
            <NavButton
              colour="dark"
              text="Create Battle"
              page="/battles/create"
            />
          </>
        )}
      </div>
    </section>
  );
}
