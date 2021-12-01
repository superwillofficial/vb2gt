import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GameResponse, GameService } from './game.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGameDto } from './dto/index.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  constructor(private readonly gameService: GameService) {}
  /**
   * Create a game.
   * @param game
   */
  @ApiOperation({ summary: '建立球局' })
  @Post()
  async create(@Body() game: CreateGameDto) {
    return await this.gameService.createGame(game);
  }

  /**
   * Get all games.
   */
  @ApiOperation({ summary: '获取所有球局' })
  @Get('getAll')
  async findAll(@Query() query): Promise<GameResponse> {
    return await this.gameService.findAll(query);
  }

  /**
   * Get specific game by gameId.
   * @param id
   */
  @ApiOperation({ summary: '根据球局id获取球局' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.gameService.getGameById(id);
  }

//   /**
//    * Update user info.
//    * @param id
//    * @param post
//    */
//   @ApiOperation({ summary: '透过用户id修改用户资料' })
//   @Put(':id')
//   async update(@Param('id') id, @Body() user) {
//     return await this.gameService.updateById(id, user);
//   }

  /**
   * Delete user by Id.
   * @param id
   */
  @ApiOperation({ summary: '透过球局id移除球局' })
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.gameService.remove(id);
  }
}
