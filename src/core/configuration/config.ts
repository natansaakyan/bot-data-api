import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: './.env' });

const api_key = 'api-key';

export interface Configuration {
  authorization: {
    alphaAdvantageApiKey: string;
    polygonApiKey: string;
  };
}

function configure(): Configuration {
  return {
    authorization: {
      alphaAdvantageApiKey: process.env.ALPHA_ADV_API_KEY || 'N7ZLB4VTJOMCZ88I',
      polygonApiKey: process.env.POLYGON_API_KEY || 'vEQ7hWoHNpV8zv00ZZcBpeLwrixYPU86',
    },
  };
}

export const config: Configuration = configure();

export default (): Configuration => config;
