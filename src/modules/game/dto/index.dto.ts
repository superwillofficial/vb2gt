import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/modules/user/user.entity';

export class CreateGameDto {
  @ApiProperty({ description: '球局标题' })
  readonly title: string;

  @ApiProperty({ description: '报名开始时间' })
  @IsNotEmpty({ message: '报名开始时间必填!!' })
  readonly registrationStartTime: Date;

  @ApiProperty({ description: '报名结束时间' })
  @IsNotEmpty({ message: '报名结束时间必填!!' })
  readonly registrationEndTime: Date;

  @ApiProperty({ description: '球局开始时间' })
  @IsNotEmpty({ message: '球局开始时间必填!!' })
  readonly gameStartTime: Date;

  @ApiProperty({ description: '球局结束时间' })
  @IsNotEmpty({ message: '球局结束时间必填!!' })
  readonly gameEndTime: Date;

  @ApiProperty({ description: '球局状态' })
  @IsNotEmpty({ message: '球局状态必填!!' })
  readonly gameStatus: number;

  @ApiProperty({ description: '球局创建人' })
  @IsNotEmpty({ message: '球局创建人必填!!' })
  readonly manager: UserEntity;

  @ApiProperty({ description: '场馆' })
  @IsNotEmpty({ message: '场馆必填!!' })
  readonly venue: string;

  @ApiProperty({ description: '人数上限' })
  @IsNotEmpty({ message: '人数上限必填!!' })
  readonly noLimit: number;

  @ApiProperty({ description: '场地费用' })
  @IsNotEmpty({ message: '场地费用必填!!' })
  readonly totalFees: number;
}
