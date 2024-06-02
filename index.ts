import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';
import { CONFIG } from './config';
import { Express } from 'express-serve-static-core';

const expressServer = express();

const createFunction = async (expressInstance: Express): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: CONFIG.origin,
    methods: CONFIG.corsMethods,
    allowedHeaders: CONFIG.corsAllowedHeaders,
  });
  await app.init();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
