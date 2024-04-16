import { useEffect } from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

// http://localhost:5173/?holderCommitment=16607625577278438594767804415218927671757671726577118445895787921662140036661&encryptionPubKey=gkUeDzcB1eGHlTzX8V%2Bh8kwo28d8h799SUAhsaLuFyA%3D

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

  if (
    import.meta.env.PROD &&
    (!resultHolderCommitment || !resultHolderEncryptionPubKey)
  )
    return <Navigate to="/no-holder-commitment" />;

  return (
    <Outlet
      context={{
        // TODO: remove hardcoded values before release
        holderCommitment:
          resultHolderCommitment ??
          "16607625577278438594767804415218927671757671726577118445895787921662140036661",
        encryptionPubKey:
          resultHolderEncryptionPubKey ??
          "gkUeDzcB1eGHlTzX8V%2Bh8kwo28d8h799SUAhsaLuFyA%3D",
      }}
    />
  );
};
