const DEFAULT_STACK_KEY = 'default';

const EMPTY_ITEM = {
  title: '',
  content: '',
};

const DEFAULT_STACKS = {
  [DEFAULT_STACK_KEY]: [EMPTY_ITEM],
};

const DEFAULT_STACKS_ORDER = [
  DEFAULT_STACK_KEY,
];

const INITIAL_STATE = {
  stacks: DEFAULT_STACKS,
  key: DEFAULT_STACK_KEY,
  order: DEFAULT_STACKS_ORDER,
  shouldFocus: true,
};

const ACTIONS = {
  SET_STACKS: 'SET_STACKS',
  SET_KEY: 'SET_KEY',
  SET_ORDER: 'SET_ORDER',
  SET_FOCUS: 'SET_FOCUS',
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

export const stacks = (state = INITIAL_STATE, { type, payload }) => {
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
    default:
      return state;
  }
};
