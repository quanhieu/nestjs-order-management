import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(json({ limit: '5mb' }));
  app.use(compression());

  // global filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // config swagger
  const config = new DocumentBuilder().setTitle('').setDescription('').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const hostname = process.env.APP_HOST || 'localhost';
  const port = process.env.APP_PORT || 8000;

  await app.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`, 'Bootstrap');
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
