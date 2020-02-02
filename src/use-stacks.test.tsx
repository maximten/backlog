import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'

import { store } from 'src/store';
import { useStacks } from "src/use-stacks";

const App = ({children}) => (
  <Provider store={store}>
    {children}
  </Provider>
)

test('use stacks', () => {
  let result = null; 
  const StacksComponent = () => {
    result = useStacks();
    return null;
  }
  renderer.create(<App><StacksComponent/></App>);
  expect(result).toBeTruthy();
});
