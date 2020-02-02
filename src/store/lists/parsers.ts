import { isNonEmptyRecord } from 'src/utils/is-non-empty-record';
import { Item, ItemsMap, List, ListsMap, ListsState } from 'src/store/lists/types';

// Can't override Date.now() for tests somehow
export const generateItemKey = () => `item_${new Date().getTime()}`;

export const generateListKey = () => `list_${new Date().getTime()}`;

export const createItem = (): Item => ({ data: '' });

export const createList = (): List => {
  const itemKey = generateItemKey();
  return {
    name: '',
    items: { [itemKey]: createItem() },
    focusedItem: itemKey,
    itemSelection: 0,
    itemsOrder: [itemKey],
  };
};

export const createListsMap = (): ListsMap => ({ [generateListKey()]: createList() });

export const parseItem = (rawItem: any) => ({ data: rawItem?.data || '' });

export const parseList = (rawList: any): List => {
  const rawItems = rawList?.items || {};
  let items;
  if (!isNonEmptyRecord(rawItems)) {
    const itemKey = generateItemKey();
    items = { [itemKey]: createItem() };
  } else {
    items = Object.keys(rawItems).reduce((carry, key) => {
      carry[key] = parseItem(rawItems[key]);
      return carry;
    }, {} as ItemsMap);
  }
  const itemsKeys = Object.keys(items);
  return {
    name: rawList?.name || '',
    items,
    focusedItem: rawList?.focusedItem || itemsKeys[itemsKeys.length - 1],
    itemSelection: 0,
    itemsOrder: rawList?.itemsOrder || itemsKeys,
  };
};

export const parseListsMap = (rawListsMap: any): ListsMap => {
  if (!isNonEmptyRecord(rawListsMap)) {
    return createListsMap();
  }
  const listMap = Object.keys(rawListsMap).reduce((carry, key) => {
    carry[key] = parseList(rawListsMap[key]);
    return carry;
  }, {} as ListsMap);
  return listMap;
};

export const parseState = (rawState: any): ListsState => {
  const listsMap = parseListsMap(rawState?.listsMap);
  const listsKeys = Object.keys(listsMap);
  return {
    listsMap,
    focusedList: rawState?.focusedList || listsKeys[listsKeys.length - 1],
    listsOrder: rawState?.listsOrder || listsKeys,
  };
};
