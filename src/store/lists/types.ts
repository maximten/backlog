export enum ActionType {
  SET_ITEM = 'SET_ITEM',
  SET_LIST = 'SET_LIST',
  SET_STATE = 'SET_STATE'
}

export type Action = {
  type: ActionType;
}

export type Item = {
  data: string;
}

export type ItemsMap = Record<string, Item>

export type List = {
  name: string;
  items: Record<string, Item>;
  focusedItem: string;
  itemSelection: number;
  itemsOrder: string[];
}

export type ListsMap = Record<string, List>

export type ListsState = {
  listsMap: ListsMap;
  focusedList: number;
  listsOrder: number[];
}
