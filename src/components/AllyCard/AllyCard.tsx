import { useEffect, useState } from "react";
import "./AllyCard.scss";
import { Player } from "../../utils/Interfaces";
import { getAlly } from "../../utils/UserRequests";
import BattleCard from "../BattleCard/BattleCard";

export default function AllyCard() {
  const [ally, setAlly] = useState<Player>();

  let allyComp = <p>No Ally Available</p>;

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchAlly = async () => {
      if (token) {
        const response = await getAlly(token);
        if (!response) {
          setTimeout(async () => {
            const response = await getAlly(token);
            setAlly(response);
          }, 20);
        }
        setAlly(response);
      }
    };

    fetchAlly();
  }, []);
  if (ally) {
    allyComp = (
      <BattleCard
        key={crypto.randomUUID()}
        name={ally.name}
        known_as={ally.known_as}
        ranking={ally.ranking}
      />
    );
  }
  return (
    <article className="ally__army">
      <h3 className="ally__header">Ally</h3>
      <div className="ally__wrapper">{allyComp}</div>
    </article>
  );
}
