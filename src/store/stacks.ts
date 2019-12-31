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

const parseState = (data) => {
  const {
    stacks = DEFAULT_STACKS,
    key = DEFAULT_STACK_KEY,
    order = DEFAULT_STACKS_ORDER,
  } = data;
  return {
    stacks, key, order,
  };
};

export const fetchState = () => async (dispatch) => {
  const data = await fetch('api/stacks').then((res) => res.json());
  const { stacks, key, order } = parseState(data);
  dispatch(setStacks(stacks));
  dispatch(setKey(key));
  dispatch(setOrder(order));
  dispatch(setFocus(true));
};

export const postState = () => async (dispatch, getState) => {
  const {
    stacks: {
      stacks,
      key,
      order,
    },
  } = getState();
  await fetch('api/stacks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      stacks,
      key,
      order,
    }),
  });
};

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
