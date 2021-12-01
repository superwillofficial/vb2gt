import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import envConfig from '../config/env';

import { GameEntity } from './modules/game/game.entity';
import { UserEntity } from './modules/user/user.entity';

import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    // database config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [UserEntity, GameEntity],
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWD', '123456'),
        database: configService.get('DB_DATABASE', 'vb2gt'),
        timezone: '+08:00',
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy()
      }),
    }),
    // TypeOrmModule.forRoot(),
    UserModule,
    GameModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
