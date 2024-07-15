export function useCurrencyFormat() {
  const currencyFormat = (value) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const currencyFormatWithoutSymbol = (value) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return {
    currencyFormat,
    currencyFormatWithoutSymbol,
  };
}
