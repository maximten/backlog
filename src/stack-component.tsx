import React, { FC } from 'react';
import { ItemComponent } from 'src/item-component';
import { Stack } from 'src/use-stacks';

type Props = {
  stack: Stack;
  stackKey: string;
  focusedStack: string;
  focusedItem: number | null;
};

export const StackComponent: FC<Props> = ({
  stack,
  stackKey,
  focusedStack,
  focusedItem,
}) => (
  <>
    {stack.map((item, key) => (
      <ItemComponent
        key={item.id}
        data={item}
        index={key}
        stackKey={stackKey}
        focusedStack={focusedStack}
        focusedItem={focusedItem}
      />
    ))}
  </>
);
