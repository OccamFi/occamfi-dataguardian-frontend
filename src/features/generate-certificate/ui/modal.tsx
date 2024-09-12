import { useUnit } from "effector-react";

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
  const step = useUnit($$certificateModel.$step);
  const certificate = useUnit($$certificateModel.$certificate);

  return (
    <Modal onClose={onClose}>
      <Portal>
        <Modal.Overlay>
          <Modal.Content className="w-[400px] px-6 pb-6 pt-9">
            {step === "generation" || step === "idle" ? (
              <CertificateGenerationContent
                encryptionPubKey={encryptionPubKey}
                holderCommitment={holderCommitment}
              />
            ) : null}
            {step === "download" && (
              <GenerationSuccessContent certificate={certificate} />
            )}
          </Modal.Content>
        </Modal.Overlay>
      </Portal>
    </Modal>
  );
};
