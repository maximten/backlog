import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useThrottledDispatch = (actionCreator, ms) => {
  const dispatch = useDispatch();
  let timeout = null;
  return useCallback(() => {
    if (!timeout) {
      timeout = window.setTimeout(() => {
        window.clearTimeout(timeout);
        timeout = null;
        dispatch(actionCreator());
      }, ms);
    }
  }, [actionCreator]);
};
