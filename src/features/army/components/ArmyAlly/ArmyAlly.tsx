import { Player } from "../../../../utils/Interfaces";
import { BattleCard } from "../../../battle";
import "./ArmyAlly.scss";

interface ArmyID {
  ally: Player | null;
}

export default function ArmyAlly({ ally }: ArmyID) {
  return (
    <section className='army-ally'>
      <div className='army-ally__header'>
        <h3 className='army-ally__title'>
          {" "}
          Ally <br />
          <span className='army-ally__subtxt'>who you play with the most</span>
        </h3>
      </div>
      <article className='army-ally__army-card'>
        {ally?.count === undefined ? (
          <p className='army-ally__undefined-text'>
            This army does not need Allies.
          </p>
        ) : (
          <>
            <div className='army-ally__army-wrap'>
              <BattleCard
                name={ally?.name}
                known_as={ally?.known_as}
                ranking={ally?.ranking}
                army_id={ally?.army_id}
                emblem={ally?.emblem}
              />
            </div>
            <p className='army-ally__txt'>{`${ally?.count} games`}</p>
          </>
        )}
      </article>
    </section>
  );
}
