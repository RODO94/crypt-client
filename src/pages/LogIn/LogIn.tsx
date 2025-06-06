import { NavLink, useNavigate } from "react-router-dom";
import InputBox from "../../components/InputBox/InputBox";
import NavButton from "../../components/NavButton/NavButton";
import "./LogIn.scss";
import logo from "../../assets/logo.svg";
import {
  forgotPasswordAuthentication,
  loginAuthentication,
} from "../../utils/UserAuth";
import { useState } from "react";
import { useUserStore } from "../../store/user";

export default function LogIn() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorClass, setErrorClass] = useState<string>(
    "login__error login__error--hidden"
  );

  const { setUserRole, setToken, fetchUserInfo, fetchCurrentUser } =
    useUserStore();

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const requestObj = { email: email, password: password };
    const response = await loginAuthentication(requestObj);
    setUserRole(response.role);
    setToken(response.token);
    fetchUserInfo(response.token);
    fetchCurrentUser(response.token);

    if (response === "Invalid Password") {
      setErrorClass("login__error login__error--visible");
      return setErrorMessage("Please check your password and try again");
    }

    if (response === "User has not been found") {
      setErrorClass("login__error login__error--visible");
      return setErrorMessage("Please check your username and try again");
    }

    setErrorClass("login__error login__error--hidden");
    navigate("/user");
  };

  const handleReset = async (event: any) => {
    event.preventDefault();
    const email = event.target.parentElement.email.value;

    if (!email) {
      setErrorClass("signup__error signup__error--visible");
      return setErrorMessage(
        "Please enter your email address so we can send you a reset email"
      );
    }

    const response = await forgotPasswordAuthentication({ email: email });

    if (response === "User is not found, please check the mail") {
      setErrorClass("signup__error signup__error--visible");
      return setErrorMessage(response);
    }

    if (response === "Error retrieving user") {
      setErrorClass("signup__error signup__error--visible");
      return setErrorMessage(response);
    }

    navigate("/forgot-password");
  };

  return (
    <main className="login">
      <NavLink to={"/"}>
        <img src={logo} className="login__logo" />
      </NavLink>
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__form-title">Log In</h1>
        <InputBox name="email" label="Email" type="text" required={true} />
        <InputBox
          name="password"
          label="Password"
          type="password"
          required={true}
        />
        <h2 className={errorClass}>{errorMessage}</h2>
        <div className="login__button-wrap">
          <button type="submit" className="login__submit-button">
            Login
          </button>
          <NavButton colour="dark" text="Sign Up" page="/signup" />{" "}
        </div>
        <button onClick={handleReset} className={"login__form-forgot"}>
          Forgot Password
        </button>
      </form>
    </main>
  );
}
