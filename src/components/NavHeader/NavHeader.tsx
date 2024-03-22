import { useState } from "react";
import "./NavHeader.scss";
import { NavLink } from "react-router-dom";
import rankings from "../../assets/rankings.svg";
import home from "../../assets/home.svg";
import battles from "../../assets/battles.svg";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import profile from "../../assets/profile.svg";

export default function NavHeader() {
  const [toggleBool, setToggleBool] = useState(false);
  const [battleToggle, setBattleToggle] = useState(false);
  const [rankingsToggle, setRankingsToggle] = useState(false);
  const [battleActiveBool, setBattleActiveBool] = useState(false);
  const [rankingActiveBool, setRankingActiveBool] = useState(false);

  const userToken = sessionStorage.getItem("token");
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
    },
  });

  const classNameFn = (isActive: boolean) =>
    isActive ? "header-nav__link header-nav__link--active" : "header-nav__link";

  const handleClick = () => {
    toggleBool ? setToggleBool(false) : setToggleBool(true);
  };

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
      <header
        className={toggleBool ? "header-nav header-nav--toggled" : "header-nav"}
      >
        <div onClick={handleClick} className="header-nav__toggle">
          {toggleBool ? (
            <MenuOpenIcon
              color="primary"
              style={{
                height: "2.25rem",
                width: "2.25rem",
                borderRadius: "12px",
              }}
            />
          ) : (
            <MenuIcon
              color="primary"
              style={{
                height: "2.25rem",
                width: "2.25rem",
                borderRadius: "12px",
              }}
            />
          )}
        </div>
        <nav
          className={toggleBool ? "header-nav__nav" : "header-nav__nav--hide"}
        >
          <article
            className={
              battleActiveBool
                ? "header-nav__nav-container header-nav__nav-container--active"
                : "header-nav__nav-container"
            }
          >
            <div
              className="header-nav__clickable-div"
              onClick={() => {
                handleToggle("battles");
              }}
            >
              <img
                src={battles}
                alt="two swords crossed for battle navigation"
                className="header-nav__icons"
              />
              <p className="header-nav__icon-txt">Battles</p>
            </div>
            <div
              className={
                battleToggle ? "header-nav__links" : "header-nav__links--hide"
              }
            >
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                to={"/battles/completed"}
                onClick={() => {
                  if (rankingActiveBool === true) {
                    setRankingActiveBool(false);
                  }
                  setBattleActiveBool(true);
                  setToggleBool(false);
                }}
              >
                Completed <br /> Battles
              </NavLink>{" "}
              <NavLink
                className={({ isActive }) => classNameFn(isActive)}
                onClick={() => {
                  if (rankingActiveBool === true) {
                    setRankingActiveBool(false);
                  }
                  setBattleActiveBool(true);
                  setToggleBool(false);
                }}
                to={"/battles/upcoming"}
              >
                Upcoming <br /> Battles
              </NavLink>
            </div>
          </article>
          <div
            className={
              userToken ? "header-nav__user-nav" : "header-nav__user-nav--hide"
            }
          >
            <NavLink
              className={({ isActive }) => classNameFn(isActive)}
              to={"/user"}
              onClick={() => {
                setToggleBool(false);
              }}
            >
              <PersonIcon style={{ width: "2.5rem", height: "2.5rem" }} />
              <p className="header-nav__icon-txt">Dashboard</p>
            </NavLink>{" "}
          </div>
          <NavLink
            className={({ isActive }) => classNameFn(isActive)}
            to={"/"}
            onClick={() => {
              setToggleBool(false);
            }}
          >
            <img
              src={home}
              alt="fortress icon for home navigation"
              className="header-nav__icons"
            />
            <p className="header-nav__icon-txt">Home</p>
          </NavLink>{" "}
          <article
            className={
              rankingActiveBool
                ? "header-nav__nav-container header-nav__nav-container--active"
                : "header-nav__nav-container"
            }
          >
            <div
              className="header-nav__clickable-div"
              onClick={() => {
                handleToggle("rankings");
              }}
            >
              <img
                src={rankings}
                alt="Armoured fist for ranking navigation"
                className="header-nav__icons"
              />
              <p className="header-nav__icon-txt">Rankings</p>
            </div>
            <div
              className={
                rankingsToggle ? "header-nav__links" : "header-nav__links--hide"
              }
            >
              <NavLink
                onClick={() => {
                  if (battleActiveBool === true) {
                    setBattleActiveBool(false);
                  }
                  setRankingActiveBool(true);
                  setToggleBool(false);
                }}
                className={({ isActive }) => classNameFn(isActive)}
                to={"/rankings/40k"}
              >
                40,000 <br /> Rankings
              </NavLink>{" "}
              <NavLink
                onClick={() => {
                  if (battleActiveBool === true) {
                    setBattleActiveBool(false);
                  }
                  setRankingActiveBool(true);
                  setToggleBool(false);
                }}
                className={({ isActive }) => classNameFn(isActive)}
                to={"/rankings/fantasy"}
              >
                Fantasy <br />
                Rankings
              </NavLink>
            </div>
          </article>
          <div
            className={
              userToken ? "header-nav__user-nav" : "header-nav__user-nav--hide"
            }
          >
            <NavLink
              onClick={() => {
                setToggleBool(false);
              }}
              className={({ isActive }) => classNameFn(isActive)}
              to={"/user/profile"}
            >
              <img
                src={profile}
                alt="fortress icon for home navigation"
                className="header-nav__icons"
              />
              <p className="header-nav__icon-txt">Profile</p>
            </NavLink>{" "}
          </div>
        </nav>
      </header>
    </ThemeProvider>
  );
}
