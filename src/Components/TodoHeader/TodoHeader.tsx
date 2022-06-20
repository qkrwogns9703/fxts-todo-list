import dayjs from 'dayjs';
import { TodoHeadBlock } from './styled';

import { useRecoilValue } from 'recoil';
import { todos } from '../../store/atom/todo';
import 'dayjs/locale/ko';

import { filter, toArray, pipe } from '@fxts/core';
import { useMemo } from 'react';

function TodoHeader() {
  const myTodos = useRecoilValue(todos);

  const leftTodos = useMemo(() => {
    return pipe(
      myTodos,
      filter((todo) => !todo.done),
      toArray
    );
  }, [myTodos]).length;

  const today = dayjs().format('YYYY년 MM월 DD일');
  const dayOfWeek = dayjs().locale('ko').format('ddd요일');
  return (
    <TodoHeadBlock>
      <h1>{today}</h1>
      <div className='day'>{dayOfWeek}</div>
      <div className='tasks-left'>{`할 일 ${leftTodos}개 남음`}</div>
    </TodoHeadBlock>
  );
}

export default TodoHeader;
