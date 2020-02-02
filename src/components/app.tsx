import 'src/styles';

import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'src/store';
import { List } from 'src/components/list';
import { KeyHandler } from 'src/components/key-handler';
import { Shortcuts } from 'src/components/shortcuts';
import { Container } from 'src/components/container';

const store = createStore();

export const App: FC = () => (
  <Provider store={store}>
    <Container>
      <h1>Backlog</h1>
      <Shortcuts />
      <List />
      <KeyHandler />
    </Container>
  </Provider>
);
