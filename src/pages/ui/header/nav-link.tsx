import { NavLinkProps, NavLink as RouterNavLink } from "react-router-dom";

import { twMerge } from "tailwind-merge";

export const NavLink = ({ children, className, ...props }: NavLinkProps) => {
  return (
    <RouterNavLink
      className={(props) => {
        const cls =
          typeof className === "string" ? className : className?.(props);
        return twMerge(
          "flex font-light text-fiord outline-none transition-colors hover:text-fiord/50 focus:text-fiord/50",
          props.isActive && "pointer-events-none text-fiord",
          cls
        );
      }}
      {...props}
    >
      {children}
    </RouterNavLink>
  );
};
