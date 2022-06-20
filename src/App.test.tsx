import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { RecoilRoot } from 'recoil';
import AddTodo from './Components/AddTodo';
import '@testing-library/jest-dom';

test('renders todoApp', () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const linkElement = screen.getByText(/할 일/i);
  expect(linkElement).toBeInTheDocument();
});

describe('AddTodo rendering test', () => {
  it('should render AddTodo input', () => {
    render(
      <RecoilRoot>
        <AddTodo />
      </RecoilRoot>
    );

    const target = screen.getByRole('button');
    fireEvent.click(target);

    const inputElement = screen.getByPlaceholderText(/할 일을 입력해 주세요./);
    expect(inputElement).toBeInTheDocument();
  });

  it('should add input value', () => {
    render(
      <RecoilRoot>
        <AddTodo />
      </RecoilRoot>
    );
    const target = screen.getByRole('button');
    fireEvent.click(target);

    const inputElement = screen.getByPlaceholderText(/할 일을 입력해 주세요./);
    fireEvent.change(inputElement, {
      target: {
        value: '리액트 공부하기',
      },
    });
    expect(inputElement).toHaveProperty('value', '리액트 공부하기');
  });

  it('should create new todo', () => {
    const handleKeyPress = jest.fn();
    render(
      <RecoilRoot>
        <AddTodo />
      </RecoilRoot>
    );
    const target = screen.getByRole('button');
    fireEvent.click(target);
    const inputElement = screen.getByPlaceholderText(/할 일을 입력해 주세요./);
    fireEvent.change(inputElement, {
      target: {
        value: '리액트 공부하기',
      },
    });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
  });
});
