import { useDispatch } from 'react-redux';
import { ActionType } from 'src/store/lists/types';

export const useSetFocusedItemKey = () => {
  const dispatch = useDispatch();
  return (payload: string) => dispatch({
    type: ActionType.SET_FOCUSED_ITEM_KEY,
    payload,
  });
};
