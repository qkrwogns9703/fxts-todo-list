import { TodoListBlock } from './styled';
import { useRecoilState } from 'recoil';
import { todos } from '../../store/atom/todo';
import TodoItem from '../../Components/TodoItem';
import { Todo } from 'types/todoTypes';
import { DragEvent } from 'react';

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
      const list = myTodos.filter((_, i) => i.toString() !== sourceElement?.id);

      const removed = myTodos.filter((_, i) => i.toString() === sourceElement?.id)[0];
      let insertAt = Number(target.id);
      let tempList;

      if (insertAt >= list.length) {
        tempList = list.slice(0).concat(removed);
        setMyTodos(tempList);
      } else if (insertAt < list.length) {
        tempList = list.slice(0, insertAt).concat(removed);
        const newList = tempList.concat(list.slice(insertAt));
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
