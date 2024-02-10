import { NavLink, useNavigate } from "react-router-dom";
import InputBox from "../../components/InputBox/InputBox";
import "./SignUp.scss";
import logo from "../../assets/logo.svg";
import { signupAuthentication } from "../../utils/UserAuth";
import { useState } from "react";
import { SignUpBody } from "../../utils/Interfaces";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorClass, setErrorClass] = useState<string>(
    "login__error login__error--hidden"
  );
  const [successClass, setSuccessClass] = useState<string>(
    "signup__sucess signup__success--hidden"
  );

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmpassword.value;
    const firstName = event.target.firstname.value;
    const lastName = event.target.lastname.value;
    const knownAs = event.target.knownas.value;

    if (password !== confirmPassword) {
      setErrorClass("login__error login__error--visible");
      return setErrorMessage(
        "The two passwords you entered do not match, please check them and submit again"
      );
    }

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !knownAs
    ) {
      setErrorClass("signup__error signup__error--visible");
      return setErrorMessage("Please fill out all of the fields to sign up");
    }

    const requestObj: SignUpBody = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      known_as: knownAs,
    };

    const response = await signupAuthentication(requestObj);

    if (response === "Registration Failed") {
      setErrorClass("signup__error signup__error--visible");
      return setErrorMessage(
        "We have been unable to sign you up right now, please try again and if this continues, get in touch with your tech support"
      );
    }

    setErrorClass("signup__error signup__error--hidden");
    setSuccessClass("signup__success signup__success--visible");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <main className="signup">
      <NavLink to={"/"}>
        <img src={logo} className="signup__logo" />
      </NavLink>
      <form className="signup__form" onSubmit={handleSubmit}>
        <h1 className="signup__form-title">Sign Up</h1>
        <InputBox name="email" label="Email" type="email" required={true} />
        <InputBox
          name="firstname"
          label="First Name"
          type="text"
          required={true}
        />{" "}
        <InputBox
          name="lastname"
          label="Last Name"
          type="text"
          required={true}
        />{" "}
        <InputBox name="knownas" label="Known As" type="text" required={true} />
        <InputBox
          name="password"
          label="Password"
          type="password"
          required={true}
        />
        <InputBox
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          required={true}
        />
        <h2 className={errorClass}>{errorMessage}</h2>
        <h2 className={successClass}>Sign Up Successful</h2>
        <button type="submit" className="signup__submit-button">
          Sign Up
        </button>
      </form>
    </main>
  );
}
