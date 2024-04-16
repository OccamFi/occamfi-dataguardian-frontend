import { Children, PropsWithChildren, ReactNode } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import { Icon } from "../icon";
import { Item } from "./item";

type Props = {
  separator?: ReactNode;
} & ClassName;

export const Breadcrumbs = (props: PropsWithChildren<Props>) => {
  const {
    children,
    separator = <Icon className="text-mischka" name="chevronRight" />,
    className,
  } = props;

  const count = Children.count(children);

  const content = Children.map(children, (child, idx) => {
    return (
      <>
        {child} {count - 1 !== idx && separator}
      </>
    );
  });
  return (
    <ul className={twMerge("flex items-center gap-x-3", className)}>
      {content}
    </ul>
  );
};

Breadcrumbs.Item = Item;
