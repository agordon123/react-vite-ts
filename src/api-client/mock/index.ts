import { LocalizationApiClientModel,LocalizationApiClientInterface } from '../models';
// import module instances
import { config } from '@/config';
const localizationApiClient: LocalizationApiClientInterface = new LocalizationApiClientModel(config.localization.apiClientOptions)

// create an instance of our main ApiClient that wraps the mock child clients
export {localizationApiClient}