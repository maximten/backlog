import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { StackArrayComponent } from 'src/stack-array-component';

export const AppComponent: FC = () => (
  <Provider store={store}>
    <h1>Backlog</h1>
    <StackArrayComponent />
  </Provider>
);
