import { ConfigInterface } from "./ models/Config.interface";
import { configFilesMap } from "./config-file.map";
import { getAppConfigKey } from "./utils";

if (!configFilesMap.has(getAppConfigKey())) {
  throw Error(
    `Could not find config for VITE_APP_CONFIG key "${getAppConfigKey()}"`
  );
}

export const config = configFilesMap.get(getAppConfigKey()) as ConfigInterface;
