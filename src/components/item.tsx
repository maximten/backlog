import React, { FC, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSetItem } from 'src/hooks/use-set-item';
import { useSetFocusedItemKey } from 'src/hooks/use-set-focused-item-key';

type Props = {
  itemKey: string;
  data: string;
  isFocused: boolean;
}

const Form = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const Textarea = styled.textarea`
  min-height: 1.5rem;
  min-width: 100%;
  border: 1px solid #fff;
  margin: 0;
  padding: 0;
  background-color: #1F1626;
  color: #FFFFFF;
  &::selection {
    background-color: #D63E82;
    color: #FCFFFE;
  }
`;

export const Item: FC<Props> = ({
  data, isFocused, itemKey,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const setItem = useSetItem();
  const setFocusedItemKey = useSetFocusedItemKey();

  useEffect(() => {
    if (isFocused) {
      ref.current.focus();
    }
  }, [isFocused]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    handleSubmit(e);
    setItem(e.target.value);
  }, [handleSubmit, setItem]);

  const handleFocus = useCallback((e) => {
    e.preventDefault();
    setFocusedItemKey(itemKey);
  }, [itemKey, setFocusedItemKey]);

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        value={data}
        ref={ref}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </Form>
  );
};
