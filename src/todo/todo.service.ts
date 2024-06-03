import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { firestore } from 'firebase-admin';
import { REQUEST } from '@nestjs/core';
import { Todo } from './entities/todo.entity';
import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';

@Injectable()
export class TodoService {
  private collection: FirebaseFirestore.CollectionReference<Todo>;

  constructor(@Inject(REQUEST) private readonly request: { user: any }) {
    this.collection = firestore().collection(
      'todos',
    ) as FirebaseFirestore.CollectionReference<Todo>;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const userId = this.request.user.uid;
    const todoData: Omit<Todo, 'id'> = {
      ...createTodoDto,
      createdAt: new Date().toISOString(),
      userId,
    };

    const docRef = await this.collection.add(todoData as any);
    return {
      id: docRef.id,
      ...todoData,
    };
  }

  async findAll(): Promise<Todo[]> {
    const userId = this.request.user.uid;
    const querySnapshot: QuerySnapshot<Todo> = await this.collection
      .where('userId', '==', userId)
      .get();

    if (querySnapshot.empty) {
      return [];
    }

    const todos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      todos.push(this.transformTodo(doc));
    });

    return todos;
  }

  async findOne(id: string): Promise<Todo> {
    const doc: DocumentSnapshot<Todo> = await this.collection.doc(id).get();
    return this.transformTodo(doc);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    await this.collection.doc(id).update(updateTodoDto as any);
  }

  async remove(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }

  private transformTodo(doc: DocumentSnapshot<Todo>): Todo {
    if (!doc.exists) {
      throw new Error('No todo found with the given id');
    }

    const todo = doc.data() as Todo;
    const userId = this.request.user.uid;

    if (todo.userId !== userId) {
      throw new Error('No todo found with the given id');
    }

    return {
      id: doc.id,
      ...todo,
    };
  }
}
