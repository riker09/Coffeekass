export const formatCurrency = (value?: number) => {
  if (value === undefined) {
    return;
  }
  return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
};
