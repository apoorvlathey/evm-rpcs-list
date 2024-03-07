import axios from "axios";
import { _allExtraRpcs } from "./constants";
const fs = require("fs");
const prettier = require("prettier");

interface RPCWithTracking {
  url: string;
  tracking: string;
  trackingDetails: string;
}

type ExtraRPC = string | RPCWithTracking;

const allExtraRpcs = _allExtraRpcs as unknown as {
  [chainId: number]: {
    rpcs: ExtraRPC[];
  };
};

function removeEndingSlash(rpc: string) {
  return rpc.endsWith("/") ? rpc.substr(0, rpc.length - 1) : rpc;
}

function removeEndingSlashObject(rpc: ExtraRPC) {
  if (typeof rpc === "string") {
    return removeEndingSlash(rpc);
  } else {
    return removeEndingSlash(rpc.url);
  }
}

interface ChainInfo {
  name: string;
  rpc: string[];
  chainId: number;
}

interface Chains {
  [chainId: number]: {
    name: string;
    rpcs: string[];
  };
}

const deprecatedChainIds = [
  3, // Ropsten
  4, // Rinkeby
  42, // Kovan
  238, // "blastblockchain"
];

const main = async () => {
  let fetchedChains = (await (
    await axios("https://chainid.network/chains.json")
  ).data) as ChainInfo[];

  const chains: Chains = {};

  fetchedChains
    .filter((c) => !deprecatedChainIds.includes(c.chainId))
    .map((chain) => {
      let rpcs: Chains[number]["rpcs"] = [];

      const extraRpcs = allExtraRpcs[chain.chainId]?.rpcs as ExtraRPC[];
      if (extraRpcs) {
        const erpcs = extraRpcs.map(removeEndingSlashObject);

        chain.rpc
          .filter((rpc) => !rpc.includes("${INFURA_API_KEY}"))
          .forEach((rpc) => {
            const rpcObj = removeEndingSlashObject(rpc);
            if (erpcs.find((r) => r === rpcObj) === undefined) {
              erpcs.push(rpcObj);
            }
          });

        rpcs = erpcs;
      } else {
        rpcs = chain.rpc.map(removeEndingSlashObject);
      }

      chains[chain.chainId] = {
        name: chain.name,
        rpcs,
      };

      return;
    });

  const formattedJson = prettier.format(JSON.stringify(chains), {
    parser: "json",
  });

  fs.writeFileSync("./src/networksList.json", formattedJson);
};

main();
