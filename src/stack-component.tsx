import React, { FC, useCallback } from 'react';
import { ItemComponent } from 'src/item-component';
import { Stack, useStacks } from 'src/use-stacks';

type Props = {
  stack: Stack;
  stackKey: string;
  focusedStack: string;
  focusedItem: number | null;
  name: string;
};

export const StackComponent: FC<Props> = ({
  stack,
  stackKey,
  focusedStack,
  focusedItem,
  name,
}) => {
  const { setStackName } = useStacks();
  const handleInput = useCallback((e) => {
    e.preventDefault();
    setStackName(e.target.value);
  },
  [setStackName]);
  return (
    <>
      <input type="text" value={name} onChange={handleInput} />
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
};
