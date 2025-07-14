import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebappModule } from './webapp/webapp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '6543'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/entities/**/*{.ts,.js}'],
      migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: false,
    }),
    forwardRef(() => WebappModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
