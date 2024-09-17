import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAccount, useSignMessage } from "wagmi";

const getChallengeApi = (
  address: `0x${string}` | undefined
): Promise<{ data: { challenge: string } }> =>
  axios.post("/api/challenge", {
    user: address,
  });

const signApi = ({
  signature,
  challenge,
}: {
  challenge: string;
  signature: string;
}): Promise<void> =>
  axios.post(
    "/api/sign-in",
    {
      signature,
      challenge,
    },
    { withCredentials: true }
  );

export const useUniswapAuthMutation = () => {
  const { signMessage } = useSignMessage();
  const { address } = useAccount();

  return useMutation({
    mutationFn: () => getChallengeApi(address),
    onSuccess: ({ data }) => {
      signMessage(
        {
          message: data.challenge,
        },
        {
          onSuccess: (sign) =>
            signApi({
              signature: sign.substring(2),
              challenge: data.challenge,
            }),
        }
      );
    },
  });
};
