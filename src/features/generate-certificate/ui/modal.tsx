import { useState } from "react";

import { Modal } from "shared/ui/modal";
import { ModalProps } from "shared/ui/modal/modal";
import { Portal } from "shared/ui/portal";

import { CertificateGenerationContent } from "./certificate-generation-content";
import { GenerationSuccessContent } from "./generation-success-content";

type CertificateSteps = "download" | "generation";

type Props = {
  encryptionPubKey: string;
  holderCommitment: string;
} & ModalProps;

export const GenerateCertificateModal = ({
  encryptionPubKey,
  holderCommitment,
  onClose,
}: Props) => {
  const [step, setStep] = useState<CertificateSteps>("generation");

  return (
    <Modal onClose={onClose}>
      <Portal>
        <Modal.Overlay>
          <Modal.Content className="w-[400px] px-6 pb-6 pt-9">
            {step === "generation" && (
              <CertificateGenerationContent
                encryptionPubKey={encryptionPubKey}
                holderCommitment={holderCommitment}
                onNextStep={() => setStep("download")}
              />
            )}
            {step === "download" && <GenerationSuccessContent />}
          </Modal.Content>
        </Modal.Overlay>
      </Portal>
    </Modal>
  );
};
