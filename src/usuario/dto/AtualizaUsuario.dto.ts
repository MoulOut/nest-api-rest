import { CriaUsuarioDto } from './CriaUsuario.dto';
import { PartialType } from '@nestjs/mapped-types';

export class atualizaUsuarioDto extends PartialType(CriaUsuarioDto) {}
