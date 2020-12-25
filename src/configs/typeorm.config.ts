import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigName } from '../constants';

import { isEnabled } from './helper.config';

type DatabaseType = 'mysql' | 'mariadb';

export const typeOrmConfig = registerAs(
  ConfigName.TYPEORM,
  (): TypeOrmModuleOptions => ({
    timezone: '+07:00',
    entities: ['**/entities/*.js'],
    type: process.env.DB_TYPE as DatabaseType,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: isEnabled(process.env.DB_LOGGING),
    synchronize: isEnabled(process.env.DB_SYNC),
    ssl: isEnabled(process.env.DB_SSL) ? { rejectUnauthorized: false } : false,
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  }),
);
