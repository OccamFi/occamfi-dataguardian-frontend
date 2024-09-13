import { useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { Button } from "shared/ui/button";
import { Checkbox } from "shared/ui/checkbox";
import { Icon, IconName } from "shared/ui/icon";
import { Spinner } from "shared/ui/spinner";

import { $$certificateModel } from "../model";

const modalItems: { iconName: IconName; text: string }[] = [
  {
    iconName: "userCircle",
    text: "Username & X id",
  },
  {
    iconName: "checkCircle",
    text: "Date of creation ",
  },
  {
    iconName: "users",
    text: "Number of followers",
  },
  {
    iconName: "users",
    text: "Number of following",
  },
  {
    iconName: "fileHeart",
    text: "Number of tweets",
  },
  {
    iconName: "checkVerified",
    text: "Verification status",
  },
];

type Props = {
  encryptionPubKey: string;
  holderCommitment: string;
};

export const CertificateGenerationContent = ({
  encryptionPubKey,
  holderCommitment,
}: Props) => {
  const step = useUnit($$certificateModel.$step);
  const handleClick = () => {
    $$certificateModel.generateCertificate({
      encryptionPubKey,
      holderCommitment,
    });
  };

  return (
    <>
      <header className="flex flex-col items-center justify-center">
        <Icon className="h-6 w-9" name="occam" />
        <h3 className="mt-4 text-lg font-medium">Certificate generating</h3>
        <p className="mt-1 text-sm font-light leading-5 text-fiord">
          You generate a certificate for X.com (Twitter)
        </p>
      </header>

      <main
        className={twMerge(
          "relative mt-5 overflow-hidden rounded-xl border-2 border-dodgerBlue p-5",
          step === "generation" && "border-dodgerBlue/30"
        )}
      >
        <AnimatePresence>
          {step === "generation" && (
            <motion.div
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              className="absolute left-0 top-0 z-10 flex size-full flex-col items-center justify-center gap-4 bg-white"
              initial={{ opacity: 0 }}
            >
              <Spinner className="size-10" />
              <div className="relative z-20 font-light text-oxfordBlue">
                Sort data...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between">
          <div>
            <h4 className="font-medium leading-6">Standard Certificate</h4>
            <p className="mt-0.5 font-light">
              The certificate will contain all available data
            </p>
          </div>
          <Checkbox defaultChecked />
        </div>

        <ul className="mt-5 flex flex-col gap-y-3">
          {modalItems.map((item) => {
            return (
              <li className="flex gap-x-3" key={item.iconName}>
                <Icon className="text-dodgerBlue" name={item.iconName} />
                <span className="font-light leading-6">{item.text}</span>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className="mt-5 flex flex-col">
        <Button
          className="h-11 items-center justify-center text-base font-medium"
          disabled={step === "generation"}
          onClick={handleClick}
        >
          Generate Certificate
        </Button>
      </footer>
    </>
  );
};
