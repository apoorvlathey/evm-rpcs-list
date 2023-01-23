const _networksList = require("./networksList.json");

interface Chains {
  // JSON.stringify converts number keys to string
  [chainId: string]: {
    name: string;
    rpcs: string[];
  };
}

const networksList = _networksList as Chains;

export default networksList;
