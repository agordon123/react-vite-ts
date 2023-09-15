import { ConfigInterface } from "@/config/models/Config.interface";
import configMock from './config-files/mock.json'
import configJsonServer from './config-files/jsonserver.json'
import configLocal from './config-files/localapis.json'
import configBeta from './config-files/beta.json'
import configProduction from './config-files/production.json'

export const configFilesMap: Map<string, ConfigInterface> = new Map<string, ConfigInterface>([
['mock', configMock],
['jsonserver', configJsonServer],
['localapis', configLocal],
['beta', configBeta],
['production', configProduction]
])