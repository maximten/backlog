import React, { FC, useCallback, useEffect } from 'react';
import { useStacks, createEmptyItem } from 'src/use-stacks';
import { useKeyboard, KeyCodes } from 'src/use-keyboard';
import { StackComponent } from 'src/stack-component';
import { useDispatch } from 'react-redux';
import { fetchState } from 'src/store/stacks';

type Props = {};

export const StackArrayComponent: FC<Props> = () => {
  const {
    stacksOrder,
    stacks,
    pushStackItem,
    popStackItem,
    focusedStack,
    focusedItem,
    swapStackItemsUp,
  } = useStacks();
  useKeyboard({
    [KeyCodes.SPACE]: {
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        pushStackItem(createEmptyItem());
      },
      [pushStackItem]),
    },
    [KeyCodes.BACKSPACE]: {
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        popStackItem();
      },
      [popStackItem]),
    },
    [KeyCodes.UP]: {
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        swapStackItemsUp();
      },
      [popStackItem]),
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchState());
  }, []);
  return (
    <div>
      {stacksOrder.map((item) => (
        <StackComponent
          key={item}
          stack={stacks[item]}
          stackKey={item}
          focusedStack={focusedStack}
          focusedItem={focusedItem}
        />
      ))}
    </div>
  );
};
