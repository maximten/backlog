import 'src/styles';
import React, { FC, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'src/store';
import { List } from 'src/components/list';
import { KeyHandler } from 'src/components/key-handler';
import { Shortcuts } from 'src/components/shortcuts';
import { Container } from 'src/components/container';
import styled from 'styled-components';

const store = createStore();

const AppBlock = styled.div`
  opacity: ${(props) => (props.isMounted ? '1' : '0')};
`;

export const App: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Provider store={store}>
      <AppBlock className="app" isMounted={isMounted}>
        <Container>
          <h1>Backlog</h1>
          <Shortcuts />
          <List />
          <KeyHandler />
        </Container>
      </AppBlock>
    </Provider>
  );
};
