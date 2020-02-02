import 'src/styles';

import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'src/store';
import { StackArrayComponent } from 'src/stack-array-component';
import { ShortcutsComponent } from 'src/shortcuts-component';
import { ContainerComponent } from './container-component';

const store = createStore();

export const AppComponent: FC = () => (
  <Provider store={store}>
    <ContainerComponent>
      <h1>Backlog</h1>
      <ShortcutsComponent />
      <StackArrayComponent />
    </ContainerComponent>
  </Provider>
);
