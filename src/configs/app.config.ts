import { registerAs } from '@nestjs/config';

import { isProduction } from './helper.config';

export interface AppConfig {
  port: number;
  isProduction: boolean;
  authToken: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    isProduction: isProduction(process.env.NODE_ENV),
    authToken: process.env.AUTH_TOKEN,
  }),
);
