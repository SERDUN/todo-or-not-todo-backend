import {
  Inject,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { firestore } from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
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

    // Ensure no duplicate positions for the same user
    if (createTodoDto.position !== undefined) {
      await this.adjustPositions(userId, createTodoDto.position);
    }

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
    if (!doc.exists) {
      throw new NotFoundException('Todo not found');
    }
    return this.transformTodo(doc);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    const userId = this.request.user.uid;
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException('Todo not found');
    }

    const todo = doc.data() as Todo;
    if (todo.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this todo',
      );
    }

    // Ensure no duplicate positions for the same user
    if (updateTodoDto.position !== undefined) {
      await this.adjustPositions(userId, updateTodoDto.position);
    }

    await this.collection.doc(id).update(updateTodoDto as any);
  }

  private async adjustPositions(
    userId: string,
    newPosition: number,
  ): Promise<void> {
    const querySnapshot: QuerySnapshot<Todo> = await this.collection
      .where('userId', '==', userId)
      .where('position', '==', newPosition)
      .get();

    const batch = firestore().batch();

    querySnapshot.forEach((doc) => {
      const docRef = this.collection.doc(doc.id);
      batch.update(docRef, { position: FieldValue.increment(1) });
    });

    await batch.commit();
  }

  async remove(id: string): Promise<void> {
    const userId = this.request.user.uid;
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException('Todo not found');
    }

    const todo = doc.data() as Todo;
    if (todo.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this todo',
      );
    }

    await this.collection.doc(id).delete();
  }

  private transformTodo(doc: DocumentSnapshot<Todo>): Todo {
    const todo = doc.data();
    if (!todo) {
      throw new NotFoundException('Todo data is missing');
    }

    const userId = this.request.user.uid;
    if (todo.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to view this todo',
      );
    }

    return {
      id: doc.id,
      ...todo,
    };
  }
}
