import {
  createApi,
  createEffect,
  createEvent,
  createStore,
  merge,
  sample,
  split,
} from "effector";
import { interval } from "patronum";

import { Provider } from "entities/provider";
import { graphqlSdk } from "shared/graphql/client";

export type HolderCommitmentProps = {
  encryptionPubKey: string;
  holderCommitment: string;
};

export type CertificateStep = "download" | "fail" | "generation" | "idle";

const createModel = () => {
  const generateCertificate = createEvent<
    HolderCommitmentProps & { provider: Provider }
  >();
  const generateCertificateTick = createEvent<
    HolderCommitmentProps & { provider: Provider }
  >();

  const setDone = createEvent();

  const $step = createStore<CertificateStep>("idle");
  const $errMsg = createStore("");
  const $certificate = createStore("");
  const $dataS = createStore<HolderCommitmentProps & { provider: Provider }>({
    encryptionPubKey: "",
    holderCommitment: "",
    provider: "twitter",
  });

  const generateTwitterFx = createEffect(
    async ({ encryptionPubKey, holderCommitment }: HolderCommitmentProps) => {
      return await graphqlSdk.CreateTwitterZKCertificate({
        in: { encryptionPubKey, holderCommitment },
      });
    }
  );
  const generateUniswapFx = createEffect(
    async ({ encryptionPubKey, holderCommitment }: HolderCommitmentProps) => {
      return await graphqlSdk.CreateUniswapZKCertificate({
        in: { encryptionPubKey, holderCommitment },
      });
    }
  );
  const generateBinanceFx = createEffect(
    async ({ encryptionPubKey, holderCommitment }: HolderCommitmentProps) => {
      return await graphqlSdk.CreateBinanceZKCertificate({
        in: { encryptionPubKey, holderCommitment },
      });
    }
  );

  const fxs = [generateUniswapFx];

  split({
    source: merge([generateCertificate, generateCertificateTick]),
    match: {
      twitter: ({ provider }) => provider === "twitter",
      uniswap: ({ provider }) => provider === "uniswap",
      binance: ({ provider }) => provider === "binance",
    },
    cases: {
      twitter: generateTwitterFx,
      uniswap: generateUniswapFx,
      binance: generateBinanceFx,
    },
  });

  const stepApi = createApi($step, {
    idle: () => "idle",
    fail: () => "fail",
    generation: () => "generation",
    download: () => "download",
  });

  sample({
    source: generateCertificate,
    target: stepApi.generation,
  });

  sample({
    clock: generateCertificate,
    target: $dataS,
  });

  // --------- save certificate
  sample({
    source: generateTwitterFx.doneData,
    fn: (data) => data.createTwitterZKCertificate.certificate ?? "",
    target: $certificate,
  });

  sample({
    source: generateUniswapFx.doneData,
    fn: (data) => data.createUniswapZKCertificate.certificate ?? "",
    target: $certificate,
  });

  sample({
    source: generateBinanceFx.doneData,
    fn: (data) => data.createBinanceZKCertificate.certificate ?? "",
    target: $certificate,
  });

  // --------- save progress
  sample({
    source: generateTwitterFx.doneData,
    filter: (data) => Boolean(data?.createTwitterZKCertificate?.progress === 1),
    target: [setDone, stepApi.download],
  });

  sample({
    source: generateUniswapFx.doneData,
    filter: (data) => Boolean(data?.createUniswapZKCertificate?.progress === 1),
    target: [setDone, stepApi.download],
  });

  sample({
    source: generateBinanceFx.doneData,
    filter: (data) => Boolean(data?.createBinanceZKCertificate?.progress === 1),
    target: [setDone, stepApi.download],
  });

  // --------- error handle
  fxs.forEach((eff) => {
    sample({
      source: eff.failData,
      target: [setDone, stepApi.fail],
    });

    sample({
      source: eff.failData,
      fn: (err) => {
        return err.message;
      },
      target: $errMsg,
    });
  });

  // --------- pending status
  const { tick } = interval({
    timeout: 2000,
    start: generateCertificate,
    stop: setDone,
  });

  sample({
    clock: tick,
    source: $dataS,
    target: generateCertificateTick,
  });

  return {
    $step,
    $certificate,
    $errMsg,
    generateCertificate,
  };
};

export const { ...$$certificateModel } = createModel();
