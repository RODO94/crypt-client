import "./EmblemCard.scss";
import { Emblems, emblems } from "../../../../utils/emblems";
import metalica from "../../../../assets/emblems/metalica.svg";

type EmblemType = {
  emblem: Emblems;
};

export default function EmblemCard({ emblem }: EmblemType) {
  return (
    <img
      className='emblem-card'
      src={emblems[emblem] || metalica}
      alt='army emblem'
    />
  );
}
