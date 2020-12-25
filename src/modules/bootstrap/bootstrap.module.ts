import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  appConfig,
  jwtConfig,
} from '../../configs';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        appConfig,
        jwtConfig,
      ],
    }),
  ],
})
export class BootstrapModule {}
