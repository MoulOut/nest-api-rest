import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/emailUnico.validator';

export class atualizaUsuarioDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsOptional()
  nome: string;
  @IsEmail(undefined, { message: 'O Email enviado é invalido.' })
  @EmailUnico({ message: 'Já existe um usuario com este e-mail.' })
  @IsOptional()
  email: string;
  @MinLength(8, { message: 'A senha precisa ter no minimo 8 caracteres.' })
  @IsOptional()
  senha: string;
}
