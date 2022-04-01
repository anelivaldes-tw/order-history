import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceConfig } from './microserviceConfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Order History Service')
    .setDescription('The Order History API description')
    .setVersion('1.0')
    .addTag('order history for customers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice(microserviceConfig);

  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
