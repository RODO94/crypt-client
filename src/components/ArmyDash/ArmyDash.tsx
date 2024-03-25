import { useEffect, useState } from "react";
import { ArmyObj } from "../../utils/Interfaces";
import "./ArmyDash.scss";
import EmblemHero from "../EmblemHero/EmblemHero";
import BattleCard from "../BattleCard/BattleCard";
import logo from "../../assets/logo.svg";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

interface armyDashObj {
  winPercent: string;
  battleCount: number;
  armyObj: ArmyObj;
  armyRank: number;
  owner: string;
}

export default function ArmyDash({
  winPercent,
  battleCount,
  armyObj,
  armyRank,
  owner,
}: armyDashObj) {
  const [emblemName, setEmblemName] = useState(armyObj.emblem);

  const navigate = useNavigate();

  useEffect(() => {
    const stringArray = emblemName.split(" ");
    let newString = [];
    for (let i = 0; i < stringArray.length; i++) {
      let lowerCaseString = stringArray[i].toLowerCase();
      newString.push(lowerCaseString);
    }
    setEmblemName(newString.join(""));
  }, [armyObj]);

  if (!owner) {
    return;
  }

  return (
    <section className="army-dash">
      <EmblemHero emblem={emblemName} />
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="army-dash__back-arrow"
      >
        <ArrowLeftIcon /> Back
      </div>
      <div className="army-dash__header">
        <h2 className="army-dash__title">Army Information</h2>
        <img className="army-dash__logo" src={logo} alt="the crypt emblem" />
      </div>
      <div className="army-dash__army-wrap">
        <h3 className="army-dash__label">Army</h3>
        <article className="army-dash__army-card">
          <BattleCard name={armyObj.name} emblem={armyObj.emblem} />
        </article>
      </div>
      <div className="army-dash__stat-container">
        <article className="army-dash__stat-wrap">
          <h3 className="army-dash__label">Owner</h3>
          <p className="army-dash__stat">{owner}</p>
        </article>
        <article className="army-dash__stat-wrap">
          <h3 className="army-dash__label">Rank</h3>
          <p className="army-dash__stat">{armyRank}</p>
        </article>
        <article className="army-dash__stat-wrap">
          <h3 className="army-dash__label">Battles Completed</h3>
          <p className="army-dash__stat">{battleCount}</p>
        </article>
        <article className="army-dash__stat-wrap">
          <h3 className="army-dash__label">Win Percentage</h3>
          <p className="army-dash__stat">{`${winPercent}%`}</p>
        </article>
      </div>
    </section>
  );
}
