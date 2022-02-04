export const formatDateTime = (value?: Date) => {
  if (!value) {
    return;
  }
  const date = value.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const time = value.toLocaleTimeString('de-DE', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return `${date} - ${time}`
};
