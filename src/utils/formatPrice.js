export const formatPrice = (value, options = {}) => {
  const {
    currencySymbol = '₹',
    locale = 'en-IN',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    showSymbol = true,
  } = options;

  if (value === null || value === undefined || value === '') {
    return '';
  }

  const num = typeof value === 'number' ? value : Number(String(value).replace(/,/g, ''));

  if (Number.isNaN(num)) {
    return '';
  }

  const formatted = num.toLocaleString(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return showSymbol ? `${currencySymbol}${formatted}` : formatted;
};
