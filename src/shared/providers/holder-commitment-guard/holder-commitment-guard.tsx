import { useEffect } from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

export const HolderCommitmentGuard = () => {
  const [searchParams] = useSearchParams();
  const holderCommitmentParam = searchParams.get("holderCommitment");
  const encryptionPubKeyParam = searchParams.get("encryptionPubKey");

  const savedHolderCommitment = sessionStorage.getItem("holderCommitment");
  const savedEncryptionPubKey = sessionStorage.getItem("encryptionPubKey");

  useEffect(() => {
    if (!holderCommitmentParam || !encryptionPubKeyParam) return;

    sessionStorage.setItem("holderCommitment", holderCommitmentParam);
    sessionStorage.setItem("encryptionPubKey", encryptionPubKeyParam);
  }, [holderCommitmentParam, encryptionPubKeyParam]);

  const resultHolderCommitment = savedHolderCommitment || holderCommitmentParam;
  const resultHolderEncryptionPubKey =
    savedEncryptionPubKey || encryptionPubKeyParam;

  if (!resultHolderCommitment || !resultHolderEncryptionPubKey)
    return <Navigate to="/no-holder-commitment" />;

  return (
    <Outlet
      context={{
        holderCommitment: resultHolderCommitment,
        encryptionPubKey: resultHolderEncryptionPubKey,
      }}
    />
  );
};
