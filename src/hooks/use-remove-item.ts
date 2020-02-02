import { useDispatch } from 'react-redux';
import { ActionType } from 'src/store/lists/types';

export const useRemoveItem = () => {
  const dispatch = useDispatch();
  return () => dispatch({ type: ActionType.REMOVE_ITEM });
};
