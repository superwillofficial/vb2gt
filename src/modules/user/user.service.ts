import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { UserEntity } from './user.entity';

export interface UserResponse {
  list: UserEntity[];
  count: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // 建立新用户
  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const userExisted = this.userRepository.findOne({phone: user.phone});
    if(userExisted) {
      throw new HttpException('用户已存在!', 403)
    }
    return await this.userRepository.save(user);
  }

  // 获取用户列表
  async findAll(query): Promise<UserResponse> {
    const qb = await getRepository(UserEntity).createQueryBuilder('user');
    qb.where('1=1');
    qb.orderBy('user.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...param } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const users = await qb.getMany();
    return { list: users, count: count };
  }

  // 获取指定用户
  async findById(id): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new HttpException('用户不存在!', 401);
    return user;
  }

  // 更新用户资料
  async updateById(id, user): Promise<UserEntity> {
    const existUser = await this.userRepository.findOne(id);
    if (!existUser) {
      throw new HttpException(`用户${id}不存在`, 401);
    }
    const updateUser = this.userRepository.merge(existUser, user);
    return this.userRepository.save(updateUser);
  }

  // 删除用户
  async remove(id) {
    const existUser = await this.userRepository.findOne(id);
    if (!existUser) {
      throw new HttpException(`用户${id}不存在`, 401);
    }
    return await this.userRepository.remove(existUser);
  }
}
