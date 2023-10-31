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
import { Role } from './role.entity';
import { RoleDto, UpdateRoleDto } from './role.dto';

@ApiTags('Role Controller')
@Controller()
export class RoleController {
  constructor(
    @InjectRepository(Role) private readonly repo: Repository<Role>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get('roles')
  find() {
    return this.repo.find();
  }

  @Get('role/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @Post('role')
  async save(@Body(new ValidationPipe({ transform: true })) body: RoleDto) {
    const { id } = await this.repo.save(body);
    const found = await this.repo.findOneBy({ id });
    this.eventEmitter.emit('role.save', found);
    return found;
  }

  @Put('role/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) body: UpdateRoleDto
  ) {
    const updated = await this.repo.update(id, body);
    this.eventEmitter.emit('role.update', updated);
    return updated;
  }

  @Delete('role/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.repo.delete(id);
    this.eventEmitter.emit('role.delete', deleted);
    return deleted;
  }
}
