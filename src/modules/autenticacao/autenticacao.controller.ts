import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDto } from './dto/autentica.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  async login(@Body() { email, senha }: AutenticaDto) {
    const token = await this.autenticacaoService.login(email, senha);

    return token;
  }
}
