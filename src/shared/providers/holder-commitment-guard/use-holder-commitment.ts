import { useOutletContext } from "react-router-dom";

type HolderCommitment = {
  encryptionPubKey: string;
  holderCommitment: string;
};

export const useHolderCommitment = () => {
  const ctx = useOutletContext<HolderCommitment>();
  return ctx;
};
