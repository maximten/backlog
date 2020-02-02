import { useDispatch } from 'react-redux';
import { ActionType } from 'src/store/lists/types';

export const useSetItem = () => {
  const dispatch = useDispatch();
  return (data: string) => dispatch({
    type: ActionType.SET_ITEM,
    payload: { data },
  });
};
