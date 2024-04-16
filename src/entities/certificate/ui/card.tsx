import { ReactNode } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Icon } from "shared/ui/icon";

type Props = {
  avatar: ReactNode;
  issueDate: ReactNode;
  title: ReactNode;
} & ClassName;

export const Card = (props: Props) => {
  const { avatar, issueDate, title, className } = props;
  return (
    <div
      className={twMerge(
        "flex flex-col rounded-[20px] p-5 text-white",
        className
      )}
    >
      <header className="flex items-center justify-between">
        <h3 className="text-xl leading-[30px]">{title}</h3>
        <Icon className="size-[30px] opacity-30" name="certificate" />
      </header>
      <footer className="mt-auto flex items-end justify-between">
        <div className="text-xs tracking-wider">
          ISSUE DATE <span className="ml-16 inline-flex">{issueDate}</span>
        </div>
        {avatar}
      </footer>
    </div>
  );
};
