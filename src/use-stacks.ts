import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStacks, setFocus } from 'src/store/stacks';

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
  } = useSelector((state) => {
    const {
      stacks, key, order, shouldFocus,
    } = state.stacks;
    return {
      stacks,
      key,
      order,
      shouldFocus,
      stack: stacks[key],
    };
  });
  const dispatch = useDispatch();

  const getStack = useCallback(() => [...stacks[key]], [stack]);

  const setStack = useCallback((stack: Stack) => {
    const newStacks = { ...stacks };
    newStacks[key] = stack;
    dispatch(setStacks(newStacks));
  }, [stacks]);

  const pushStackItem = (item: StackItem) => {
    const newStack = getStack();
    newStack.push(item);
    setStack(newStack);
    dispatch(setFocus(true));
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
    dispatch(setFocus(true));
  };

  const popStackItem = () => {
    const stack = getStack();
    removeStackItem(stack.length - 1);
  };

  const swapStackItems = (indexA: number, indexB: number) => {
    const newStack = getStack();
    const itemA = { ...newStack[indexA] };
    const itemB = { ...newStack[indexB] };
    newStack[indexA] = itemB;
    newStack[indexB] = itemA;
    setStack(newStack);
  };

  return {
    pushStackItem,
    modifyStackItem,
    removeStackItem,
    popStackItem,
    swapStackItems,
    stacks,
    stack,
    stackKey: key,
    stacksOrder: order,
    shouldFocus,
  };
};
