import { parseExcel } from './parser';

jest.mock('xlsx', () => {
    const originalModule = jest.requireActual('xlsx');
    return {
        ...originalModule,
        readFile: jest.fn(() => ({
            SheetNames: ['Sheet1'],
            Sheets: {
                Sheet1: {
                    '!ref': 'A1:L10',
                },
            },
        })),
        utils: {
            ...originalModule.utils,
            sheet_to_json: jest.fn(() => [
                ['Sep 2023'],
                ['USD Rate', 1],
                ['EUR Rate', 0.85],
                ['GBP Rate', 0.75],
                ['Customer', 'Cust No', 'Project Type', 'Quantity', 'Price Per Item', 'Item Price Currency', 'Total Price', 'Invoice Currency', 'Status', 'Invoice #', 'Contract Comments'],
                ['Customer1', '12345', 'Project1', 10, 15, 'USD', 150, 'USD', 'ready', 'INV001', ''],
                ['Customer2', '67890', 'Project2', 20, 25, 'USD', 500, 'EUR', 'ready', 'INV002', ''],
                ['Total (No VAT)', '', '', '', '', '', '', '', '', '', ''],
            ]),
        },
    };
});

describe('Parse Excel', () => {
    it('should parse the excel file correctly', () => {
        const filePath = 'test.xlsx';
        const result = parseExcel(filePath);

        expect(result.invoicingMonth).toBe('Sep 2023');
        expect(result.currencyRates).toEqual({
            USD: 1,
            EUR: 0.85,
            GBP: 0.75,
        });
        expect(result.invoicesData).toHaveLength(2);
        expect(result.invoicesData[0].customer).toBe('Customer1');
        expect(result.invoicesData[0].invoiceTotal).toBe(150);
        expect(result.invoicesData[1].invoiceTotal).toBeCloseTo(425);
    });
});
