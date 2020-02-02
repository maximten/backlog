import { createStore } from 'src/store';

beforeAll(() => {
  const date = new Date(2020, 1, 1);
  let counter = 1;
  // eslint-disable-next-line no-extend-native
  Date.prototype.getTime = () => date.valueOf() + counter++;
});

describe('lists', () => {
  test('should be in store', () => {
    const store = createStore();
    const { lists } = store.getState();
    expect(lists).toMatchSnapshot();
  });
});
