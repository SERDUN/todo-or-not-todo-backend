import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../entities/todo.enums';

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

  @ApiPropertyOptional({
    description: 'Position of the todo item',
    example: 1,
  })
  position?: number;

  @ApiPropertyOptional({
    description: 'Priority of the todo item',
    example: 'major',
  })
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'Status of the todo item',
    example: 'open',
  })
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Array of sub-task IDs',
    example: ['subtask1', 'subtask2'],
  })
  subTasks?: string[];
}
