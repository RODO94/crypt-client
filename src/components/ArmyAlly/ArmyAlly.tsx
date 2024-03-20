import { useEffect, useState } from "react";
import "./ArmyAlly.scss";
import { getArmyAlly } from "../../utils/ArmyRequests";
import BattleCard from "../BattleCard/BattleCard";
import { AllyObj } from "../../utils/Interfaces";

interface ArmyID {
  armyID: string;
}

export default function ArmyAlly({ armyID }: ArmyID) {
  const [allyObj, setAllyObj] = useState<AllyObj | null>(null);

  useEffect(() => {
    const fetchArmyAlly = async () => {
      const response = await getArmyAlly(armyID);
      setAllyObj(response);
    };
    fetchArmyAlly();
  }, []);
  return (
    <section className="army-ally">
      <div className="army-ally__header">
        <h3 className="army-ally__title"> Ally (who you play with the most)</h3>
      </div>
      <article className="army-ally__army-card">
        {allyObj?.count === undefined ? (
          <p className="army-ally__undefined-text">You have no Allies!</p>
        ) : (
          <>
            <div className="army-ally__army-wrap">
              <BattleCard
                name={allyObj?.name}
                known_as={allyObj?.known_as}
                ranking={allyObj?.ranking}
                army_id={allyObj?.armyID}
                emblem={allyObj?.emblem}
              />
            </div>
            <p className="army-ally__txt">{`${allyObj?.count} games`}</p>
          </>
        )}
      </article>
    </section>
  );
}
