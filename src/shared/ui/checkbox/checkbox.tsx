import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type Props = Omit<ComponentProps<"input">, "type">;

export const Checkbox = ({ className, ...props }: Props) => {
  return (
    <div className={twMerge("relative flex w-fit", className)}>
      <input
        className="peer relative size-5 cursor-pointer appearance-none rounded-md border-2 border-dodgerBlue checked:border-0 checked:bg-dodgerBlue disabled:cursor-not-allowed"
        type="checkbox"
        {...props}
      />

      <svg
        className="pointer-events-none absolute top-0 m-0.5 hidden size-4 peer-checked:block"
        fill="none"
        height="15"
        viewBox="0 0 14 14"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6666 4L5.24992 10.4167L2.33325 7.5"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
