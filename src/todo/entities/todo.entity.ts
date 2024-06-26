import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from './todo.enums';

export class Todo {
  @ApiProperty({
    description: 'Unique identifier for the todo item',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the todo item',
    example: 'Buy groceries',
  })
  title: string;

  @ApiProperty({
    description: 'Details about the todo item',
    example: 'Remember to buy milk, bread, and eggs',
  })
  details?: string;

  @ApiProperty({
    description: 'User ID associated with the todo item',
    example: '123',
  })
  userId: string;

  @ApiProperty({
    description: 'Creation timestamp of the todo item',
    example: '2024-06-02T14:48:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Position of the todo item',
    example: 1,
    required: false,
  })
  position?: number;

  @ApiProperty({
    description: 'Priority of the todo item',
    example: 'major',
  })
  priority: TaskPriority = TaskPriority.minor;

  @ApiProperty({
    description: 'Status of the todo item',
    example: 'open',
  })
  status: TaskStatus = TaskStatus.open;

  @ApiProperty({
    description: 'Array of sub-task IDs',
    example: ['subtask1', 'subtask2'],
    required: false,
  })
  subTasks?: string[];
}
