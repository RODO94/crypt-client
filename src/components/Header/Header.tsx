import "./Header.scss";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="the Crypt logo" className="header__img" />
    </header>
  );
}
