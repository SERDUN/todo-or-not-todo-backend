import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo: Todo = {
      id: this.generateId(),
      ...createTodoDto,
      userId: '123', // Example user ID
      createdAt: new Date().toISOString(),
    };
    this.todos.push(newTodo);
    return Promise.resolve(newTodo);
  }

  findAll(): Promise<Todo[]> {
    return Promise.resolve(this.todos);
  }

  findOne(id: string): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);
    return Promise.resolve(todo);
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return Promise.resolve(null);
    this.todos[index] = { ...this.todos[index], ...updateTodoDto };
    return Promise.resolve(this.todos[index]);
  }

  remove(id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return Promise.resolve();
  }

  private generateId(): string {
    return (Math.random() * 1000).toFixed(0);
  }
}
