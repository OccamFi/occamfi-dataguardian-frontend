import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

export const Card = ({ children, className }: PropsWithChildren<ClassName>) => {
  return (
    <section
      className={twMerge(
        "flex flex-col rounded-xl border border-athensGray bg-white",
        className
      )}
    >
      {children}
    </section>
  );
};
