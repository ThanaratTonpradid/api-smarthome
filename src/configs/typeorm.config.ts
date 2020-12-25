import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StringUtility } from '../utils';

type DatabaseType = 'mysql' | 'mariadb';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as DatabaseType,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: StringUtility.isEnabled(process.env.DB_LOGGING),
  synchronize: StringUtility.isEnabled(process.env.DB_SYNC),
  timezone: '+07:00',
  entities: ['**/entities/*.js'],
  ssl: StringUtility.isEnabled(process.env.DB_SSL)
    ? { rejectUnauthorized: false }
    : false,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
