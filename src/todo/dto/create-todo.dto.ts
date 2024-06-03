import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

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
  details: string;

  @ApiProperty({
    description: 'Position of the todo item',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  position?: number;
}