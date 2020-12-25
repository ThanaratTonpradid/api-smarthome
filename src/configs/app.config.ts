import { registerAs } from '@nestjs/config';

import { ConfigName } from '../constants';

import { isProduction } from './helper.config';

export interface AppConfig {
  port: number;
  isProduction: boolean;
  authToken: string;
}

export const appConfig = registerAs(
  ConfigName.APP,
  (): AppConfig => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    isProduction: isProduction(process.env.NODE_ENV),
    authToken: process.env.AUTH_TOKEN,
  }),
);
