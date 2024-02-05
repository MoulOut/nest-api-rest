import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class criaUsuarioDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;
  @IsEmail(undefined, { message: 'O Email enviado é invalido.' })
  email: string;
  @MinLength(8, { message: 'A senha precisa ter no minimo 8 caracteres.' })
  senha: string;
}
