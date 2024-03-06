import { NavLink } from "react-router-dom";
import "./NavFooter.scss";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import rankings from "../../assets/rankings.svg";
import home from "../../assets/home.svg";
import battles from "../../assets/battles.svg";

export default function NavFooter() {
  const [toggleBool, setToggleBool] = useState(false);
  const [battleToggle, setBattleToggle] = useState(false);
  const [rankingsToggle, setRankingsToggle] = useState(false);
  const classNameFn = (isActive: boolean) =>
    isActive ? "footer-nav__link footer-nav__link--active" : "footer-nav__link";

  const userToken = sessionStorage.getItem("token");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
    },
  });

  const handleToggle = (type: string) => {
    if (type === "battles") {
      if (battleToggle === true) {
        setBattleToggle(false);
      } else {
        setBattleToggle(true);
      }
    }
    if (type === "rankings") {
      if (rankingsToggle === true) {
        setRankingsToggle(false);
      } else {
        setRankingsToggle(true);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <footer className={"footer"}>
        <nav className="footer-nav">
          <article className="footer-nav__nav-container">
            <div
              className="footer-nav__clickable-div"
              onClick={() => {
                handleToggle("battles");
              }}
            >
              <img
                src={battles}
                alt="two swords crossed for battle navigation"
                className="footer-nav__icons"
              />
              <p className="footer-nav__icon-txt">Battles</p>
            </div>
            <div
              className={
                battleToggle ? "footer-nav__links" : "footer-nav__links--hide"
              }
            >
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                to={"/battles/completed"}
              >
                Completed <br /> Battles
              </NavLink>{" "}
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                to={"/battles/upcoming"}
              >
                Upcoming <br /> Battles
              </NavLink>
            </div>
          </article>
          <NavLink
            className={({ isActive }) => classNameFn(isActive)}
            to={userToken ? "/user" : "/"}
          >
            <img
              src={home}
              alt="fortress icon for home navigation"
              className="footer-nav__icons"
            />
            <p className="footer-nav__icon-txt">Home</p>
          </NavLink>{" "}
          <article className="footer-nav__nav-container">
            <div
              className={
                rankingsToggle ? "footer-nav__links" : "footer-nav__links--hide"
              }
            >
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                to={"/rankings/40k"}
              >
                40,000 <br /> Rankings
              </NavLink>{" "}
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                to={"/rankings/fantasy"}
              >
                Fantasy <br />
                Rankings
              </NavLink>
            </div>
            <div
              className="footer-nav__clickable-div"
              onClick={() => {
                handleToggle("rankings");
              }}
            >
              <img
                src={rankings}
                alt="Armoured fist for ranking navigation"
                className="footer-nav__icons"
              />
              <p className="footer-nav__icon-txt">Rankings</p>
            </div>
          </article>
          {/* <NavLink
            className={({ isActive }) => classNameFn(isActive)}
            to={"/user/profile"}
          >
            Profile
          </NavLink> */}
          {/* {userToken ? (
            <NavLink
              className={({ isActive }) => classNameFn(isActive)}
              to={"/user"}
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              className={({ isActive }) => classNameFn(isActive)}
              to={"/login"}
            >
              Login
            </NavLink>
          )} */}
        </nav>
      </footer>
    </ThemeProvider>
  );
}
