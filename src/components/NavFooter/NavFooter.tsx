import { NavLink } from "react-router-dom";
import "./NavFooter.scss";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import rankings from "../../assets/rankings.svg";
import home from "../../assets/home.svg";
import battles from "../../assets/battles.svg";
import PersonIcon from "@mui/icons-material/Person";
import profile from "../../assets/profile.svg";

export default function NavFooter() {
  const [battleToggle, setBattleToggle] = useState(false);
  const [rankingsToggle, setRankingsToggle] = useState(false);
  const [battleActiveBool, setBattleActiveBool] = useState(false);
  const [rankingActiveBool, setRankingActiveBool] = useState(false);
  const classNameFn = (isActive: boolean) =>
    isActive ? "footer-nav__link footer-nav__link--active" : "footer-nav__link";

  const toggleClassNameFn = (isActive: boolean) => {
    console.log(isActive);
    return isActive
      ? "footer-nav__nav-container footer-nav__nav-container--active"
      : "footer-nav__nav-container";
  };

  const userNavClassNameFn = (token: string | null, isActive: Boolean) => {
    return token && isActive
      ? "footer-nav__link footer-nav__link--active"
      : token && !isActive
      ? "footer-nav__link"
      : "footer-nav__link--hide";
  };

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
          <article className={toggleClassNameFn(battleActiveBool)}>
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
                onClick={() => {
                  setBattleActiveBool(true);
                  setRankingActiveBool(false);
                }}
              >
                Completed <br /> Battles
              </NavLink>{" "}
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                to={"/battles/upcoming"}
                onClick={() => {
                  setBattleActiveBool(true);
                  setRankingActiveBool(false);
                }}
              >
                Upcoming <br /> Battles
              </NavLink>
            </div>
          </article>
          <NavLink
            className={({ isActive }) =>
              userNavClassNameFn(userToken, isActive)
            }
            to={"/user"}
            onClick={() => {}}
          >
            <PersonIcon style={{ width: "2.5rem", height: "2rem" }} />
            <p className="footer-nav__icon-txt">User</p>
          </NavLink>{" "}
          <NavLink className={({ isActive }) => classNameFn(isActive)} to="/">
            <img
              src={home}
              alt="fortress icon for home navigation"
              className="footer-nav__icons"
            />
            <p className="footer-nav__icon-txt">Home</p>
          </NavLink>{" "}
          <article className={toggleClassNameFn(rankingActiveBool)}>
            <div
              className={
                rankingsToggle ? "footer-nav__links" : "footer-nav__links--hide"
              }
            >
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                to={"/rankings/40k"}
                onClick={() => {
                  setBattleActiveBool(false);
                  setRankingActiveBool(true);
                }}
              >
                40,000 <br /> Rankings
              </NavLink>{" "}
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                to={"/rankings/fantasy"}
                onClick={() => {
                  console.log("triggered");
                  setBattleActiveBool(false);
                  setRankingActiveBool(true);
                }}
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
              <p className="footer-nav__icon-txt">Rank</p>
            </div>
          </article>
          <NavLink
            onClick={() => {}}
            className={({ isActive }) =>
              userNavClassNameFn(userToken, isActive)
            }
            to={"/user/profile"}
          >
            <img
              src={profile}
              alt="fortress icon for home navigation"
              className="footer-nav__icons"
            />
            <p className="footer-nav__icon-txt">Profile</p>
          </NavLink>{" "}
        </nav>
      </footer>
    </ThemeProvider>
  );
}
