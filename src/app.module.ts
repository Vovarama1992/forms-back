import { Module } from '@nestjs/common';
import { UsersModule } from './UserModule/users.module';
import { JwtModule } from './JwtModule/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './PrismaModule/prisma.module';
import { AuthModule } from './AuthModule/auth.module';

import { TaskModule } from './TaskModule/task.module';
import { ImageModule } from './ImageModule/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,

    JwtModule,
    TaskModule,

    UsersModule,

    ImageModule,

    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
