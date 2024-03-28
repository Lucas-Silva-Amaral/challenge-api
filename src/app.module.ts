import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PersonModule } from './modules/users/user.module'
import { PersonController } from './modules/users/user.controller'
import { AddressModule } from './modules/address/address.module'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: String(process.env.TYPEORM_PASSWORD),
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    PersonModule,
    AddressModule,
    AuthModule
  ],
  controllers: [AppController, PersonController],
  providers: [AppService]
})
export class AppModule {}
