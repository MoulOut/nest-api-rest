import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioPayload } from './autenticacao.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requisicao = context
      .switchToHttp()
      .getRequest<RequisicaoComUsuario>();
    const token = this.extrairToken(requisicao);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT invalido.');
    }
    return true;
  }

  private extrairToken(req: Request): string | undefined {
    const [tipo, token] = req.headers.authorization?.split(' ') ?? [];

    return tipo === 'Bearer' ? token : undefined;
  }
}
