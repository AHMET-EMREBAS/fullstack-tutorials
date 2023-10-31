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
import {
  UpdatePermissionDto,
  Permission,
  PermissionDto,
} from '@techbir/database';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('Permission Controller')
@Controller()
export class PermissionController {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get('permissions')
  find() {
    return this.repo.find();
  }

  @Get('permission/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @Post('permission')
  async save(@Body(ValidationPipe) body: PermissionDto) {
    const { id } = await this.repo.save(body);
    const found = await this.repo.findOneBy({ id });
    this.eventEmitter.emit('permission.save', found);
    return found;
  }

  @Put('permission/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdatePermissionDto
  ) {
    const updated = await this.repo.update(id, body);
    this.eventEmitter.emit('permission.update', updated);
    return updated;
  }

  @Delete('permission/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.repo.delete(id);
    this.eventEmitter.emit('permission.delete', deleted);
    return deleted;
  }
}
