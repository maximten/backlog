import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useStacks, createEmptyItem } from 'src/use-stacks';
import { useKeyboard, KeyCodes } from 'src/use-keyboard';
import { StackComponent } from 'src/stack-component';
import { useDispatch } from 'react-redux';
import { fetchState } from 'src/store/stacks';

type Props = {};

export const StackArrayComponent: FC<Props> = () => {
  const {
    stacks,
    pushStackItem,
    popStackItem,
    focusedStack,
    focusedItem,
    swapStackItemsUp,
    addStack,
    focusToLeftStack,
    focusToRightStack,
  } = useStacks();
  useKeyboard({
    [KeyCodes.SPACE]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        pushStackItem(createEmptyItem());
      },
      [pushStackItem]),
    }, {
      isCtrlPresed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        addStack();
      },
      [addStack]),
    }],
    [KeyCodes.BACKSPACE]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        popStackItem();
      },
      [popStackItem]),
    }],
    [KeyCodes.UP]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        swapStackItemsUp();
      },
      [swapStackItemsUp]),
    }],
    [KeyCodes.LEFT]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        focusToLeftStack();
      },
      [focusToLeftStack]),
    }],
    [KeyCodes.RIGHT]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        focusToRightStack();
      },
      [focusToRightStack]),
    }],
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchState());
  }, [dispatch]);
  const stack = useMemo(() => stacks[focusedStack], [focusedStack, stacks]);
  return (
    <StackComponent
      stack={stack}
      stackKey={focusedStack}
      focusedStack={focusedStack}
      focusedItem={focusedItem}
    />
  );
};
