import { type Provider, providers } from "../const";
import { Avatar } from "./avatar";

type Props = {
  provider: Provider;
};

export const Item = ({ provider }: Props) => {
  const { name, type } = providers[provider];

  return (
    <div className="flex items-center gap-4">
      <Avatar imgClassName="size-[52px]" onlyImage provider={provider} />

      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold leading-8">{name}</h3>
        <p className="text-sm font-semibold leading-5 text-paleSky">{type}</p>
      </div>
    </div>
  );
};
