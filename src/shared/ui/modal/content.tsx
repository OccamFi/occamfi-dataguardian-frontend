import { PropsWithChildren } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

type Props = ClassName;

export const Content = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={twMerge(
        "z-10 m-auto flex flex-col rounded-xl bg-white shadow-xl",
        className
      )}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key="modal"
    >
      {children}
    </motion.div>
  );
};
