import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/users';

@Module({
  controllers: [],
  providers: [],
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),        
      TypeOrmModule.forRoot({            
              type: "postgres",
              host: process.env.POSTGRES_HOST,
              port: Number(process.env.POSTGRES_PORT),
              username: process.env.POSTGRES_USER,
              password: process.env.POSTGRES_PASSWORD,
              database: process.env.POSTGRES_DATABASE,
              entities: [Users],  
              synchronize: Boolean(process.env.POSTGRES_DATABASE_SYNC),              
              autoLoadEntities: true,            
      }),
      UsersModule,         
  ]
})
export class AppModule {}
