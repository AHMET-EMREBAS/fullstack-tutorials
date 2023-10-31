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
import { UpdateCategoryDto, Category, CategoryDto } from '@techbir/database';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('Category Controller')
@Controller()
export class CategoryController {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get('categories')
  find() {
    return this.repo.find();
  }

  @Get('category/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @Post('category')
  async save(@Body(ValidationPipe) body: CategoryDto) {
    const { id } = await this.repo.save(body);
    const found = await this.repo.findOneBy({ id });
    this.eventEmitter.emit('category.save', found);
    return found;
  }

  @Put('category/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateCategoryDto
  ) {
    const updated = await this.repo.update(id, body);
    this.eventEmitter.emit('category.update', updated);
    return updated;
  }

  @Delete('category/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.repo.delete(id);
    this.eventEmitter.emit('category.delete', deleted);
    return deleted;
  }
}
