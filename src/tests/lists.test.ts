import { createStore } from 'src/store';
import { createItem,
  createList,
  createListsMap,
  parseListsMap,
  parseList,
  parseItem } from 'src/store/lists/parsers';

beforeAll(() => {
  const date = new Date(2020, 1, 1);
  let counter = 1;
  // eslint-disable-next-line no-extend-native
  Date.prototype.getTime = () => date.valueOf() + counter++;
});

describe('store', () => {
  test('lists should be in store', () => {
    const store = createStore();
    const { lists } = store.getState();
    expect(lists).toMatchSnapshot();
  });
});

describe('parsets', () => {
  test('parsers should be valid', () => {
    const item = createItem();
    const parsedItem = parseItem(item);
    expect(parsedItem).toEqual(item);
    const list = createList();
    const parsedList = parseList(list);
    expect(parsedList).toEqual(list);
    const listsMap = createListsMap();
    const parsedListsMap = parseListsMap(listsMap);
    expect(parsedListsMap).toEqual(listsMap);
  });
});
