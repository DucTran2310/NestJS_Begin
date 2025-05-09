import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //remove field not used
    forbidNonWhitelisted: true // check field not used but send it in request
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
