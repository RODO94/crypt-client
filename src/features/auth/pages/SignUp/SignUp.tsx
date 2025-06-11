import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import logo from "../../../../assets/logo.svg";
import { useState } from "react";
import { useEffect } from "react";
import { signUpAuthentication } from "../../../../utils/UserAuth";
import { SignUpBody } from "../../../../utils/Interfaces";
import { emblemNameArray } from "../../../../utils/EmblemNames";
import { Emblems } from "../../../../utils/emblems";
import { HandleEvent } from "../../../../types/functionTypes";
import InputBox from "../../../../shared/components/ui/InputBox/InputBox";
import Emblem from "../../../../shared/components/ui/Emblem/Emblem";

interface EmblemNameObj {
  lowercase: string;
  original: string;
}

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorClass, setErrorClass] = useState<string>(
    "login__error login__error--hidden"
  );
  const [successClass, setSuccessClass] = useState<string>(
    "signup__sucess signup__success--hidden"
  );
  const [emblemName, setEmblemName] = useState<string | undefined>();

  const [emblemArray, setEmblemArray] = useState<null | EmblemNameObj[]>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const formatEmblemArray = () => {
      const filteredArray = [
        ...emblemNameArray[0].fortyk,
        ...emblemNameArray[0].fantasy,
      ];
      const formattedArray = filteredArray.map((emblem) => {
        const newString = [];
        const splitString = emblem.split(" ");
        for (let i = 0; i < splitString.length; i++) {
          const lowerCaseString = splitString[i].toLowerCase();
          newString.push(lowerCaseString);
        }
        return { lowercase: newString.join(""), original: emblem };
      });

      const sortedArray = formattedArray.sort((a, b) =>
        a.lowercase.localeCompare(b.lowercase)
      );

      setEmblemArray(sortedArray);
      setEmblemName(sortedArray[0].lowercase);
    };
    formatEmblemArray();
  }, []);

  const handleSubmit: HandleEvent = async (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const email = target.email.value;
    const password = target.password.value;
    const confirmPassword = target.confirmpassword.value;
    const firstName = target.firstname.value;
    const lastName = target.lastname.value;
    const knownAs = target.knownas.value;
    const code = target.cryptcode.value;

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

    if (!code || code.toLowerCase() !== "sic nunquam dormi mortui") {
      setErrorClass("signup__error signup__error--visible");
      return setErrorMessage(
        "Ha! You do not possess the correct Crypt Code! Speak with your Lord and return stronger!"
      );
    }

    const requestObj: SignUpBody = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      known_as: knownAs,
      user_emblem: emblemName,
    };

    const response = await signUpAuthentication(requestObj);

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
    <main className='signup'>
      <NavLink to={"/"}>
        <img src={logo} className='signup__logo' />
      </NavLink>
      <form className='signup__form' onSubmit={handleSubmit}>
        <h1 className='signup__form-title'>Sign Up</h1>
        <InputBox name='email' label='Email' type='email' required={true} />
        <InputBox
          name='firstname'
          label='First Name'
          type='text'
          required={true}
        />{" "}
        <InputBox
          name='lastname'
          label='Last Name'
          type='text'
          required={true}
        />{" "}
        <InputBox name='knownas' label='Known As' type='text' required={true} />
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
        />{" "}
        <InputBox
          name='cryptcode'
          label='Crypt Code'
          type='password'
          required={true}
        />
        <label htmlFor='emblem-type' className='signup__label'>
          Emblem
          <select
            name='emblem'
            className='signup__select'
            value={emblemName ? emblemName : "adeptasororitas"}
            onChange={(event) => {
              setEmblemName(event.target.value);
            }}
          >
            {emblemArray?.map((emblem, index) => {
              return (
                <option
                  className='signup__option'
                  key={index}
                  value={emblem.lowercase}
                >
                  {emblem.original}
                </option>
              );
            })}
          </select>
        </label>
        <div className='signup__emblem-wrap'>
          <Emblem
            emblem={emblemName ? (emblemName as Emblems) : "adeptasororitas"}
          />
        </div>
        <h2 className={errorClass}>{errorMessage}</h2>
        <h2 className={successClass}>Sign Up Successful</h2>
        <button type='submit' className='signup__submit-button'>
          Sign Up
        </button>
      </form>
    </main>
  );
}
