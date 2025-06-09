import "./Header.scss";
import logo from "../../../../assets/logo.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className='header'>
      <NavLink to={"/"}>
        <img src={logo} alt='the Crypt logo' className='header__img' />
      </NavLink>
    </header>
  );
}
