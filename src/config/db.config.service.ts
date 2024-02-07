import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DB_URL'),
      // host: this.configService.get<string>('DB_HOST'),
      // port: this.configService.get<number>('DB_PORT'),
      // username: this.configService.get<string>('DB_USER'),
      // password: this.configService.get<string>('DB_PASS'),
      // database: this.configService.get<string>('DB_NAME'),
      entities: [],
      synchronize: true,
    };
  }
}
