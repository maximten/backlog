import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStacks, postState, setFocusedItem, setFocusedStack,
} from 'src/store/stacks';
import { useThrottledDispatch } from 'src/use-throttled-dispatch';

export type StackItem = {
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
  } = useSelector((state) => {
    const {
      stacks, key, order, shouldFocus, focusedStack, focusedItem,
    } = state.stacks;
    return {
      stacks,
      key,
      order,
      shouldFocus,
      stack: stacks[key],
      focusedStack,
      focusedItem,
    };
  });
  const dispatch = useDispatch();

  const throttledPostState = useThrottledDispatch(postState, 500);

  const getStack = useCallback(() => [...stacks[key]], [stack]);

  const setStack = useCallback((stack: Stack) => {
    const newStacks = { ...stacks };
    newStacks[key] = stack;
    dispatch(setStacks(newStacks));
    throttledPostState();
  }, [stacks]);

  const pushStackItem = (item: StackItem) => {
    const newStack = getStack();
    newStack.push(item);
    setStack(newStack);
    dispatch(setFocusedItem(newStack.length - 1));
  };

  const modifyStackItem = useCallback((index: number, item: StackItem) => {
    const newStack = getStack();
    newStack[index] = item;
    setStack(newStack);
  }, [getStack, stacks]);

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
  }, [stacks]);

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
