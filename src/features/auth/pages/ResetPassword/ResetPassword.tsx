import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.scss";
import logo from "../../../../assets/logo.svg";
import { SyntheticEvent, useState } from "react";
import { Password } from "../../../../utils/Interfaces";
import { resetPasswordAuthentication } from "../../../../utils/UserAuth";
import { InputBox } from "../../../../shared";

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorClass, setErrorClass] = useState<string>(
    "login__error login__error--hidden"
  );
  const [successClass, setSuccessClass] = useState<string>(
    "signup__sucess signup__success--hidden"
  );

  const { token } = useParams();

  const navigate = useNavigate();

  if (!token) {
    navigate("/login");

    return <p>Invalid Token</p>;
  }
  const handleSubmit = async <T extends SyntheticEvent>(event: T) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const password = target.password.value;
    const confirmPassword = target.confirmpassword.value;

    if (!password || !confirmPassword) {
      setErrorClass("signup__error signup__error--visible");
      return setErrorMessage("Please fill out all of the fields to sign up");
    }

    if (password !== confirmPassword) {
      setErrorClass("login__error login__error--visible");
      return setErrorMessage(
        "The two passwords you entered do not match, please check them and submit again"
      );
    }

    const requestObj: Password = {
      password: password,
    };

    const response = await resetPasswordAuthentication(token, requestObj);

    if (response === "User cannot be located, you may need to sign up first") {
      setErrorClass("resetpassword__error resetpassword__error--visible");
      return setErrorMessage(
        "User cannot be located, you may need to sign up first"
      );
    }
    if (response === "Unable to change the password") {
      setErrorClass("resetpassword__error resetpassword__error--visible");
      return setErrorMessage(
        "We are unable to change your password right now, please try again and it the problem persists, please get in touch with your tech support"
      );
    }

    setErrorClass("resetpassword__error resetpassword__error--hidden");
    setSuccessClass("resetpassword__success resetpassword__success--visible");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <section className='resetpassword'>
      <NavLink to={"/"}>
        <img src={logo} className='resetpassword__logo' />
      </NavLink>
      <form className='resetpassword__form' onSubmit={handleSubmit}>
        <h1 className='resetpassword__form-title'>Reset Password</h1>
        <InputBox
          name='password'
          label='Password'
          type='password'
          required={true}
        />
        <InputBox
          name='confirmpassword'
          label='Confirm Password'
          type='password'
          required={true}
        />
        <h2 className={errorClass}>{errorMessage}</h2>
        <h2 className={successClass}>Sign Up Successful</h2>
        <button type='submit' className='resetpassword__submit-button'>
          Submit
        </button>
      </form>
    </section>
  );
}
