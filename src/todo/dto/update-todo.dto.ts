import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiPropertyOptional({
    description: 'Title of the todo item',
    example: 'Buy groceries',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Details about the todo item',
    example: 'Remember to buy milk, bread, and eggs',
  })
  details?: string;
}
