import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Icon } from "shared/ui/icon";

export const Hero = ({ className }: ClassName) => {
  return (
    <div className={twMerge("text-center", className)}>
      <div className="inline-flex w-auto items-center gap-x-1.5 rounded-md bg-white px-2 py-0.5 inner-border inner-border-mischka">
        <Icon name="occam" />
        <span className="inline-flex text-sm text-oxfordBlue">
          Powered by Occam
        </span>
      </div>
      <h2 className="mt-4 whitespace-nowrap text-[74px] font-extralight leading-[72px] tracking-tight text-mineShaft">
        Import your social data to Galactica
      </h2>
      <p className="mt-4 text-xl font-light leading-7 text-fiord">
        Use your Account to verify in a form of zkCertificate
      </p>
    </div>
  );
};
