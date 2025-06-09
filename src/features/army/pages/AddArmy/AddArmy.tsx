import { ArrowLeftIcon } from "@mui/x-date-pickers";
import "./AddArmy.scss";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useArmiesStore } from "../../../../store/armies";
import { useUserStore } from "../../../../store/user";
import { emblemNameArray } from "../../../../utils/EmblemNames";
import { addArmyRequest } from "../../../../utils/ArmyRequests";
import { Emblem, Header } from "../../../../shared";

interface EmblemNameObj {
  lowercase: string;
  original: string;
}

export default function AddArmy() {
  const [successBool, setSuccessBool] = useState(false);
  const [loadingBool, setLoadingBool] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("40k");
  const [emblemName, setEmblemName] = useState("tau");

  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [emblemNameError, setEmblemNameError] = useState(false);

  const [emblemArray, setEmblemArray] = useState<null | EmblemNameObj[]>(null);

  const navigate = useNavigate();

  const { fetchAllArmies, fetchArmyDetails, fetchUserArmies } =
    useArmiesStore();
  const { token, currentUser } = useUserStore();
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    const formatEmblemArray = () => {
      const filteredArray =
        type === "40k" ? emblemNameArray[0].fortyk : emblemNameArray[0].fantasy;
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
  }, [type]);

  const addArmy = async () => {
    let nameErr = false;
    let typeErr = false;
    let emblemErr = false;
    if (!name) {
      nameErr = true;
      setNameError(true);
    }
    if (!type) {
      typeErr = true;
      setTypeError(true);
    }
    if (!emblemName) {
      emblemErr = true;
      setEmblemNameError(true);
    }

    if (nameErr || typeErr || emblemErr) {
      return;
    }

    const requestBody = { name: name, type: type, emblem: emblemName };

    try {
      setLoadingBool(true);
      if (token) {
        const response = await addArmyRequest(token, requestBody, 2);
        if (response) {
          setLoadingBool(false);
          setSuccessBool(true);
          fetchAllArmies();
          if (currentUser?.id) {
            fetchUserArmies(currentUser?.id);
          }
          fetchArmyDetails(response.id);
          setTimeout(() => {
            navigate(`/armies/information`, { state: { id: response.id } });
          }, 1000);
        }
      }
    } catch (error: any) {
      console.error(error);
      return error.response.data;
    }
  };

  if (!emblemArray) {
    return (
      <div className='loading-message'>
        <CircularProgress style={{ color: "green" }} />
      </div>
    );
  }

  return (
    <>
      <main className='add-army'>
        <Header />{" "}
        <section className='add-army__section'>
          <h2 className='add-army__header'>Add New Army</h2>
          <div
            onClick={() => {
              navigate(-1);
            }}
            className='add-army__back-arrow'
          >
            <ArrowLeftIcon />
          </div>
          <form className='add-army__form'>
            <label htmlFor='name' className='add-army__label'>
              Army Name
              <input
                type='text'
                value={name}
                onChange={(event) => {
                  nameError ? setNameError(false) : nameError;
                  setName(event.target.value);
                }}
                name='name'
                className='add-army__input'
              />
              <p
                className={
                  nameError ? "add-army__error" : "add-army__error--hide"
                }
              >
                Please add an Army Name
              </p>
            </label>
            <label htmlFor='army-type' className='add-army__label'>
              Army Type
              <select
                name='army-type'
                className='add-army__select'
                value={type}
                onChange={(event) => {
                  typeError ? setTypeError(false) : typeError;
                  setType(event.target.value);
                }}
              >
                <option value='40k'>40k</option>
                <option value='fantasy'>Fantasy</option>
              </select>
              <p
                className={
                  typeError ? "add-army__error" : "add-army__error--hide"
                }
              >
                Please add an Army Type
              </p>
            </label>
            <label htmlFor='army-emblem' className='add-army__label'>
              Emblem
              <select
                name='emblem'
                className='add-army__select'
                value={emblemName}
                onChange={(event) => {
                  emblemNameError ? setEmblemNameError(false) : emblemNameError;
                  setEmblemName(event.target.value);
                }}
              >
                {emblemArray.map((emblem, index) => {
                  return (
                    <option key={index} value={emblem.lowercase}>
                      {emblem.original}
                    </option>
                  );
                })}
              </select>
              <p
                className={
                  emblemNameError ? "add-army__error" : "add-army__error--hide"
                }
              >
                Please add an Army Emblem
              </p>
            </label>
            <div className='add-army__emblem-wrap'>
              <Emblem emblem={emblemName} />
            </div>

            {!successBool && !loadingBool ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  addArmy();
                }}
                className='add-army__add'
              >
                Add Army
              </button>
            ) : loadingBool && !successBool ? (
              <div className='add-army__success-message'>
                <CircularProgress />
              </div>
            ) : (
              <div className='add-army__success-message'>
                <span>Army Added!</span> <DoneIcon />
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
