import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailValidator } from './validacao/emailUnico.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [EmailValidator, UsuarioService],
})
export class UsuarioModule {}
