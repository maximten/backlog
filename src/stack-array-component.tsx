import React, { FC, useCallback } from 'react';
import { useStacks, createEmptyItem } from 'src/use-stacks';
import { useKeyboard, KeyCodes } from 'src/use-keyboard';
import { StackComponent } from 'src/stack-component';

type Props = {}

export const StackArrayComponent: FC<Props> = () => {
  const {
    stacksOrder, stacks, pushStackItem, popStackItem,
  } = useStacks();
  useKeyboard({
    [KeyCodes.SPACE]: {
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        pushStackItem(createEmptyItem());
      }, [pushStackItem]),
    },
    [KeyCodes.BACKSPACE]: {
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        popStackItem();
      }, [popStackItem]),
    },
  });
  return (
    <div>
      {
        stacksOrder.map((item) => (
          <StackComponent key={item} stack={stacks[item]} stackKey={item} />
        ))
      }
    </div>
  );
};
