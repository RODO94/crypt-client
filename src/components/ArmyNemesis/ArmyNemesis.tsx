import { useEffect, useState } from "react";
import "./ArmyNemesis.scss";
import { getArmyNemesis } from "../../utils/ArmyRequests";
import { AllyObj } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";

interface ArmyNemesis {
  armyID: string;
}

export default function ArmyNemesis({ armyID }: ArmyNemesis) {
  const [nemesisObj, setNemesisObj] = useState<AllyObj | null>(null);

  useEffect(() => {
    const fetchArmyNemesis = async () => {
      const response = await getArmyNemesis(armyID);
      setNemesisObj(response);
    };
    fetchArmyNemesis();
  }, []);

  return (
    <section className="army-nemesis">
      <div className="army-nemesis__header">
        <h3 className="army-nemesis__title">
          {" "}
          Nemesis (who you play with the most)
        </h3>
      </div>
      <article className="army-nemesis__army-card">
        {nemesisObj?.count === undefined ? (
          <p className="army-nemesis__undefined-text">You have no Nemesis!</p>
        ) : (
          <>
            <div className="army-nemesis__army-wrap">
              <BattleCard
                name={nemesisObj?.name}
                known_as={nemesisObj?.known_as}
                rank={nemesisObj?.rank}
                army_id={nemesisObj?.armyID}
              />
            </div>
            <p className="army-nemesis__txt">{`${nemesisObj?.count} games`}</p>
          </>
        )}
      </article>
    </section>
  );
}
