import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsArray, IsEnum,
} from 'class-validator';
import { TaskPriority, TaskStatus } from '../entities/todo.enums';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of the todo item',
    example: 'Buy groceries',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Details about the todo item',
    example: 'Remember to buy milk, bread, and eggs',
    required: false,
  })
  @IsString()
  @IsOptional()
  details?: string;

  @ApiProperty({
    description: 'Position of the todo item',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiProperty({
    description: 'Priority of the todo item',
    example: 'major',
  })
  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({
    description: 'Status of the todo item',
    example: 'open',
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'Array of sub-task IDs',
    example: ['subtask1', 'subtask2'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  subTasks?: string[];
}
