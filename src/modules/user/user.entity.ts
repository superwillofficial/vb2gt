import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from '../game/game.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  username: string;

  @Column()
  phone: string;

  @Column({ type: 'tinyint', default: null })
  gender: number;

  @Column()
  position: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @OneToMany((type) => GameEntity, (game) => game.manager)
  games: GameEntity[];
}
