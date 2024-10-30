import { Modal } from "shared/ui/modal";
import { ModalProps } from "shared/ui/modal/modal";
import { Portal } from "shared/ui/portal";

import { GenerateCertificateContent } from "./content";

type Props = {
  encryptionPubKey: string;
  holderCommitment: string;
} & ModalProps;

export const GenerateCertificateModal = ({
  encryptionPubKey,
  holderCommitment,
  onClose,
}: Props) => {
  return (
    <Modal onClose={onClose}>
      <Portal>
        <Modal.Overlay>
          <Modal.Content className="w-[400px] px-6 pb-6 pt-9">
            <GenerateCertificateContent
              encryptionPubKey={encryptionPubKey}
              holderCommitment={holderCommitment}
            />
          </Modal.Content>
        </Modal.Overlay>
      </Portal>
    </Modal>
  );
};
