import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),
    ProductModule,
    UsersModule,
    AuthModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
