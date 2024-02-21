import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/emailUnico.validator';

export class CriaUsuarioDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  nome: string;

  @IsEmail(undefined, { message: 'O Email enviado é invalido.' })
  @EmailUnico({ message: 'Já existe um usuario com este e-mail.' })
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?/]).{8,30}$/,
    {
      message:
        'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
    },
  )
  @MinLength(8, { message: 'A senha precisa ter no minimo 8 caracteres.' })
  senha: string;
}
