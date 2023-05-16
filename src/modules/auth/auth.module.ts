import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/database/users.entity'
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import {PassportModule} from '@nestjs/passport'

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
