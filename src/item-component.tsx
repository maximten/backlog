import React, { FC, useCallback, useState, useEffect, useRef } from 'react';
import { StackItem, useStacks } from 'src/use-stacks';
import styled from 'styled-components';

type Props = {
  data: StackItem;
  index: number;
  stackKey: string;
  focusedStack: string;
  focusedItem: number | null;
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ItemComponent: FC<Props> = ({
  data,
  index,
  stackKey: ownStackKey,
  focusedStack,
  focusedItem,
}) => {
  const { content } = data;
  const textareaRef = useRef(null);
  const [currentContent, setCurrentContent] = useState(content);

  const {
    modifyStackItem,
    setFocus,
  } = useStacks();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    modifyStackItem(index, {
      ...data,
      content: e.target.value,
    });
  }, [currentContent, modifyStackItem]);

  const handleContentChange = useCallback((e) => {
    e.preventDefault();
    setCurrentContent(e.target.value);
    handleSubmit(e);
  }, [currentContent, modifyStackItem]);

  const handleFocus = useCallback((e) => {
    e.preventDefault();
    setFocus(ownStackKey, index);
  }, [index]);

  useEffect(() => {
    if (
      ownStackKey === focusedStack
      && index === focusedItem
    ) {
      textareaRef.current.focus();
    }
  }, [index, ownStackKey, focusedStack, focusedItem]);

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={currentContent}
        onChange={handleContentChange}
        onFocus={handleFocus}
      />
    </Form>
  );
};
