import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { GameEntity } from './game.entity';

export interface GameResponse {
  list: GameEntity[];
  count: number;
}

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {}

  // 建立新球局
  async createGame(game: Partial<GameEntity>): Promise<GameEntity> {
    return await this.gameRepository.save(game);
  }

  // 获取用户列表
  async findAll(query): Promise<GameResponse> {
    const qb = await getRepository(GameEntity).createQueryBuilder('user');
    qb.where('1=1');
    qb.orderBy('user.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...param } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const users = await qb.getMany();
    return { list: users, count: count };
  }

  // 获取用户所建立的所有球局
  async getGamesByUserId(userId): Promise<GameResponse> {
    const qb = await getRepository(GameEntity)
      .createQueryBuilder('game')
      .where('game.manager = :id', { id: userId });
    const games = await qb.getMany();
    const count = await qb.getCount();
    return { list: games, count: count };
  }

  // 通过球局Id获取球局
  async getGameById(id): Promise<GameEntity> {
    const game = this.gameRepository.findOne(id);
    if (!game) throw new HttpException('球局不存在!', 401);
    return game;
  }

  // 删除球局
  async remove(id) {
    const existGame = await this.gameRepository.findOne(id);
    if (!existGame) {
      throw new HttpException(`球局${id}不存在`, 401);
    }
    return await this.gameRepository.remove(existGame);
  }
}
