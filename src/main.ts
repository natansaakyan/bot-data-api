import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'process';
import { initApi, initDocs } from './app.initializer';
import { AppModule } from './app.module';

process.env.TZ = 'UTC';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initApi(app);
  initDocs(app);
  await app.listen(3000);

  app.enableShutdownHooks();
}

bootstrap();
