import fs from "fs";

const defaultConfig = {
  baseCurrency: "AIDP",
  aidp_password: "anonymous",
  aidp_username: "anonymous",
  aidp_url: "https://rvn-rpc-testnet.ting.finance/rpc",
  httpPort: 80,
  headline: "Ravencoin Testnet",
  theme: "dark",
  ipfs_gateway: "https://cloudflare-ipfs.com/ipfs/",
};
const PROMPT_USER_TO_UPDATE_MESSAGE =
  "Please update your ./config.json file with your info";
export default function getConfig() {
  createConfigIfNeeded();

  const text = Buffer.from(fs.readFileSync("./config.json"));
  const config = JSON.parse(text);
  validateConfig(config);

  return config;
}

function createConfigIfNeeded() {
  if (fs.existsSync("./config.json") === false) {
    const text = JSON.stringify(defaultConfig, null, 4);
    fs.writeFileSync("./config.json", text); 
  }
}

function validateConfig(config) {
  if (!config.aidp_password) {
    throw new Error(PROMPT_USER_TO_UPDATE_MESSAGE);
  }
}
