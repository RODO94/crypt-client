import { Emblems, emblems } from "../../../../utils/emblems";
import "./Emblem.scss";

type EmblemType = {
  emblem: Emblems;
};

export default function Emblem({ emblem }: EmblemType) {
  return <img className='emblem' src={emblems[emblem]} alt='army emblem' />;
}
