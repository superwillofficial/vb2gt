import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { UserEntity } from './user.entity';
import { UserService, UserResponse } from './user.service';
import { CreateuserDto } from './dto/index.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create user.
   * @param user
   */
  @ApiOperation({ summary: '建立用户' })
  @Post()
  async create(@Body() user: CreateuserDto) {
    return await this.userService.create(user);
  }

  /**
   * Get all users.
   */
  @ApiOperation({ summary: '获取所有用户' })
  @Get()
  async findAll(@Query() query): Promise<UserResponse> {
    return await this.userService.findAll(query);
  }

  /**
   * Get specific user.
   * @param id
   */
  @ApiOperation({ summary: '根据用户id获取用户' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.userService.findById(id);
  }

  /**
   * Update user info.
   * @param id
   * @param post
   */
  @ApiOperation({ summary: '透过用户id修改用户资料' })
  @Put(':id')
  async update(@Param('id') id, @Body() user) {
    return await this.userService.updateById(id, user);
  }

  /**
   * Delete user by Id.
   * @param id
   */
  @ApiOperation({ summary: '透过用户id移除用户' })
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.userService.remove(id);
  }
}
