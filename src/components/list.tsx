import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { focusedListSelector, focusedItemKeySelector } from 'src/store/lists/selectors';
import { Item } from 'src/components/item';
import styled from 'styled-components';
import { useSetListName } from 'src/hooks/use-set-list-name';

const Input = styled.input`
  height: 3rem;
  font-size: 1rem;
  width: 100%;
  background-color: #1F1626;
  color: #FFFFFF;
  min-height: 2rem;
  min-width: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #FFFFFF;
  &::selection {
    background-color: #D63E82;
    color: #FCFFFE;
  }
`;

export const List: FC = () => {
  const {
    name, itemsOrder, items,
  } = useSelector(focusedListSelector);
  const focusedItemKey = useSelector(focusedItemKeySelector);
  const setListName = useSetListName();
  const handleChange = useCallback((e) => {
    e.preventDefault();
    setListName(e.target.value);
  }, [setListName]);

  return (
    <>
      <Input type="text" value={name} onChange={handleChange} />
      {itemsOrder.map((key) => (
        <Item
          key={key}
          itemKey={key}
          data={items[key].data}
          isFocused={focusedItemKey === key}
        />
      ))}
    </>
  );
};
