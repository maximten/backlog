import { FC, useCallback } from 'react';
import { useKeyboard, KeyCodes } from 'src/hooks/use-keyboard';
import { useAddItem } from 'src/hooks/use-add-item';
import { useRemoveItem } from 'src/hooks/use-remove-item';
import { useSwapItemsUp } from 'src/hooks/use-swap-item-up';
import { useSwapItemsDown } from 'src/hooks/use-swap-item-down';
import { useAddList } from 'src/hooks/use-add-list';
import { useFocusLeft } from 'src/hooks/use-focus-left';
import { useFocusRight } from 'src/hooks/use-focus-right';

export const KeyHandler: FC = () => {
  const addItem = useAddItem();
  const removeItem = useRemoveItem();
  const swapItemsUp = useSwapItemsUp();
  const swapItemsDown = useSwapItemsDown();
  const addList = useAddList();
  const focusLeft = useFocusLeft();
  const focusRight = useFocusRight();

  useKeyboard({
    [KeyCodes.SPACE]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        addItem();
      },
      [addItem]),
    }, {
      isCtrlPresed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        addList();
      },
      [addList]),
    }],
    [KeyCodes.BACKSPACE]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        removeItem();
      },
      [removeItem]),
    }],
    [KeyCodes.UP]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        swapItemsUp();
      },
      [swapItemsUp]),
    }],
    [KeyCodes.DOWN]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        swapItemsDown();
      },
      [swapItemsDown]),
    }],
    [KeyCodes.LEFT]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        focusLeft();
      },
      [focusLeft]),
    }],
    [KeyCodes.RIGHT]: [{
      isShiftPressed: true,
      callback: useCallback((e) => {
        e.preventDefault();
        focusRight();
      },
      [focusRight]),
    }],

  });
  return null;
};
