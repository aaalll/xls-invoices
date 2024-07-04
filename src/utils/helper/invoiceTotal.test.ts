// tests/calculateInvoiceTotal.test.ts
import { HeaderColumn, CurrencyRates } from '../types';
import { calculateInvoiceTotal } from './invoiceTotal';

describe('Calculate Invoice Total', () => {
    const item = {
        [HeaderColumn.TotalPrice]: 150,
        [HeaderColumn.InvoiceCurrency]: 'EUR',
        [HeaderColumn.ItemPriceCurrency]: 'USD',
    };

    const currencyRates: CurrencyRates = {
        USD: 1,
        EUR: 0.85,
    };

    it('should calculate invoice total correctly', () => {
        const invoiceTotal = calculateInvoiceTotal(item, currencyRates);
        expect(invoiceTotal).toBeCloseTo(127.5); // 150 * 0.85
    });

    it('should return null if invoice currency is missing', () => {
        const invalidItem = { ...item, [HeaderColumn.InvoiceCurrency]: undefined };
        const invoiceTotal = calculateInvoiceTotal(invalidItem, currencyRates);
        expect(invoiceTotal).toBeNull();
    });

    it('should return null if item price currency is missing', () => {
        const invalidItem = { ...item, [HeaderColumn.ItemPriceCurrency]: undefined };
        const invoiceTotal = calculateInvoiceTotal(invalidItem, currencyRates);
        expect(invoiceTotal).toBeNull();
    });

    it('should return null if currency rates are not provided', () => {
        const invalidCurrencyRates = {};
        const invoiceTotal = calculateInvoiceTotal(item, invalidCurrencyRates);
        expect(invoiceTotal).toBeNull();
    });
});
