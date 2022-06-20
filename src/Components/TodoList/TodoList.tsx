import { TodoListBlock } from './styled';
import { useRecoilState } from 'recoil';
import { todos } from '../../store/atom/todo';
import TodoItem from '../../Components/TodoItem';
import { Todo } from 'types/todoTypes';
import { DragEvent } from 'react';

import { pipe, slice, append, toArray, concat } from '@fxts/core';

function TodoList() {
  let sourceElement: HTMLElement | undefined = undefined;

  const [myTodos, setMyTodos] = useRecoilState<Todo[]>(todos);

  const handleDragStart = (event: DragEvent<HTMLElement>) => {
    sourceElement = event.target as HTMLElement;
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleDragEnd = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();

    const target = event.target as HTMLElement;
    if (sourceElement !== target) {
      const list = myTodos.filter((_, index) => String(index) !== sourceElement?.id);

      const removed = myTodos.filter((_, index) => String(index) === sourceElement?.id)[0];
      const insertAt = Number(target.id);
      let tempList;

      if (insertAt >= list.length) {
        tempList = pipe(list, slice(0), append(removed), toArray);
        setMyTodos(tempList);
      } else if (insertAt < list.length) {
        tempList = pipe(list, slice(0, insertAt), append(removed), toArray);
        const newList = pipe(slice(insertAt, list), concat(tempList), toArray);
        setMyTodos(newList);
      }
    }
  };

  return (
    <TodoListBlock>
      {myTodos.map(({ id, text, done, edit }, index) => (
        <TodoItem
          key={id + text}
          index={index}
          id={id}
          text={text}
          done={done}
          edit={edit}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
