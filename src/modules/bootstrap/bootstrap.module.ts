import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  appConfig,
  jwtConfig,
  typeOrmConfig
} from '../../configs';
import { ConfigName } from '../../constants';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get<TypeOrmModuleOptions>(ConfigName.TYPEORM);
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        appConfig,
        jwtConfig,
        typeOrmConfig,
      ],
    }),
  ],
})
export class BootstrapModule {}
