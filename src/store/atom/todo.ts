import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { Todo } from 'types/todoTypes';

const { persistAtom } = recoilPersist();

export const todos = atom<Todo[]>({
  key: 'todo-item',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
