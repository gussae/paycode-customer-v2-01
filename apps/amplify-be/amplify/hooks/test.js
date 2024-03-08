import { config } from '../../scripts/config.js';
import { interceptAxiosClient } from '@paycode-customer-v2/utils';
const {
  paycodeProxyBaseUrl,
  paycodeProxyClientTsPath,
  paycodeProxyOutputPath,
  paycodeProxyOutputFileName,
} = config;

// console.log({

//   paycodeProxyBaseUrl,
//   paycodeProxyClientTsPath,
//   paycodeProxyOutputPath,
//   paycodeProxyOutputFileName,
// });

interceptAxiosClient(
  paycodeProxyClientTsPath,
  paycodeProxyBaseUrl,
  paycodeProxyOutputPath,
  paycodeProxyOutputFileName,
);
