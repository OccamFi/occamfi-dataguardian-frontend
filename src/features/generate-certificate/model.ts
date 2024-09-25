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

import { graphqlSdk } from "shared/graphql/client";

export type HolderCommitmentProps = {
  encryptionPubKey: string;
  holderCommitment: string;
};

export type CertificateStep = "download" | "fail" | "generation" | "idle";
export type CertificateType = "twitter" | "uniswap";

const createModel = () => {
  const generateCertificate = createEvent<
    HolderCommitmentProps & { certificateType: CertificateType }
  >();
  const generateCertificateTick = createEvent<
    HolderCommitmentProps & { certificateType: CertificateType }
  >();

  const setDone = createEvent();
  const setCertificateType = createEvent<CertificateType>();

  const $step = createStore<CertificateStep>("idle");
  const $errMsg = createStore("");
  const $certificate = createStore("");
  const $dataS = createStore<
    HolderCommitmentProps & { certificateType: CertificateType }
  >({
    encryptionPubKey: "",
    holderCommitment: "",
    certificateType: "twitter",
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

  const fxs = [generateUniswapFx];

  split({
    source: merge([generateCertificate, generateCertificateTick]),
    match: {
      twitter: ({ certificateType }) => certificateType === "twitter",
      uniswap: ({ certificateType }) => certificateType === "uniswap",
    },
    cases: {
      twitter: generateTwitterFx,
      uniswap: generateUniswapFx,
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

  const { tick } = interval({
    timeout: 2000,
    start: generateCertificate,
    stop: setDone,
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

  // --------- error handle
  fxs.forEach((eff) => {
    // sample({
    //   source: eff.failData,
    //   target: [setDone, stepApi.fail],
    // });
    //
    // sample({
    //   source: eff.failData,
    //   fn: (err) => {
    //     return err.message;
    //   },
    //   target: $errMsg,
    // });
    //
    // sample({
    //   clock: tick,
    //   source: $dataS,
    //   target: generateCertificateTick,
    // });
  });

  return {
    $step,
    $certificate,
    $errMsg,
    generateCertificate,
    setCertificateType,
  };
};

export const { ...$$certificateModel } = createModel();
