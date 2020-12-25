import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfig } from './configs';
import { AllExceptionsFilter } from './filters';
import { AppModule } from './modules/app';
import { validationPipeOptions } from './pipes';

const logger = new Logger('NestApplication');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, isProduction } = configService.get<AppConfig>('app');
  
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalFilters(new AllExceptionsFilter());

  if (!isProduction) {
    const options = new DocumentBuilder()
      .setTitle('api-smarthome')
      .setDescription('Auau Smarthome API')
      .setVersion('')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(port);
  const url = await app.getUrl();
  logger.log(`Nest application is listening on ${url}`);
}

(async (): Promise<void> => {
  await bootstrap();
})().catch((error: Error) => {
  logger.error(`Nest application error: ${error.message}`);
});
