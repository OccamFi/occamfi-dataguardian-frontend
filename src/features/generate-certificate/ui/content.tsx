import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useUnit } from "effector-react";

import { Provider } from "entities/provider";

import { $$certificateModel } from "../model";
import { CertificateGenerationContent } from "./certificate-generation-content";
import { GenerationSuccessContent } from "./generation-success-content";

type Props = {
  encryptionPubKey: string;
  holderCommitment: string;
};

export const GenerateCertificateContent = ({
  encryptionPubKey,
  holderCommitment,
}: Props) => {
  const [provider, setProvider] = useState<Provider>("twitter");
  const step = useUnit($$certificateModel.$step);
  const certificate = useUnit($$certificateModel.$certificate);
  const errMsg = useUnit($$certificateModel.$errMsg);

  const location = useLocation();

  useEffect(() => {
    // @TODO:
    if (location.pathname.includes("uniswap")) {
      setProvider("uniswap");
    } else if (location.pathname.includes("binance")) {
      setProvider("binance");
    } else {
      setProvider("twitter");
    }
  }, [location.pathname]);

  return (
    <>
      {step === "generation" || step === "idle" ? (
        <CertificateGenerationContent
          encryptionPubKey={encryptionPubKey}
          holderCommitment={holderCommitment}
          provider={provider}
        />
      ) : null}
      {step === "download" && (
        <GenerationSuccessContent
          certificate={certificate}
          provider={provider}
        />
      )}
      {step === "fail" && <div>{errMsg}</div>}
    </>
  );
};
