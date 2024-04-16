import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import { Provider, providers } from "../const";

type Props = {
  imgClassName?: string;
  onlyImage?: boolean;
  provider: Provider;
} & ClassName;

export const Avatar = ({
  className,
  imgClassName,
  provider = "twitter",
  onlyImage,
}: Props) => {
  const { imageSrc, name } = providers[provider];

  return (
    <div
      className={twMerge(
        "inline-flex",
        !onlyImage && "rounded-[10px] border border-athensGray bg-white p-0.5",
        className
      )}
    >
      <img
        alt={name}
        className={twMerge("size-[46px] rounded-xl", imgClassName)}
        src={imageSrc}
      />
    </div>
  );
};
