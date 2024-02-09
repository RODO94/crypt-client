import { NavLink } from "react-router-dom";
import "./NavFooter.scss";

export default function NavFooter() {
  const classNameFn = (isActive: boolean) =>
    isActive ? "footer-nav__link footer-nav__link--active" : "footer-nav__link";

  return (
    <footer className={"footer"}>
      <nav className="footer-nav">
        <NavLink className={({ isActive }) => classNameFn(isActive)} to={"/"}>
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
        <NavLink
          className={({ isActive }) => classNameFn(isActive)}
          to={"/login"}
        >
          Login
        </NavLink>
      </nav>
    </footer>
  );
}
