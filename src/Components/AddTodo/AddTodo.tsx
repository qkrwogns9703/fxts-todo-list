import { InsertFormPositioner, InsertForm, Input, CircleButton } from './styled';
import { MdAdd } from 'react-icons/md';
import { useState } from 'react';

import { KeyboardEvent } from 'react';

import { useRecoilState } from 'recoil';
import { todos } from '../../store/atom/todo';
import dayjs from 'dayjs';
import { last, pipe } from '@fxts/core';

function AddTodo() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [todoList, setTodos] = useRecoilState(todos);

  const handleInputToggle = () => {
    setIsToggleOpen((prev) => !prev);
  };

  const handleAddTodo = (text: string) => {
    const lastTodo = pipe(todoList, last);

    let id = lastTodo?.id || 0;

    const todo = {
      id: (id += 1),
      text,
      done: false,
      edit: false,
      createdAt: dayjs().format('YYYY-MM-DD'),
    };
    setTodos((prev) => [...prev, todo]);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      if (!value) return;
      handleAddTodo(value);
      setIsToggleOpen((prev) => !prev);
    }
  };

  return (
    <>
      {isToggleOpen && (
        <InsertFormPositioner>
          <InsertForm>
            <Input autoFocus placeholder='할 일을 입력해 주세요.' onKeyPress={handleOnKeyPress} />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={handleInputToggle} isOpen={isToggleOpen}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default AddTodo;
