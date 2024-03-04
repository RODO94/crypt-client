import { NavLink } from "react-router-dom";
import "./NavFooter.scss";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

export default function NavFooter() {
  const [toggleBool, setToggleBool] = useState(false);
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

  return (
    <ThemeProvider theme={theme}>
      <footer className={toggleBool ? "footer" : "footer footer--closed"}>
        {!toggleBool ? (
          <nav
            onClick={() => {
              setToggleBool(true);
            }}
            className="footer-nav footer-nav--closed"
          >
            <MenuOpenIcon color="primary" />
          </nav>
        ) : (
          <nav className="footer-nav">
            <NavLink
              className={({ isActive }) => classNameFn(isActive)}
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => classNameFn(isActive)}
              to={"/battles/upcoming"}
            >
              Upcoming <br /> Battles
            </NavLink>
            <NavLink
              className={({ isActive }) => classNameFn(isActive)}
              to={"/battles/completed"}
            >
              Completed <br />
              Battles
            </NavLink>
            <NavLink
              className={({ isActive }) => classNameFn(isActive)}
              to={"/rankings/40k"}
            >
              40k <br /> Rankings
            </NavLink>
            <NavLink
              className={({ isActive }) => classNameFn(isActive)}
              to={"/rankings/fantasy"}
            >
              Fantasy <br /> Rankings
            </NavLink>
            {userToken ? (
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
            )}
            <div
              onClick={() => {
                setToggleBool(false);
              }}
            >
              <MenuIcon color="primary" />
            </div>
          </nav>
        )}
      </footer>
    </ThemeProvider>
  );
}
