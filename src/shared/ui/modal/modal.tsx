import { PropsWithChildren, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { Content } from "./content";
import { ModalContext } from "./context";
import { Overlay } from "./overlay";

export type ModalProps = {
  onClose: (isOpen: false) => void;
};

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { children, onClose } = props;

  const [isOpen, setIsOpen] = useState(true);

  const handleChange = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, onChange: handleChange }}>
      <AnimatePresence onExitComplete={() => onClose?.(false)}>
        {isOpen && children}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

Modal.Overlay = Overlay;
Modal.Content = Content;
