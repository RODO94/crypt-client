import "./EmblemCard.scss";
import { Emblems, emblems } from "../../../../utils/emblems";

type EmblemType = {
  emblem: Emblems;
};

export default function EmblemCard({ emblem }: EmblemType) {
  return (
    <img className='emblem-card' src={emblems[emblem]} alt='army emblem' />
  );
}
