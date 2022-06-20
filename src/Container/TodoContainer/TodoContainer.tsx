import AddTodo from '../../Components/AddTodo';
import TodoHeader from '../../Components/TodoHeader';
import TodoList from '../../Components/TodoList';
import { TodoTemplate } from './styled';

function TodoContainer() {
  return (
    <TodoTemplate>
      <TodoHeader />
      <TodoList />
      <AddTodo />
    </TodoTemplate>
  );
}

export default TodoContainer;
