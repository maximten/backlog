import React, { FC } from 'react';
import { Stack } from 'src/use-stacks';
import { ItemComponent } from 'src/item-component';

type Props = {
  stack: Stack;
  stackKey: string;
  focusedStack: string;
  focusedItem: number | null;
}

export const StackComponent: FC<Props> = ({
  stack,
  stackKey,
  focusedStack,
  focusedItem,
}) => (
  <>
    {
      stack.map((item, key) => (
        <ItemComponent
          // TODO: add better key
          key={item.content}
          data={item}
          index={key}
          stackKey={stackKey}
          focusedStack={focusedStack}
          focusedItem={focusedItem}
        />
      ))
    }
  </>
);
