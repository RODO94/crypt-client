import { NavLink } from "react-router-dom";
import "./ForgotPassword.scss";
import logo from "../../assets/logo.svg";

("a332b7dc-5a50-42c7-9f65-c029a9496035");

export default function ForgotPassword() {
  return (
    <main className="forgotpassword">
      <NavLink to={"/"}>
        <img src={logo} className="forgotpassword__logo" />
      </NavLink>
      <form className="forgotpassword__form">
        <h1 className="forgotpassword__form-title">Email Sent!</h1>
        <p className="forgotpassword__txt">
          We have sent you an email containing your reset password link, please
          open it to reset
        </p>
      </form>
    </main>
  );
}
