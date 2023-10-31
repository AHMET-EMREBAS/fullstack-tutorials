import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from './user.entity';
import { UpdateUserDto, UserDto } from './user.dto';

@ApiTags('User Controller')
@Controller()
export class UserController {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get('users')
  find() {
    return this.repo.find();
  }

  @Get('user/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @Post('user')
  async save(@Body(new ValidationPipe({ transform: true })) body: UserDto) {
    const { id } = await this.repo.save(body);
    const found = await this.repo.findOneBy({ id });
    this.eventEmitter.emit('user.save', found);
    return found;
  }

  @Put('user/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) body: UpdateUserDto
  ) {
    const updated = await this.repo.update(id, body);
    this.eventEmitter.emit('user.update', updated);
    return updated;
  }

  @Delete('user/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.repo.delete(id);
    this.eventEmitter.emit('user.delete', deleted);
    return deleted;
  }
}
