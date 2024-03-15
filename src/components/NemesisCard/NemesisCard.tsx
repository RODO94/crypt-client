import { useEffect, useState } from "react";
import "./NemesisCard.scss";
import { Player } from "../../utils/Interfaces";
import { getNemesis } from "../../utils/UserRequests";
import BattleCard from "../BattleCard/BattleCard";

export default function NemesisCard() {
  const [nemesis, setNemesis] = useState<Player>();

  let nemesisComp = <p>No Nemesis Available</p>;

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchNemesis = async () => {
      if (token) {
        const response = await getNemesis(token, 5);
        setNemesis(response);
      }
    };

    fetchNemesis();
  }, []);
  if (nemesis) {
    nemesisComp = (
      <BattleCard
        key={crypto.randomUUID()}
        name={nemesis.name}
        known_as={nemesis.known_as}
        ranking={nemesis.ranking}
      />
    );
  }
  return (
    <article className="nemesis__army">
      <h3 className="nemesis__header">Nemesis</h3>
      <div className="nemesis__wrapper">{nemesisComp}</div>
    </article>
  );
}
