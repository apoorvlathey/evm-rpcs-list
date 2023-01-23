const _networksList = require("./networksList.json");

interface ChainInfo {
  name: string;
  rpc: string[];
  chainId: number;
}

const networksList = _networksList as ChainInfo[];

export default networksList;
