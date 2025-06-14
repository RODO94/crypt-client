import { useNavigate } from "react-router-dom";
import "./FiveColTableRow.scss";
import { Rank } from "../../../../utils/Interfaces";
import { JSX } from "react";

interface rankObjTable extends Rank {
  colour: string;
  navTo?: string;
  id: string | undefined;
}

export default function FiveColTableRow({
  rank,
  known_as,
  name,
  ranking,
  status,
  colour,
  navTo,
  id,
}: rankObjTable) {
  let icon: string | JSX.Element = "no change";
  let rowColourClass = "table-row table-row--light";
  const navigate = useNavigate();

  colour === "light"
    ? rowColourClass
    : colour === "dark"
    ? (rowColourClass = "table-row table-row--dark")
    : rowColourClass;

  const chevronUp = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 15 10'
      fill='none'
      className='table-row__icon-svg'
    >
      <path
        d='M12.1875 10L15 7.27273L7.5 0L0 7.27273L2.8125 10L7.5 5.45455L12.1875 10Z'
        fill='#51834E'
      />
    </svg>
  );

  const chevronDown = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 15 10'
      fill='none'
      className='table-row__icon-svg'
    >
      <path
        d='M2.8125 0L0 2.72727L7.5 10L15 2.72727L12.1875 0L7.5 4.54545L2.8125 0Z'
        fill='#8B090B'
      />
    </svg>
  );

  const noChangeIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 22 3'
      fill='none'
      className='table-row__icon-svg table-row__icon-svg--nochange'
    >
      <path d='M0 0V3H22V0H0Z' fill='#4F4F4F' />
    </svg>
  );

  status === "increase"
    ? (icon = chevronUp)
    : status === "decrease"
    ? (icon = chevronDown)
    : (icon = noChangeIcon);

  const handleClick = () => {
    if (navTo) {
      navigate(navTo, { state: { id: id } });
    }
  };

  return (
    <article className={rowColourClass} onClick={handleClick}>
      <p className='table-row__content table-row__content--rank'> {rank} </p>
      <p className='table-row__content table-row__content--user'>
        {" "}
        {known_as}{" "}
      </p>
      <p className='table-row__content table-row__content--army'> {name} </p>
      <p className='table-row__content table-row__content--ranking'>
        {" "}
        {ranking}{" "}
      </p>
      <div className='table-row__icon-wrap'>
        <p className='table-row__content table-row__content--icon'> {icon} </p>
      </div>
    </article>
  );
}
