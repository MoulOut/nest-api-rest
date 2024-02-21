import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashSenhaPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(senha: string) {
    const salt = this.configService.get<string>('SALT_PASS');

    const senhaHasheada = await bcrypt.hash(senha, salt!);

    return senhaHasheada;
  }
}
