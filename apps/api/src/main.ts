import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3001',
    'https://portal.your-domain.com',
    'https://your-app-project.vercel.app',
  ];

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3002;
  await app.listen(port);

  console.log(`API running on port ${port}`);
}
bootstrap();
