import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { SwitchableValidationPipe } from './core/shared-kernel/pipe/switchable-validation.pipe';
import ApiResponseInterceptor from './core/shared-kernel/rest/general/api-response.interceptor';
import { FinalExceptionFilter } from './core/shared-kernel/rest/general/final-exception.filter';

export function initApi(app: NestExpressApplication) {
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new FinalExceptionFilter());
  app.useGlobalPipes(new SwitchableValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ApiResponseInterceptor());
}

export function initDocs(app: NestExpressApplication) {
  const DOCS_UI_PATH = 'docs';
  const JSON_PATH = '../docs-json';

  const documentationBuilder = new DocumentBuilder();

  const options = documentationBuilder
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Login',
    })
    .setDescription('API documentation')
    .setVersion(process.env.VERSION || '1.0.0')
    .setTitle('API')
    .setExternalDoc('Postman Collection', `${JSON_PATH}`)
    .build();

  const swaggerDocumentation = SwaggerModule.createDocument(app, options);

  // app.use(
  //   swStats.getMiddleware({
  //     uriPath: '/docs/stats',
  //     swaggerSpec: swaggerDocumentation,
  //     authentication: process.env.DOCS_USER,
  //     onAuthenticate: function (req, username, password) {
  //       // simple check for username and password
  //       if (process.env.DOCS_USER) {
  //         return (
  //           username === process.env.DOCS_USER &&
  //           password === process.env.DOCS_PASSWORD
  //         );
  //       }
  //       return true;x
  //     },
  //   }),
  // );

  if (process.env.DOCS_USER) {
    app.use(
      `/${DOCS_UI_PATH}`,
      basicAuth({
        users: {
          [process.env.DOCS_USER || 'developer']: process.env.DOCS_PASSWORD || 'test',
        },
        challenge: true,
      }),
    );
  }

  SwaggerModule.setup(DOCS_UI_PATH, app, swaggerDocumentation);
}
