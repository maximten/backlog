import { useDispatch } from 'react-redux';
import { ActionType } from 'src/store/lists/types';

export const useSetListName = () => {
  const dispatch = useDispatch();
  return (payload: string) => dispatch({
    type: ActionType.SET_LIST_NAME,
    payload,
  });
};
