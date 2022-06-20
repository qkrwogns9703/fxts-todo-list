import styled, { css } from 'styled-components';

type TodoItemProps = {
  done: boolean;
};

export const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

export const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
  margin-right: 5px;
  display: none;
`;

export const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
    ${Edit} {
      display: initial;
    }
  }
  &.over {
    transform: scale(1.01);
    border: 1px dashed #eee;
  }
`;

export const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props: TodoItemProps) =>
    props.done &&
    css`
      border: 1px solid var(--blue);
      color: var(--blue);
    `}
`;

export const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props: TodoItemProps) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

export const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 325px;
  outline: none;
  font-size: 18px;

  margin-right: 10px;
`;
