import "./FiveColTableHeader.scss";

export default function FiveColTableHeader() {
  return (
    <article className="table-header">
      <p className="table-header__column-header table-header__column-header--rank">
        Rank
      </p>
      <p className="table-header__column-header table-header__column-header--user">
        User
      </p>
      <p className="table-header__column-header table-header__column-header--army">
        Army
      </p>
      <p className="table-header__column-header table-header__column-header--score">
        Score
      </p>
      <p className="table-header__column-header table-header__column-header--icon">
        Change
      </p>
    </article>
  );
}
