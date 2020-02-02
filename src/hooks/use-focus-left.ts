import { useDispatch } from 'react-redux';
import { ActionType } from 'src/store/lists/types';

export const useFocusLeft = () => {
  const dispatch = useDispatch();
  return () => dispatch({ type: ActionType.FOCUS_TO_LEFT_LIST });
};
