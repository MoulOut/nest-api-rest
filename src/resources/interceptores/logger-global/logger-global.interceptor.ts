import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequisicaoComUsuario } from 'src/modules/autenticacao/autenticacao.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();

    const requisicao = contextHttp.getRequest<Request | RequisicaoComUsuario>();
    const resposta = contextHttp.getResponse<Response>();

    const { path, method } = requisicao;
    const { statusCode } = resposta;
    this.logger.log(`${method} ${path}`);

    const momentoPreControlador = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('usuario' in requisicao) {
          this.logger.log(
            `Rota acessada pelo usuario ${requisicao.usuario.sub}`,
          );
        }
        const tempoDeExecucaoDaRota = Date.now() - momentoPreControlador;
        this.logger.log(
          `Resposta: Status ${statusCode} - ${tempoDeExecucaoDaRota}ms`,
        );
      }),
    );
  }
}
