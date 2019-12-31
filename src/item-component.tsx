import React, {
  FC, useCallback, useState, useEffect, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { StackItem, useStacks } from 'src/use-stacks';
import { setFocus } from 'src/store/stacks';
import styled from 'styled-components';

type Props = {
  data: StackItem;
  index: number;
  stackKey: string;
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ItemComponent: FC<Props> = ({ data: { content }, index, stackKey: ownStackKey }) => {
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const [currentContent, setCurrentContent] = useState(content);

  const {
    modifyStackItem, stack, stackKey, shouldFocus,
  } = useStacks();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    modifyStackItem(index, { content: e.target.value });
  }, [currentContent, modifyStackItem]);

  const handleContentChange = useCallback((e) => {
    e.preventDefault();
    setCurrentContent(e.target.value);
    handleSubmit(e);
  }, [currentContent, modifyStackItem]);

  useEffect(() => {
    if (
      ownStackKey === stackKey
      && index === stack.length - 1
      && shouldFocus
    ) {
      textareaRef.current.focus();
      dispatch(setFocus(false));
    }
  }, [stack, index, ownStackKey, stackKey, shouldFocus]);

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={currentContent}
        onChange={handleContentChange}
      />
    </Form>
  );
};
