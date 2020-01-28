const DEFAULT_STACK_KEY = 0;

const EMPTY_ITEM = {
  id: 0,
  title: '',
  content: '',
};

const DEFAULT_STACKS = { [DEFAULT_STACK_KEY]: [EMPTY_ITEM] };

const DEFAULT_STACKS_INDEXES = { [DEFAULT_STACK_KEY]: 0 };

const DEFAULT_STACKS_NAMES = { [DEFAULT_STACK_KEY]: 'default' };

const DEFAULT_STACKS_ORDER = [
  DEFAULT_STACK_KEY,
];

const INITIAL_STATE = {
  stacks: DEFAULT_STACKS,
  lastKey: DEFAULT_STACK_KEY,
  order: DEFAULT_STACKS_ORDER,
  focusedStack: DEFAULT_STACK_KEY,
  focusedItem: null,
  stacksIndexes: DEFAULT_STACKS_INDEXES,
  stacksNames: DEFAULT_STACKS_NAMES,
};

const ACTIONS = {
  SET_STACKS: 'SET_STACKS',
  SET_LAST_KEY: 'SET_LAST_KEY',
  SET_ORDER: 'SET_ORDER',
  SET_FOCUSED_STACK: 'SET_FOCUSED_STACK',
  SET_FOCUSED_ITEM: 'SET_FOCUSED_ITEM',
  SET_STACK_INDEX: 'SET_STACK_INDEX',
  SET_STACK_INDEXES: 'SET_STACK_INDEXES',
  SET_STACKS_NAMES: 'SET_STACK_NAMES',
};

export const setStacks = (stacks) => ({
  type: ACTIONS.SET_STACKS,
  payload: stacks,
});

export const setLastKey = (key) => ({
  type: ACTIONS.SET_LAST_KEY,
  payload: key,
});

export const setOrder = (order) => ({
  type: ACTIONS.SET_ORDER,
  payload: order,
});

export const setFocusedStack = (key) => ({
  type: ACTIONS.SET_FOCUSED_STACK,
  payload: key,
});

export const setFocusedItem = (index) => ({
  type: ACTIONS.SET_FOCUSED_ITEM,
  payload: index,
});

export const setStackIndex = ({
  key, index,
}) => ({
  type: ACTIONS.SET_STACK_INDEX,
  payload: {
    key, index,
  },
});

export const setStackIndexes = (indexes) => ({
  type: ACTIONS.SET_STACK_INDEXES,
  payload: indexes,
});

export const setStackNames = (names) => ({
  type: ACTIONS.SET_STACKS_NAMES,
  payload: names,
});

const parseState = (data) => {
  const {
    stacks = DEFAULT_STACKS,
    lastKey = DEFAULT_STACK_KEY,
    order = DEFAULT_STACKS_ORDER,
    focusedStack = DEFAULT_STACK_KEY,
    focusedItem = null,
    stacksIndexes = DEFAULT_STACKS_INDEXES,
    stacksNames = DEFAULT_STACKS_NAMES,
  } = data;
  return {
    stacks, lastKey, order, focusedStack, focusedItem, stacksIndexes, stacksNames,
  };
};

export const fetchState = () => async (dispatch) => {
  const data = await fetch('api/stacks').then((res) => res.json());
  const {
    stacks, lastKey, order, focusedStack, focusedItem, stacksIndexes, stacksNames,
  } = parseState(data);
  dispatch(setStacks(stacks));
  dispatch(setLastKey(lastKey));
  dispatch(setOrder(order));
  dispatch(setFocusedStack(focusedStack));
  dispatch(setFocusedItem(focusedItem));
  dispatch(setStackIndexes(stacksIndexes));
  dispatch(setStackNames(stacksNames));
};

export const postState = () => async (dispatch, getState) => {
  const {
    stacks: {
      stacks,
      key,
      lastKey,
      order,
      focusedStack,
      focusedItem,
      stacksIndexes,
      stacksNames,
    },
  } = getState();
  await fetch('api/stacks', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      stacks,
      key,
      lastKey,
      order,
      focusedStack,
      focusedItem,
      stacksIndexes,
      stacksNames,
    }),
  });
};

export const stacks = (state = INITIAL_STATE, {
  type, payload,
}) => {
  switch (type) {
    case ACTIONS.SET_STACKS: {
      return {
        ...state,
        stacks: payload,
      };
    }
    case ACTIONS.SET_LAST_KEY: {
      return {
        ...state,
        lastKey: payload,
      };
    }
    case ACTIONS.SET_ORDER: {
      return {
        ...state,
        order: payload,
      };
    }
    case ACTIONS.SET_FOCUSED_STACK: {
      return {
        ...state,
        focusedStack: payload,
      };
    }
    case ACTIONS.SET_FOCUSED_ITEM: {
      return {
        ...state,
        focusedItem: payload,
      };
    }
    case ACTIONS.SET_STACK_INDEX: {
      return {
        ...state,
        stacksIndexes: {
          ...state.stacksIndexes,
          [payload.key]: payload.index,
        },
      };
    }
    case ACTIONS.SET_STACK_INDEXES: {
      return {
        ...state,
        stacksIndexes: payload,
      };
    }
    case ACTIONS.SET_STACKS_NAMES: {
      return {
        ...state,
        stacksNames: payload,
      };
    }
    default:
      return state;
  }
};
