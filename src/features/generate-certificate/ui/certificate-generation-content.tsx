import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { useCreateTwitterZkCertificateMutation } from "shared/graphql";
import { Button } from "shared/ui/button";
import { Checkbox } from "shared/ui/checkbox";
import { Icon, IconName } from "shared/ui/icon";
import { Spinner } from "shared/ui/spinner";

const modalItems: { iconName: IconName; text: string }[] = [
  {
    iconName: "checkCircle",
    text: "Created 01 March 2003",
  },
  {
    iconName: "userCircle",
    text: "21 age",
  },
  {
    iconName: "markerPin",
    text: "Tokyo (Japan)",
  },
  {
    iconName: "checkVerified",
    text: "Tokyo (Japan)",
  },
  {
    iconName: "users",
    text: "15,294 Followers",
  },
  {
    iconName: "smile",
    text: "1,295 Friends",
  },
  {
    iconName: "heart",
    text: "1,390,042 Likes",
  },
  {
    iconName: "fileHeart",
    text: "1,051 Posts",
  },
];

type Props = {
  encryptionPubKey: string;
  holderCommitment: string;
  onNextStep: (certificate: string) => void;
};

export const CertificateGenerationContent = ({
  onNextStep,
  encryptionPubKey,
  holderCommitment,
}: Props) => {
  const mutation = useCreateTwitterZkCertificateMutation();

  const handleClick = () => {
    mutation.mutate(
      {
        in: {
          encryptionPubKey,
          holderCommitment,
        },
      },
      {
        onSuccess: (data) => {
          console.log(
            "data.createTwitterZKCertificate.certificate",
            data.createTwitterZKCertificate.certificate
          );
          onNextStep(data.createTwitterZKCertificate.certificate ?? "");
        },
        onError: (err) => {
          console.error("useCreateTwitterZkCertificateMutation err", err);
        },
      }
    );
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
          mutation.isPending && "border-dodgerBlue/30"
        )}
      >
        <AnimatePresence>
          {mutation.isPending && (
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
          disabled={mutation.isPending}
          onClick={handleClick}
        >
          Generate Certificate
        </Button>
      </footer>
    </>
  );
};
