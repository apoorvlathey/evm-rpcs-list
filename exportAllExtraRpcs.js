import { writeFileSync, mkdirSync } from "fs";
import _allExtraRpcs from "./lib/chainlist/constants/extraRpcs.js";

// Create data directory if it doesn't exist
mkdirSync("./data", { recursive: true });

// export as json
writeFileSync(
  "./data/allExtraRpcs.json",
  JSON.stringify(_allExtraRpcs, null, 2)
);
