import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDto } from './dto/criaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDto } from './dto/atualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('O usuario não foi encontrado.');
    }

    return usuario;
  }

  private trataDadosPedido(
    dadosDoPedido: CriaPedidoDto,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => {
        return produto.id === itemPedido.produtoId;
      });

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id:${itemPedido.produtoId} não foi encontrado.`,
        );
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponivel (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}.`,
        );
      }
    });
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDto) {
    const usuario = await this.buscaUsuario(usuarioId);
    const idsDosProdutos = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(idsDosProdutos),
    });
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    this.trataDadosPedido(dadosDoPedido, produtosRelacionados);

    const itemPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => {
        return produto.id === itemPedido.produtoId;
      });
      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    pedidoEntity.itensPedido = itemPedidoEntidades;

    const valorTotal = itemPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async encontraPedidos(usuarioId: string) {
    await this.buscaUsuario(usuarioId);

    const pedidos = await this.pedidoRepository.find({
      where: {
        usuario: {
          id: usuarioId,
        },
      },
      relations: {
        usuario: true,
      },
    });

    return pedidos;
  }

  async atualizaPedido(pedidoId: string, novoStatus: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });

    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }

    Object.assign(pedido, novoStatus as PedidoEntity);

    return this.pedidoRepository.save(pedido);
  }
}
