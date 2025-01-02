import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
}

export default function NavigationLink({ to, children }: NavigationLinkProps) {
  return (
    <NavLink
      style={{ textDecoration: "none", color: "black", width: "100%" }}
      to={to}
    >
      {children}
    </NavLink>
  );
}
