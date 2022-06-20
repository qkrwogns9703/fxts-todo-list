import { TodoItemBlock, CheckCircle, Text, Remove, Edit, Input } from './styled';

import { MdDone, MdDelete, MdModeEdit } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { todos } from '../../store/atom/todo';
import { KeyboardEvent } from 'react';
import { Todo, TodoItemProps } from 'types/todoTypes';
import { filter, toArray, pipe, map } from '@fxts/core';

function TodoItem({
  id,
  done,
  text,
  edit,
  index,
  onDragStart,
  onDragEnd,
  onDragOver,
}: TodoItemProps) {
  const [myTodos, setMyTodos] = useRecoilState<Todo[]>(todos);

  const handleDeleteTodo = () => {
    setMyTodos(
      pipe(
        myTodos,
        filter((todo) => todo.id !== id),
        toArray
      )
    );
  };

  const handleTodoStatus = () => {
    setMyTodos(
      pipe(
        myTodos,
        map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
        toArray
      )
    );
  };

  const handleTodoEdit = () => {
    setMyTodos(
      pipe(
        myTodos,
        map((todo) => (todo.id === id ? { ...todo, edit: !todo.edit } : todo)),
        toArray
      )
    );
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      if (!value) return;
      setMyTodos(
        pipe(
          myTodos,
          map((todo) => (todo.id === id ? { ...todo, text: value, edit: !todo.edit } : todo)),
          toArray
        )
      );
    }
  };

  return (
    <TodoItemBlock
      id={String(index)}
      className='awdawdwa'
      draggable='true'
      onDragStart={onDragStart}
      onDrop={onDragEnd}
      onDragOver={onDragOver}
      role='listitem'
    >
      <CheckCircle id={String(index)} onClick={handleTodoStatus} done={done}>
        {done && <MdDone />}
      </CheckCircle>
      {edit ? (
        <Input id={String(index)} autoFocus onKeyPress={handleOnKeyPress} placeholder={text} />
      ) : (
        <Text id={String(index)} done={done}>
          {text}
        </Text>
      )}

      <Edit>
        <MdModeEdit onClick={handleTodoEdit} />
      </Edit>
      <Remove>
        <MdDelete onClick={handleDeleteTodo} />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
