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
import { CreateUserDto, UpdateUserDto, User } from '@techbir/database';
import { Repository } from 'typeorm';

@ApiTags(UserController.name)
@Controller()
export class UserController implements IBasicController<User> {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  @Post('user')
  @ApiOperation({ summary: 'Create new user item.' })
  @ApiUnprocessableEntityResponse({
    description: 'When input validation or unique contraint is failed!',
  })
  @ApiCreatedResponse({
    description: 'When successfully created the User item',
  })
  async save(@Body(ValidationPipe) item: CreateUserDto): Promise<User> | never {
    try {
      await this.repo.findOneByOrFail({ username: item.username });
    } catch (err) {
      return this.repo.save(item);
    }
    throw new UnprocessableEntityException(
      `User item with the same title already exist!`
    );
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all user items from database.' })
  @ApiOkResponse({ description: 'When successfully returned the Users' })
  find(): Promise<User[]> {
    return this.repo.find();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get one user item by id from database.' })
  @ApiNotFoundResponse({ description: 'When the item is not found!' })
  @ApiOkResponse({ description: 'When the item is found!' })
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.repo.findOneByOrFail({ id });
  }

  @Put('user/:id')
  @ApiOperation({ summary: 'Update user item.' })
  @ApiNotFoundResponse({ description: 'When the item is not found!' })
  @ApiOkResponse({ description: 'When successfully updated the item!' })
  @ApiUnauthorizedResponse({ description: 'When input validation is failed!' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) item: UpdateUserDto
  ): Promise<{ updated: boolean }> {
    await this.repo.findOneByOrFail({ id });
    const updatedItem = await this.repo.update(id, item);
    return { updated: !!updatedItem.affected };
  }

  @Delete('user/:id')
  @ApiOperation({ summary: 'Delete user item.' })
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ deleted: boolean }> {
    const deletedItem = await this.repo.delete(id);
    return { deleted: !!deletedItem.affected };
  }
}
