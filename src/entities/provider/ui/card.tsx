import { ReactNode } from "react";

import { ClassName } from "shared/types";
import { Card as UICard } from "shared/ui/card";

import { Provider, providers } from "../const";
import { Avatar } from "./avatar";

type Props = {
  footer?: ReactNode;
  provider: Provider;
} & ClassName;

export const Card = ({ className, footer, provider }: Props) => {
  const { description, name } = providers[provider];

  return (
    <UICard className={className}>
      <main className="p-6">
        <header className="flex items-center gap-x-3.5">
          <Avatar provider={provider} />
          <h3 className="font-semibold">{name}</h3>
        </header>

        <p className="mt-6 text-sm font-light text-fiord">{description}</p>
      </main>

      <hr className="mt-auto h-px w-full bg-athensGray" />

      <footer className="p-4">{footer}</footer>
    </UICard>
  );
};
