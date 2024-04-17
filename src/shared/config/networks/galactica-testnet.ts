import { Chain } from "viem";

export const galacticaAndromeda = {
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://explorer-reticulum.galactica.com/",
    },
  },
  id: 9302,
  name: "Galactica-Reticulum",
  nativeCurrency: {
    decimals: 18,
    name: "Galactica",
    symbol: "GNET",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-http-reticulum.galactica.com/"],
      webSocket: ["wss://evm-rpc-ws-reticulum.galactica.com/"],
    },
    public: {
      http: ["https://evm-rpc-http-reticulum.galactica.com/"],
      webSocket: ["wss://evm-rpc-ws-reticulum.galactica.com/"],
    },
  },
  testnet: true,
} as const satisfies Chain;
