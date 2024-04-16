import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

export const Footer = ({ className }: ClassName) => {
  const year = new Date().getFullYear();
  return (
    <footer
      className={twMerge(
        "flex items-center justify-center border-t border-athensGray pb-12 pt-8 font-light leading-6 text-paleSky",
        className
      )}
    >
      © {year} Occam.fi Data Provider. All rights reserved.
    </footer>
  );
};
