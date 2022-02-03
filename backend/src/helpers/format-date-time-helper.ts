export const formatDateTime = (value?: Date) => {
  if (!value) {
    return;
  }
  return value.toLocaleString();
};
