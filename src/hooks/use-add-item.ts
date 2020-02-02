import { useDispatch } from 'react-redux';
import { ActionType } from 'src/store/lists/types';
import { createItem } from 'src/store/lists/parsers';

export const useAddItem = () => {
  const dispatch = useDispatch();
  return () => dispatch({
    type: ActionType.ADD_ITEM,
    payload: createItem(),
  });
};
