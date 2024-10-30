import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useBinanceAuthMutation } from "shared/api";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";
import { Spinner } from "shared/ui/spinner";

type Props = { onSuccess(): void };

export const ProvideDataContent = ({ onSuccess }: Props) => {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const binanceMutation = useBinanceAuthMutation();

  const handleClick = () => {
    binanceMutation.mutate(
      {
        key: apiKey,
        secret: secretKey,
      },
      {
        onSuccess,
      }
    );
  };

  return (
    <>
      <header className="flex flex-col items-center justify-center">
        <Icon className="h-6 w-9" name="occam" />
        <h3 className="mt-4 text-lg font-medium">Provide data</h3>
        <p className="mt-1 text-center text-sm font-light leading-5 text-fiord">
          Share your <span className="font-semibold">readonly</span> API key for
          the application to process the data and create a zkCertificate with
          it. Occam Data Guardian does not store the provided keys or the data.
        </p>
      </header>
      <main className="relative mt-5 overflow-hidden rounded-xl border-2 border-dodgerBlue p-5 text-[14px] font-medium">
        <AnimatePresence>
          {binanceMutation.isPending && (
            <motion.div
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              className="absolute left-0 top-0 z-10 flex size-full flex-col items-center justify-center gap-4 bg-white"
              initial={{ opacity: 0 }}
            >
              <Spinner className="size-10" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="rounded-[8px] bg-[#ccc]/50 px-4 py-3">
          <input
            className="w-full bg-transparent text-left text-black focus:outline-none"
            onChange={(e) => {
              setApiKey(e.target.value);
            }}
            placeholder="Your API key"
            value={apiKey}
          />
        </div>
        <div className="mt-2 rounded-[8px] bg-[#ccc]/50 px-4 py-3">
          <input
            className="w-full bg-transparent text-left text-black focus:outline-none"
            onChange={(e) => {
              setSecretKey(e.target.value);
            }}
            placeholder="Your Secret key"
            value={secretKey}
          />
        </div>
      </main>
      <footer className="mt-5 flex flex-col">
        <Button
          className="h-11 items-center justify-center text-base font-medium"
          disabled={apiKey.length === 0 || secretKey.length === 0}
          onClick={handleClick}
        >
          Get Binance data
        </Button>
      </footer>
    </>
  );
};
