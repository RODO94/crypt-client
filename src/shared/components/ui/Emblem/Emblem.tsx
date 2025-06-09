import { Emblems, emblems } from "../../../../utils/emblems";
import "./Emblem.scss";
import metalica from "../../../../assets/emblems/metalica.svg";

type EmblemType = {
  emblem: Emblems;
};

export default function Emblem({ emblem }: EmblemType) {
  return (
    <img
      className='emblem'
      src={emblems[emblem] || metalica}
      alt='army emblem'
    />
  );
}
