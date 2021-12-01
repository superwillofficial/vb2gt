import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, length: 30 })
  title: string;

  @Column()
  registrationStartTime: Date;

  @Column()
  registrationEndTime: Date;

  @Column()
  gameStartTime: Date;

  @Column()
  gameEndTime: Date;

  @Column()
  gameStatus: number;

  @ManyToOne((type) => UserEntity, (manager) => manager.games)
  manager: UserEntity;

  @Column()
  venue: string;

  @Column()
  noLimit: number;

  @Column({ name: 'total_fees' })
  totalFees: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;
}
