import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const PORT = process.env.PORT || 5000;

  // Create NestJS application
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Users aplication backend')
    .setDescription('Documentation of Users application Backend')
    .setVersion('1.0.0')
    .addTag('Users')    
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
    
  // Start the application
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap();
