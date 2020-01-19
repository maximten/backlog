const DEFAULT_STACK_KEY = 'default';

const EMPTY_ITEM = {
  id: 0,
  title: '',
  content: '',
};

const DEFAULT_STACKS = { [DEFAULT_STACK_KEY]: [EMPTY_ITEM] };

const DEFAULT_STACKS_INDEXES = { [DEFAULT_STACK_KEY]: 0 };

const DEFAULT_STACKS_ORDER = [
  DEFAULT_STACK_KEY,
];

const INITIAL_STATE = {
  stacks: DEFAULT_STACKS,
  key: DEFAULT_STACK_KEY,
  order: DEFAULT_STACKS_ORDER,
  shouldFocus: true,
  focusedStack: DEFAULT_STACK_KEY,
  focusedItem: null,
  stacksIndexes: DEFAULT_STACKS_INDEXES,
};

const ACTIONS = {
  SET_STACKS: 'SET_STACKS',
  SET_KEY: 'SET_KEY',
  SET_ORDER: 'SET_ORDER',
  SET_FOCUS: 'SET_FOCUS',
  SET_FOCUSED_STACK: 'SET_FOCUSED_STACK',
  SET_FOCUSED_ITEM: 'SET_FOCUSED_ITEM',
  SET_STACK_INDEX: 'SET_STACK_INDEX',
};

export const setStacks = (stacks) => ({
  type: ACTIONS.SET_STACKS,
  payload: stacks,
});

export const setKey = (key) => ({
  type: ACTIONS.SET_KEY,
  payload: key,
});

export const setOrder = (order) => ({
  type: ACTIONS.SET_ORDER,
  payload: order,
});

export const setFocus = (focus) => ({
  type: ACTIONS.SET_FOCUS,
  payload: focus,
});

export const setFocusedStack = (key) => ({
  type: ACTIONS.SET_FOCUSED_STACK,
  payload: key,
});

export const setFocusedItem = (index) => ({
  type: ACTIONS.SET_FOCUSED_ITEM,
  payload: index,
});

export const setStackIndexes = ({
  key, index,
}) => ({
  type: ACTIONS.SET_STACK_INDEX,
  payload: {
    key, index,
  },
});

const parseState = (data) => {
  const {
    stacks = DEFAULT_STACKS,
    key = DEFAULT_STACK_KEY,
    order = DEFAULT_STACKS_ORDER,
    focusedStack = DEFAULT_STACK_KEY,
    focusedItem = null,
    stacksIndexes = DEFAULT_STACKS_INDEXES,
  } = data;
  return {
    stacks, key, order, focusedStack, focusedItem, stacksIndexes,
  };
};

export const fetchState = () => async (dispatch) => {
  const data = await fetch('api/stacks').then((res) => res.json());
  const {
    stacks, key, order, focusedStack, focusedItem, stacksIndexes,
  } = parseState(data);
  dispatch(setStacks(stacks));
  dispatch(setKey(key));
  dispatch(setOrder(order));
  dispatch(setFocus(true));
  dispatch(setFocusedStack(focusedStack));
  dispatch(setFocusedItem(focusedItem));
  dispatch(setStackIndexes(stacksIndexes));
};

export const postState = () => async (dispatch, getState) => {
  const {
    stacks: {
      stacks,
      key,
      order,
      focusedStack,
      focusedItem,
      stacksIndexes,
    },
  } = getState();
  await fetch('api/stacks', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      stacks,
      key,
      order,
      focusedStack,
      focusedItem,
      stacksIndexes,
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
    case ACTIONS.SET_KEY: {
      return {
        ...state,
        key: payload,
      };
    }
    case ACTIONS.SET_ORDER: {
      return {
        ...state,
        order: payload,
      };
    }
    case ACTIONS.SET_FOCUS: {
      return {
        ...state,
        shouldFocus: payload,
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
    default:
      return state;
  }
};
