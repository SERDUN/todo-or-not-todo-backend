import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';
import { CONFIG } from './config';
import { Express } from 'express-serve-static-core';
import * as admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const expressServer = express();

admin.initializeApp({
  credential: admin.credential.cert(functions.config().todo_firebase_config),
  databaseURL: 'https://todo-or-not-todo-5b704-default-rtdb.firebaseio.com',
});

const createFunction = async (expressInstance: Express): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  const options = new DocumentBuilder()
    .setTitle('Todo or not todo')
    .setDescription('API description')
    .setVersion('1.0')
    .addServer(
      'https://us-central1-todo-or-not-todo-5b704.cloudfunctions.net/api/v1',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
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
