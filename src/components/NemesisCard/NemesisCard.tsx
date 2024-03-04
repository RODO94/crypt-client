import { useEffect, useState } from "react";
import "./NemesisCard.scss";
import { Player } from "../../utils/Interfaces";
import { getNemesis } from "../../utils/UserRequests";
import { useNavigate } from "react-router-dom";
import BattleCard from "../BattleCard/BattleCard";

export default function NemesisCard() {
  const [nemesis, setNemesis] = useState<Player>();

  const navigate = useNavigate();
  let nemesisComp = <p>No Nemesis Available</p>;

  const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return <p>You need to log in before you can see your Nemesis</p>;
  }

  useEffect(() => {
    const fetchNemesis = async () => {
      const response = await getNemesis(token);
      console.log(response);
      setNemesis(response);
    };

    fetchNemesis();
  }, []);
  if (nemesis) {
    nemesisComp = (
      <BattleCard
        key={crypto.randomUUID()}
        name={nemesis.name}
        known_as={nemesis.known_as}
        rank={nemesis.rank}
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
