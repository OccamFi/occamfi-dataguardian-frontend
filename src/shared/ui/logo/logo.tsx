import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import { default as LogoSvg } from "./logo.svg?react";

export const Logo = ({ className }: ClassName) => {
  return (
    <div className={twMerge("flex items-center gap-x-4", className)}>
      <LogoSvg />

      <span className="text-sm font-medium leading-4 text-fiord">
        Data Provider <br /> Occam.fi
      </span>
    </div>
  );
};
