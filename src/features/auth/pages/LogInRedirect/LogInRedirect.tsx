import { NavLink, useNavigate } from "react-router-dom";
import "./LogInRedirect.scss";
import logo from "../../../../assets/logo.svg";
import { useState } from "react";
import { useUserStore } from "../../../../store/user";
import {
  forgotPasswordAuthentication,
  loginAuthentication,
} from "../../../../utils/UserAuth";
import { HandleEvent } from "../../../../types/functionTypes";
import InputBox from "../../../../shared/components/ui/InputBox/InputBox";
import NavButton from "../../../../shared/components/layout/NavButton/NavButton";

export default function LogInRedirect() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorClass, setErrorClass] = useState<string>(
    "login__error login__error--hidden"
  );
  const { setUserRole } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit: HandleEvent = async (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const email = target.email.value;
    const password = target.password.value;
    const requestObj = { email: email, password: password };
    const response = await loginAuthentication(requestObj);
    setUserRole(response.role);

    if (response === "Invalid Password") {
      setErrorClass("login__error login__error--visible");
      return setErrorMessage("Please check your password and try again");
    }

    if (response === "User has not been found") {
      setErrorClass("login__error login__error--visible");
      return setErrorMessage("Please check your username and try again");
    }

    setErrorClass("login__error login__error--hidden");

    navigate(-1);
  };

  const handleReset: HandleEvent = async (event) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    if (!target || !target.parentElement) {
      return "No Target";
    }
    const emailElement = target.parentElement.children.namedItem(
      "email"
    ) as HTMLInputElement;

    const email = emailElement.value;
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
    <main className='login'>
      <NavLink to={"/"}>
        <img src={logo} className='login__logo' />
      </NavLink>
      <form className='login__form' onSubmit={handleSubmit}>
        <h1 className='login__form-title'>Log In</h1>
        <InputBox name='email' label='Email' type='text' required={true} />
        <InputBox
          name='password'
          label='Password'
          type='password'
          required={true}
        />
        <h2 className={errorClass}>{errorMessage}</h2>
        <div className='login__button-wrap'>
          <button type='submit' className='login__submit-button'>
            Login
          </button>
          <NavButton colour='dark' text='Sign Up' page='/signup' />{" "}
        </div>
        <button onClick={handleReset} className={"login__form-forgot"}>
          Forgot Password
        </button>
      </form>
    </main>
  );
}
