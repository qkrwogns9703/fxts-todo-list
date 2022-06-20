import { DragEvent } from 'react';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  createdAt?: string;
  edit?: boolean;
}

export interface TodoItemProps extends Todo {
  index?: number;
  onDragStart: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: (event: DragEvent<HTMLElement>) => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
}
