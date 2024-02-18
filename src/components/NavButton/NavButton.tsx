import { Link } from "react-router-dom";
import "./NavButton.scss";

interface ButtonProps {
  colour: "blue" | "dark" | "green";
  text: string;
  page?: string;
}

export default function NavButton({ colour, text, page }: ButtonProps) {
  let colourClass: string = "nav-button nav-button--blue";
  colour === "blue"
    ? colourClass
    : colour === "dark"
    ? (colourClass = "nav-button nav-button--dark")
    : (colourClass = "nav-button nav-button--green");
  console.log(page);

  if (!page) {
    page = "/";
  }

  return (
    <Link to={page} className={colourClass}>
      {text}
    </Link>
  );
}
