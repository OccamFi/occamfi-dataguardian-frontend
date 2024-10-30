import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAccount, useSignMessage } from "wagmi";

const host = import.meta.env.VITE_API_HOST;
const url = import.meta.env.DEV ? "/api" : host;

const getChallengeApi = (
  address: `0x${string}` | undefined
): Promise<{ data: { challenge: string } }> =>
  axios.post(`${url}/challenge`, {
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
    `${url}/sign-in`,
    {
      signature,
      challenge,
    },
    { withCredentials: true }
  );

const binanceSignInApi = ({
  key,
  secret,
}: {
  key: string;
  secret: string;
}): Promise<{ data: { success: boolean } }> =>
  axios.post(`${url}/binance/sign-in`, {
    key,
    secret,
  });

export const useUniswapAuthMutation = ({
  onSuccess,
}: {
  onSuccess(): void;
}) => {
  const { signMessage } = useSignMessage();
  const { address } = useAccount();
  const client = useQueryClient();

  const signMutation = useMutation({
    mutationFn: signApi,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user"] });
      onSuccess();
    },
  });

  return useMutation({
    mutationFn: () => getChallengeApi(address),
    onSuccess: ({ data }) => {
      signMessage(
        {
          message: data.challenge,
        },
        {
          onSuccess: (sign) =>
            signMutation.mutate({
              signature: sign.substring(2),
              challenge: data.challenge,
            }),
        }
      );
    },
  });
};

export const useBinanceAuthMutation = () => {
  return useMutation({
    mutationFn: binanceSignInApi,
  });
};
