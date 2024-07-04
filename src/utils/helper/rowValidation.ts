import { HeaderColumn, CurrencyRates } from "../types";

export function mandatoryFieldsValidation(item: {
  [key: string]: any;
}): string[] {
  const errors: string[] = [];
  const mandatoryFields = [
    HeaderColumn.Customer,
    HeaderColumn.CustNo,
    HeaderColumn.ProjectType,
    HeaderColumn.Quantity,
    HeaderColumn.PricePerItem,
    HeaderColumn.ItemPriceCurrency,
    HeaderColumn.TotalPrice,
    HeaderColumn.InvoiceCurrency,
    HeaderColumn.Status,
  ];
  mandatoryFields.forEach((field) => {
    if (!item[field]) {
      errors.push(`Field: ${field} is mandatory.`);
    }
  });

  return errors;
}

export function numberFieldValidation(item: { [key: string]: any }): string[] {
  const errors: string[] = [];
  if (isNaN(Number(item[HeaderColumn.PricePerItem]))) {
    errors.push('Field: Price Per Item should be a number.');
  }
  if (isNaN(Number(item[HeaderColumn.Quantity]))) {
    errors.push('Field: Quantity should be a number.');
  }
  if (isNaN(Number(item[HeaderColumn.TotalPrice]))) {
    errors.push('Field: TotalPrice should be a number.');
  }
  return errors;
}

export function totalValidation(item: { [key: string]: any }): string[] {
  const errors: string[] = [];
  if (
    item[HeaderColumn.TotalPrice] !==
    item[HeaderColumn.PricePerItem] * item[HeaderColumn.Quantity]
  ) {
    errors.push("Incorect Total Price.");
  }
  return errors;
}

export function currencyValidation(
  item: { [key: string]: any },
  currencyRates: CurrencyRates
): string[] {
  const errors: string[] = [];
  if (!currencyRates[item[HeaderColumn.InvoiceCurrency]]) {
    errors.push(
      `Missed rate for Invoice Currency: ${item[HeaderColumn.InvoiceCurrency]}.`
    );
  }
  return errors;
}

export function validateFields(
  item: { [key: string]: any },
  currencyRates: CurrencyRates
): string[] {
  const mandatoryErrors = mandatoryFieldsValidation(item);
  const numberFieldErrors = numberFieldValidation(item);
  const totalPriceErrors = totalValidation(item);
  const currencyErrors = currencyValidation(item, currencyRates);

  return [
    ...mandatoryErrors,
    ...numberFieldErrors,
    ...totalPriceErrors,
    ...currencyErrors,
  ];
}
