import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './modules/pedido/pedido.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroExcecaoGlobal } from './resources/filtros/filtro-excecao-global';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    PedidoModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 10000,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroExcecaoGlobal,
    },
  ],
})
export class AppModule {}
