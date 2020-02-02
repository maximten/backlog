import { useDispatch } from 'react-redux';
import { ActionType } from 'src/store/lists/types';
import { createList } from 'src/store/lists/parsers';

export const useAddList = () => {
  const dispatch = useDispatch();
  return () => dispatch({
    type: ActionType.ADD_LIST,
    payload: createList(),
  });
};
