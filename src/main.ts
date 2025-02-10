import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCumtomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main-gateway');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,// remove any extra fields that are not in the DTO
      forbidNonWhitelisted: true,// throw an error if extra fields are presents
    }
  ));
  app.useGlobalFilters(new RpcCumtomExceptionFilter());
  await app.listen(envs.PORT);
  logger.log(`Gateway running on http://localhost:${envs.PORT}`);
}
bootstrap();
