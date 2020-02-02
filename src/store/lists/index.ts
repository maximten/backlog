import { Action, ListsState } from 'src/store/lists/types';
import { parseState } from 'src/store/lists/parsers';

export const lists = (state, { type }: Action): ListsState => {
  switch (type) {
    default:
      return parseState(null);
  }
};
