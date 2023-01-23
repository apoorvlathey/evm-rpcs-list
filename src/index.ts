const _networksList = require("./networksList.json");

const networksList = _networksList as {
  // JSON.stringify converts number keys to string
  [chainId: string]: {
    name: string;
    rpcs: string[];
  };
};

export default networksList;
