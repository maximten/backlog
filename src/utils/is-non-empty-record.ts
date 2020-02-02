export const isNonEmptyRecord = (data: any) => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  if (Object.keys(data).length < 1) {
    return false;
  }
  return true;
};
