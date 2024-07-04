import * as XLSX from 'xlsx';
import { ParsedData, Invoice, HeaderColumn } from './types';
import { validateFields } from './helper/rowValidation';
import { calculateInvoiceTotal } from './helper/invoiceTotal';
import { extractCurrencyRates, getIndex, getColumnPositions } from './helper/rowTrasform';

export function rowToObject(row: any[], columnPositions: { [key in HeaderColumn]?: number }): { [key: string]: any } {
    const obj: { [key: string]: any } = {};

    Object.keys(columnPositions).forEach(key => {
        const columnIndex = columnPositions[key as HeaderColumn];
        if (columnIndex !== undefined) {
            obj[key] = row[columnIndex];
        }
    });

    return obj;
}

export function parseExcel(filePath: string): ParsedData {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any;

    let invoicingMonth = '';
    if (data[0] && typeof data[0][0] === 'string') {
        invoicingMonth = data[0][0];
    } else {
        throw new Error('Invalid file structure: Missing InvoicingMonth');
    }

    const currencyRates = extractCurrencyRates(data);
    const [dataStartIndex, dataEndIndex] = getIndex(data);
    const headerRow = data[dataStartIndex - 1];
    const columnPositions = getColumnPositions(headerRow);

    if (dataStartIndex === -1 || dataEndIndex === -1) {
        throw new Error('Invalid file structure: Missing data start or end indices');
    }

    const invoicesData: Invoice[] = [];

    for (let i = dataStartIndex; i < dataEndIndex; i++) {
        const row = data[i];

        if (row[columnPositions[HeaderColumn.Status]!] === 'Ready' || row[columnPositions[HeaderColumn.InvoiceNo]!]) {
            const rowData = rowToObject(row, columnPositions);
            const invoice: Invoice = {
                customer: rowData[HeaderColumn.Customer] as string,
                customerNumber: rowData[HeaderColumn.CustNo] as string,
                projectType: rowData[HeaderColumn.ProjectType] as string,
                quantity: Number(rowData[HeaderColumn.Quantity]),
                pricePerItem: Number(rowData[HeaderColumn.PricePerItem]),
                itemPriceCurrency: rowData[HeaderColumn.ItemPriceCurrency] as string,
                totalPrice: Number(rowData[HeaderColumn.TotalPrice]),
                invoiceCurrency: rowData[HeaderColumn.InvoiceCurrency] as string,
                status: rowData[HeaderColumn.Status] as string,
                invoiceNumber: rowData[HeaderColumn.InvoiceNo] !== undefined ? String(rowData[HeaderColumn.InvoiceNo]) : undefined,
                contractComments: rowData[HeaderColumn.ContractComments] !== undefined ? rowData[HeaderColumn.ContractComments] as string : undefined,
                invoiceTotal: calculateInvoiceTotal(rowData, currencyRates),
                validationErrors: validateFields(rowData, currencyRates)
            };
            invoicesData.push(invoice);
        }
    }

    return {
        invoicingMonth,
        currencyRates,
        invoicesData
    };
}