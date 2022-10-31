import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Post],
        synchronize: true,
        autoLoadEntities: true,
        // dropSchema: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, JwtService, PostsService],
})
export class AppModule {}
