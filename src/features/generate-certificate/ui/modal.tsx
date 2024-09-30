import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useUnit } from "effector-react";

import { Provider } from "entities/provider";
import { Modal } from "shared/ui/modal";
import { ModalProps } from "shared/ui/modal/modal";
import { Portal } from "shared/ui/portal";

import { $$certificateModel } from "../model";
import { CertificateGenerationContent } from "./certificate-generation-content";
import { GenerationSuccessContent } from "./generation-success-content";

type Props = {
  encryptionPubKey: string;
  holderCommitment: string;
} & ModalProps;

export const GenerateCertificateModal = ({
  encryptionPubKey,
  holderCommitment,
  onClose,
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
    } else {
      setProvider("twitter");
    }
  }, [location.pathname]);

  return (
    <Modal onClose={onClose}>
      <Portal>
        <Modal.Overlay>
          <Modal.Content className="w-[400px] px-6 pb-6 pt-9">
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
          </Modal.Content>
        </Modal.Overlay>
      </Portal>
    </Modal>
  );
};
