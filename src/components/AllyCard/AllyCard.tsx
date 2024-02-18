import { useEffect, useState } from "react";
import "./AllyCard.scss";
import { Player } from "../../utils/Interfaces";
import { getAlly } from "../../utils/UserRequests";
import { useNavigate } from "react-router-dom";
import BattleCard from "../BattleCard/BattleCard";

export default function AllyCard() {
  const [ally, setAlly] = useState<Player>();

  const navigate = useNavigate();
  let allyComp = <p>No Ally Available</p>;

  const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return <p>You need to log in before you can see your Ally</p>;
  }

  useEffect(() => {
    const fetchAlly = async () => {
      const response = await getAlly(token);
      setAlly(response);
    };

    fetchAlly();
  }, []);
  if (ally) {
    allyComp = (
      <BattleCard
        key={crypto.randomUUID()}
        name={ally.name}
        known_as={ally.known_as}
        rank={ally.rank}
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