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
  PartialType,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { IBasicController } from '@techbir/common';
import { CreateTodoDto, Todo, UpdateTodoDto } from '@techbir/database';
import { Repository } from 'typeorm';

/**
 * Let's talk about each Decorators
 *
 * @ApiTag() is for organizing controllers in Swagger UI.
 *
 * @Controller() is NestJS decorator that defines a controller class.
 *
 * @ApiOperation() is for documenting the method so users understand what the end point is for?
 *
 * @Post() is for Post request
 * @Get() is for Get request
 * @Put() is for Put request
 * @Delete() is for Delete request
 * @Update() is for Update request
 *
 *
 * @Param('id') is for extracting the id parameters from the URI. ex. '/api/product/1', '1' is extracted.
 * @Body() is for extracting request body from the request.
 *
 */

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
  async save(@Body() item: CreateTodoDto): Promise<Todo> | never {
    try {
      await this.repo.findOneByOrFail({ title: item.title });
    } catch (err) {
      return this.repo.save(item);
    }
    throw new UnprocessableEntityException(
      `Todo item with the same title already exist!`
    );
  }

  @Get('todos')
  @ApiOperation({ summary: 'Get all todo items from database.' })
  @ApiOkResponse({ description: 'When successfully returned the Todos' })
  find(): Promise<Todo[]> {
    return this.repo.find();
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
