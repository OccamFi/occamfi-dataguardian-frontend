import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

export const Content = ({
  children,
  className,
}: PropsWithChildren<ClassName>) => {
  return (
    <div className={twMerge("flex flex-col p-6", className)}>{children}</div>
  );
};
