import { useDispatch } from 'react-redux';
import { ActionType } from 'src/store/lists/types';

export const useSwapItemsDown = () => {
  const dispatch = useDispatch();
  return () => dispatch({ type: ActionType.SWAP_ITEMS_DOWN });
};
