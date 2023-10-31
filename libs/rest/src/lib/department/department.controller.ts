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
  UpdateDepartmentDto,
  Department,
  DepartmentDto,
} from '@techbir/database';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('DepartmentController')
@Controller()
export class DepartmentController {
  constructor(
    @InjectRepository(Department) private readonly repo: Repository<Department>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get('departments')
  find() {
    return this.repo.find();
  }

  @Get('department/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @Post('department')
  async save(@Body(ValidationPipe) body: DepartmentDto) {
    const { id } = await this.repo.save(body);
    const found = await this.repo.findOneBy({ id });
    this.eventEmitter.emit('department.save', found);
    return found;
  }

  @Put('department/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateDepartmentDto
  ) {
    const updated = await this.repo.update(id, body);
    this.eventEmitter.emit('department.update', updated);
    return updated;
  }

  @Delete('department/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.repo.delete(id);
    this.eventEmitter.emit('department.delete', deleted);
    return deleted;
  }
}
