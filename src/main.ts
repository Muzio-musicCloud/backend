import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('muzio api 문서')
    .setDescription('muzio - music cloud')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'JWT 토큰을 입력해주세요',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'muzio api 문서',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, swaggerOptions);

  await app.listen(3000);
}
bootstrap();
