import { ElementType, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName, PolymorphicProps } from "shared/types";

import { Spinner } from "../spinner";

type Theme = "dodgerBlue" | "white";

type Props = {
  disabled?: boolean;
  isLoading?: boolean;
  theme?: Theme;
} & ClassName;

export const Button = <E extends ElementType = "button">(
  props: PropsWithChildren<PolymorphicProps<E, Props>>
) => {
  const {
    as: Comp = "button",
    children,
    className,
    disabled = false,
    isLoading = false,
    theme = "dodgerBlue",
    ...restProps
  } = props;

  const content = isLoading ? (
    <span className="opacity-0">{children}</span>
  ) : (
    children
  );

  return (
    <Comp
      {...restProps}
      className={twMerge(
        "shadow-xs relative inline-flex cursor-pointer select-none justify-center rounded-lg px-[18px] py-2 text-center font-medium transition-colors",
        (isLoading || disabled) && "pointer-events-none",
        theme === "dodgerBlue" &&
          "bg-dodgerBlue text-white hover:bg-dodgerBlue-dark focus:bg-dodgerBlue-dark active:bg-dodgerBlue-light",
        theme === "dodgerBlue" && disabled && "bg-dodgerBlue/50",

        theme === "white" &&
          "bg-white text-fiord hover:bg-athensGray focus:bg-athensGray active:brightness-90",
        theme === "white" && disabled && "text-gullGray",
        className
      )}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner
            className={twMerge(
              "size-4",
              theme === "dodgerBlue" && "stroke-white/60 text-dodgerBlue/60"
            )}
          />
        </span>
      )}
      {content}
    </Comp>
  );
};
