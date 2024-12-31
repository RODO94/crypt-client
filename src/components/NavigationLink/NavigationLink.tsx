import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
}

export default function NavigationLink({ to, children }: NavigationLinkProps) {
  return (
    <NavLink style={{ textDecoration: "none", color: "black" }} to={to}>
      {children}
    </NavLink>
  );
}
