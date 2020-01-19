import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStacks, postState, setFocusedItem, setFocusedStack, setStackIndex } from 'src/store/stacks';
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
    key,
    order,
    stack,
    shouldFocus,
    focusedStack,
    focusedItem,
    stacksIndexes,
  } = useSelector((state) => {
    const {
      stacks,
      key,
      order,
      shouldFocus,
      focusedStack,
      focusedItem,
      stacksIndexes,
    } = state.stacks;
    return {
      stacks,
      key,
      order,
      shouldFocus,
      stack: stacks[key],
      focusedStack,
      focusedItem,
      stacksIndexes,
    };
  });
  const dispatch = useDispatch();

  const throttledPostState = useThrottledDispatch(postState, 500);

  const getStack = useCallback(() => [...stacks[key]], [key, stacks]);
  const getNewStackIndex = useCallback(() => stacksIndexes[key] + 1, [key, stacksIndexes]);

  const setStack = useCallback((stack: Stack) => {
    const newStacks = { ...stacks };
    newStacks[key] = stack;
    dispatch(setStacks(newStacks));
    throttledPostState();
  }, [dispatch, key, stacks, throttledPostState]);

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
      key, index: newStackIndex,
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
    // TODO: pass focused stack
    swapStackItems(focusedItem, focusedItem - 1);
  };

  const setFocus = useCallback((stack, item) => {
    dispatch(setFocusedStack(stack));
    dispatch(setFocusedItem(item));
    throttledPostState();
  }, [dispatch, throttledPostState]);

  return {
    pushStackItem,
    modifyStackItem,
    removeStackItem,
    popStackItem,
    swapStackItemsUp,
    stacks,
    stack,
    stackKey: key,
    stacksOrder: order,
    shouldFocus,
    focusedStack,
    focusedItem,
    setFocus,
  };
};
