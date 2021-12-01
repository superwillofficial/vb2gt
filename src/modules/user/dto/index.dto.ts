import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateuserDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称必填!!' })
  readonly username: string;

  @ApiProperty({ description: '手机号码' })
  @IsNotEmpty({ message: '手机号码必填!!' })
  readonly phone: string;

  @ApiProperty({ description: '性别' })
  readonly gender: number;

  @ApiProperty({ description: '场上位置' })
  @IsNotEmpty({ message: '场上位置必填!!' })
  readonly position: string;
}
