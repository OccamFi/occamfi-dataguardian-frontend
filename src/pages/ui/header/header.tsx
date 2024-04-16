import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";
import { Logo } from "shared/ui/logo";

import { NavLink } from "./nav-link";

type Props = {
  buttonClassName?: string;
} & ClassName;

export const Header = ({ className, buttonClassName }: Props) => {
  return (
    <nav className={twMerge("flex items-center bg-transparent", className)}>
      <Logo />
      <ul className="ml-10 flex gap-x-8">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/home">FAQ</NavLink>
        </li>
      </ul>

      <div className="ml-auto flex items-center gap-x-8">
        <NavLink to="/support">Support</NavLink>

        <Button
          as="a"
          className={twMerge("py-2.5 leading-6", buttonClassName)}
          href="/#"
          theme="white"
        >
          Back to Galactica.com
        </Button>
      </div>
    </nav>
  );
};
