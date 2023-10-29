import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { IBasicController } from '@techbir/common';
import { CreateTodoDto, Todo, UpdateTodoDto } from '@techbir/database';
import { Repository } from 'typeorm';
import { slowDownResponse } from '@techbir/utils';

@ApiTags(TodoController.name)
@Controller()
export class TodoController implements IBasicController<Todo> {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>
  ) {}

  @Post('todo')
  @ApiOperation({ summary: 'Create new todo item.' })
  @ApiUnprocessableEntityResponse({
    description: 'When input validation or unique contraint is failed!',
  })
  @ApiCreatedResponse({
    description: 'When successfully created the Todo item',
  })
  async save(@Body(ValidationPipe) item: CreateTodoDto): Promise<Todo> | never {
    try {
      await this.repo.findOneByOrFail({ title: item.title });
    } catch (err) {
      const data = await this.repo.save(item);

      return await slowDownResponse(data);
    }
    throw new UnprocessableEntityException(`title must be unique!`);
  }

  @Get('todos')
  @ApiOperation({ summary: 'Get all todo items from database.' })
  @ApiOkResponse({ description: 'When successfully returned the Todos' })
  async find(): Promise<Todo[]> {
    const data = await this.repo.find();
    return slowDownResponse(data);
  }

  @Get('todo/:id')
  @ApiOperation({ summary: 'Get one todo item by id from database.' })
  @ApiNotFoundResponse({ description: 'When the item is not found!' })
  @ApiOkResponse({ description: 'When the item is found!' })
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return await this.repo.findOneByOrFail({ id });
  }

  @Put('todo/:id')
  @ApiOperation({ summary: 'Update todo item.' })
  @ApiNotFoundResponse({ description: 'When the item is not found!' })
  @ApiOkResponse({ description: 'When successfully updated the item!' })
  @ApiUnauthorizedResponse({ description: 'When input validation is failed!' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) item: UpdateTodoDto
  ): Promise<{ updated: boolean }> {
    await this.repo.findOneByOrFail({ id });
    const updatedItem = await this.repo.update(id, item);
    return { updated: !!updatedItem.affected };
  }

  @Delete('todo/:id')
  @ApiOperation({ summary: 'Delete todo item.' })
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ deleted: boolean }> {
    const deletedItem = await this.repo.delete(id);
    return { deleted: !!deletedItem.affected };
  }
}
