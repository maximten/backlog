import { createSelector } from 'reselect';
import { State } from 'src/store/types';

export const focusedListKeySelector = (state: State) => state.lists.focusedList;
export const listsMapSelector = (state: State) => state.lists.listsMap;
export const focusedListSelector = createSelector(focusedListKeySelector,
  listsMapSelector,
  (key, map) => map[key]);

export const focusedItemKeySelector = createSelector(focusedListSelector,
  (list) => list.focusedItem);
