import "./ArmyNemesis.scss";
import { Player } from "../../utils/Interfaces";
import BattleCard from "../BattleCard/BattleCard";

interface NemesisObj {
  nemesis: Player | null;
}

export default function ArmyNemesis({ nemesis }: NemesisObj) {
  return (
    <section className="army-nemesis">
      <div className="army-nemesis__header">
        <h3 className="army-nemesis__title">
          {" "}
          Nemesis <br />
          <span className="army-ally__subtxt">who you play the most</span>
        </h3>
      </div>
      <article className="army-nemesis__army-card">
        {nemesis?.count === undefined ? (
          <p className="army-nemesis__undefined-text">
            A Nemesis is yet to emerge...
          </p>
        ) : (
          <>
            <div className="army-nemesis__army-wrap">
              <BattleCard
                name={nemesis?.name}
                known_as={nemesis?.known_as}
                ranking={nemesis?.ranking}
                army_id={nemesis?.army_id}
                emblem={nemesis?.emblem}
              />
            </div>
            <p className="army-nemesis__txt">{`${nemesis?.count} games`}</p>
          </>
        )}
      </article>
    </section>
  );
}
