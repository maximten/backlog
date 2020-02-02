import { Action, ListsState, List, ActionType } from 'src/store/lists/types';
import { parseState, generateItemKey, generateListKey } from 'src/store/lists/parsers';
import { focusedListKeySelector, focusedListSelector } from 'src/store/lists/selectors';
import { modulo } from 'src/utils/modulo';

const updateFocusedList = (state: ListsState,
  modifier: (state: ListsState, list: List) => Partial<List>): ListsState => {
  // TODO: refactoring
  const listKey = focusedListKeySelector({ lists: state });
  const list = focusedListSelector({ lists: state });
  return {
    ...state,
    listsMap: {
      ...state.listsMap,
      [listKey]: {
        ...list,
        ...modifier(state, list),
      },
    },
  };
};

export const lists = (state: ListsState, action: Action): ListsState => {
  switch (action.type) {
    case (ActionType.SET_ITEM): {
      return updateFocusedList(state, (state, list) => ({
        items: {
          ...list.items,
          [list.focusedItem]: action.payload,
        },
      }));
    }
    case (ActionType.ADD_ITEM): {
      const itemKey = generateItemKey();
      return updateFocusedList(state, (state, list) => ({
        items: {
          ...list.items,
          [itemKey]: action.payload,
        },
        focusedItem: itemKey,
        itemsOrder: [...list.itemsOrder, itemKey],
      }));
    }
    case (ActionType.SET_FOCUSED_ITEM_KEY): {
      return updateFocusedList(state, () => ({ focusedItem: action.payload }));
    }
    case (ActionType.REMOVE_ITEM): {
      return updateFocusedList(state, (state, list) => {
        const {
          focusedItem, itemsOrder,
        } = list;
        if (itemsOrder.length === 1) {
          return;
        }
        const nextFocusedItem = itemsOrder[itemsOrder.indexOf(focusedItem) - 1];
        const items = { ...list.items };
        delete items[focusedItem];
        return {
          items,
          focusedItem: nextFocusedItem,
          itemsOrder: itemsOrder.filter((key) => key !== focusedItem),
        };
      });
    }
    case (ActionType.SWAP_ITEMS_UP): {
      return updateFocusedList(state, (state, list) => {
        const {
          focusedItem, itemsOrder,
        } = list;
        const itemIndex = itemsOrder.indexOf(focusedItem);
        const upperItemIndex = itemIndex - 1;
        if (upperItemIndex < 0) {
          return;
        }
        const upperItemKey = itemsOrder[upperItemIndex];
        const newItemsOrder = [...itemsOrder];
        newItemsOrder[itemIndex] = upperItemKey;
        newItemsOrder[upperItemIndex] = focusedItem;
        return { itemsOrder: newItemsOrder };
      });
    }
    case (ActionType.SWAP_ITEMS_DOWN): {
      return updateFocusedList(state, (state, list) => {
        const {
          focusedItem, itemsOrder,
        } = list;
        const itemIndex = itemsOrder.indexOf(focusedItem);
        const bottomItemIndex = itemIndex + 1;
        if (bottomItemIndex >= itemsOrder.length) {
          return;
        }
        const bottomItemKey = itemsOrder[bottomItemIndex];
        const newItemsOrder = [...itemsOrder];
        newItemsOrder[itemIndex] = bottomItemKey;
        newItemsOrder[bottomItemIndex] = focusedItem;
        return { itemsOrder: newItemsOrder };
      });
    }
    case (ActionType.SET_LIST_NAME): {
      return updateFocusedList(state, () => ({ name: action.payload }));
    }
    case (ActionType.ADD_LIST): {
      const listKey = generateListKey();
      return {
        ...state,
        listsMap: {
          ...state.listsMap, [listKey]: action.payload,
        },
        listsOrder: [...state.listsOrder, listKey],
        focusedList: listKey,
      };
    }
    case (ActionType.FOCUS_TO_LEFT_LIST): {
      const { listsOrder } = state;
      if (listsOrder.length === 1) {
        return;
      }
      const listKey = focusedListKeySelector({ lists: state });
      const listIndex = listsOrder.indexOf(listKey);
      const nextIndex = modulo(listIndex - 1, listsOrder.length);
      const nextKey = listsOrder[nextIndex];
      return {
        ...state,
        focusedList: nextKey,
      };
    }
    case (ActionType.FOCUS_TO_RIGHT_LIST): {
      const { listsOrder } = state;
      if (listsOrder.length === 1) {
        return;
      }
      const listKey = focusedListKeySelector({ lists: state });
      const listIndex = listsOrder.indexOf(listKey);
      const nextIndex = modulo(listIndex + 1, listsOrder.length);
      const nextKey = listsOrder[nextIndex];
      return {
        ...state,
        focusedList: nextKey,
      };
    }
    default:
      return parseState(null);
  }
};
