import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStacks,
  postState,
  setFocusedItem,
  setFocusedStack,
  setStackIndex,
  setLastKey,
  setOrder,
  setStackIndexes,
  setStackNames } from 'src/store/stacks';
import { useThrottledDispatch } from 'src/use-throttled-dispatch';

export type StackItem = {
  id?: number;
  content: string;
}

export type Stack = StackItem[]

export type Stacks = Record<string, Stack>

export const createEmptyItem = () => ({
  title: '',
  content: '',
});

export const useStacks = () => {
  const {
    stacks,
    order,
    stack,
    focusedStack,
    focusedItem,
    stacksIndexes,
    stacksNames,
    lastKey,
  } = useSelector((state) => state.stacks);
  const dispatch = useDispatch();

  const throttledPostState = useThrottledDispatch(postState, 500);

  const getStack = useCallback(() => [...stacks[focusedStack]], [focusedStack, stacks]);
  const getNewStackIndex = useCallback(() => stacksIndexes[focusedStack] + 1, [focusedStack, stacksIndexes]);

  const setStack = useCallback((stack: Stack) => {
    const newStacks = { ...stacks };
    newStacks[focusedStack] = stack;
    dispatch(setStacks(newStacks));
    throttledPostState();
  }, [dispatch, focusedStack, stacks, throttledPostState]);

  const pushStackItem = (item: StackItem) => {
    const newStack = getStack();
    const newStackIndex = getNewStackIndex();
    newStack.push({
      ...item,
      id: newStackIndex,
    });
    setStack(newStack);
    dispatch(setFocusedItem(newStack.length - 1));
    dispatch(setStackIndex({
      key: focusedStack, index: newStackIndex,
    }));
  };

  const modifyStackItem = useCallback((index: number, item: StackItem) => {
    const newStack = getStack();
    newStack[index] = item;
    setStack(newStack);
  }, [getStack, setStack]);

  const removeStackItem = (index: number) => {
    const newStack = getStack();
    newStack.splice(index);
    setStack(newStack);
    const focusedItem = newStack.length > 0 ? newStack.length - 1 : null;
    dispatch(setFocusedItem(focusedItem));
  };

  const popStackItem = () => {
    const stack = getStack();
    removeStackItem(stack.length - 1);
  };

  const swapStackItems = (indexA: number, indexB: number) => {
    const newStack = getStack();
    const itemA = { ...stack[indexA] };
    const itemB = { ...stack[indexB] };
    newStack[indexA] = itemB;
    newStack[indexB] = itemA;
    setStack(newStack);
  };

  const swapStackItemsUp = () => {
    const focusedStackInst = { ...stacks[focusedStack] };
    if (focusedItem === null || !focusedStackInst || focusedItem < 1) {
      return;
    }
    swapStackItems(focusedItem, focusedItem - 1);
  };

  const setFocus = useCallback((stack, item) => {
    dispatch(setFocusedStack(stack));
    dispatch(setFocusedItem(item));
    throttledPostState();
  }, [dispatch, throttledPostState]);

  const addStack = useCallback(() => {
    const newKey = focusedStack + 1;
    const newIndex = 0;
    const newStacks = {
      ...stacks,
      [newKey]: [{
        id: newIndex,
        ...createEmptyItem(),
      }],
    };
    const newOrder = [...order, newKey];
    const newStacksIndexes = {
      ...stacksIndexes, [newKey]: newIndex,
    };
    dispatch(setStacks(newStacks));
    dispatch(setLastKey(newKey));
    dispatch(setOrder(newOrder));
    dispatch(setFocusedStack(newKey));
    dispatch(setFocusedItem(newIndex));
    dispatch(setStackIndexes(newStacksIndexes));
  }, [dispatch, focusedStack, order, stacks, stacksIndexes]);

  const focusToLeftStack = useCallback(() => {
    const newKey = focusedStack === 0 ? lastKey : focusedStack - 1;
    dispatch(setFocusedStack(newKey));
  }, [dispatch, focusedStack, lastKey]);

  const focusToRightStack = useCallback(() => {
    const newKey = focusedStack === lastKey ? 0 : focusedStack + 1;
    dispatch(setFocusedStack(newKey));
  }, [dispatch, focusedStack, lastKey]);

  const setStackName = useCallback((name) => {
    const newStacksNames = { ...stacksNames };
    newStacksNames[focusedStack] = name;
    dispatch(setStackNames(newStacksNames));
    throttledPostState();
  }, [dispatch, focusedStack, stacksNames, throttledPostState]);

  return {
    pushStackItem,
    modifyStackItem,
    removeStackItem,
    popStackItem,
    swapStackItemsUp,
    stacks,
    stack,
    stacksNames,
    stacksOrder: order,
    focusedStack,
    focusedItem,
    setFocus,
    addStack,
    focusToLeftStack,
    focusToRightStack,
    setStackName,
  };
};
