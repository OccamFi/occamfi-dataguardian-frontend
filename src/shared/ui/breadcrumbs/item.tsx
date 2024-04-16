import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import type { ClassName } from "../../types";

type Props = {
  isActive?: boolean;
} & ClassName;

export const Item = ({
  children,
  isActive,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <li
      className={twMerge(
        "flex items-center text-sm font-medium text-fiord",
        isActive && "pointer-events-none font-semibold text-dodgerBlue",
        className
      )}
    >
      {children}
    </li>
  );
};
