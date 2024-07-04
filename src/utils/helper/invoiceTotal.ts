import { CurrencyRates, HeaderColumn } from "../types";

export function calculateInvoiceTotal(
  item: { [key: string]: any },
  currencyRates: CurrencyRates
): number | null {
  const totalPrice = item[HeaderColumn.TotalPrice];
  const invoiceCurrency = item[HeaderColumn.InvoiceCurrency];
  const itemPriceCurrency = item[HeaderColumn.ItemPriceCurrency];

  if (
    invoiceCurrency &&
    itemPriceCurrency &&
    currencyRates[invoiceCurrency] &&
    currencyRates[itemPriceCurrency]
  ) {
    const conversionRate =
      currencyRates[invoiceCurrency] / currencyRates[itemPriceCurrency];
    return totalPrice * conversionRate;
  }

  return null;
}
