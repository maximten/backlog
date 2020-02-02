export enum ActionType {
  ADD_ITEM = 'ADD_ITEM',
  ADD_LIST = 'ADD_LIST',
  SET_ITEM = 'SET_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SET_FOCUSED_ITEM_KEY = 'SET_FOCUSED_ITEM_KEY',
  SWAP_ITEMS_UP = 'SWAP_ITEMS_UP',
  SWAP_ITEMS_DOWN = 'SWAP_ITEMS_DOWN',
  SET_LIST = 'SET_LIST',
  SET_LIST_NAME = 'SET_LIST_NAME',
  SET_STATE = 'SET_STATE',
  FOCUS_TO_LEFT_LIST = 'FOCUS_TO_LEFT_LIST',
  FOCUS_TO_RIGHT_LIST = 'FOCUS_TO_RIGHT_LIST',
}

export type Action = {
  type: ActionType.SET_STATE;
  payload: ListsState;
} | {
  type: ActionType.SET_ITEM;
  payload: Item;
} | {
  type: ActionType.ADD_ITEM;
  payload: Item;
} | {
  type: ActionType.REMOVE_ITEM;
} | {
  type: ActionType.SET_FOCUSED_ITEM_KEY;
  payload: ItemKey;
} | {
  type: ActionType.SWAP_ITEMS_UP;
} | {
  type: ActionType.SWAP_ITEMS_DOWN;
} | {
  type: ActionType.SET_LIST_NAME;
  payload: string;
} | {
  type: ActionType.ADD_LIST;
  payload: List;
} | {
  type: ActionType.FOCUS_TO_LEFT_LIST;
} | {
  type: ActionType.FOCUS_TO_RIGHT_LIST;
}

export type Item = {
  data: string;
}
export type ItemKey = string;

export type ItemsMap = Record<ItemKey, Item>


export type List = {
  name: string;
  items: Record<ItemKey, Item>;
  focusedItem: ItemKey;
  itemSelection: number;
  itemsOrder: ItemKey[];
}

export type ListsKey = string

export type ListsMap = Record<ListsKey, List>

export type ListsState = {
  listsMap: ListsMap;
  focusedList: ListsKey;
  listsOrder: ListsKey[];
}
