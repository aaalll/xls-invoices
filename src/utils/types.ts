export interface CurrencyRates {
    [key: string]: number;
}

export interface Invoice {
    customer: string;
    customerNumber: string;
    projectType: string;
    quantity: number;
    pricePerItem: number;
    itemPriceCurrency: string;
    totalPrice: number;
    invoiceCurrency: string;
    status: string;
    invoiceNumber?: string;
    contractComments?: string;
    invoiceTotal?: number | null;
    validationErrors?: string[];
}

export interface ParsedData {
    invoicingMonth: string;
    currencyRates: CurrencyRates;
    invoicesData: Invoice[];
}

export enum HeaderColumn {
    Customer = 'Customer',
    CustNo = "Cust No'",
    ProjectType = 'Project Type',
    Quantity = 'Quantity',
    PricePerItem = 'Price Per Item',
    ItemPriceCurrency = 'Item Price Currency',
    TotalPrice = 'Total Price',
    InvoiceCurrency = 'Invoice Currency',
    Status = 'Status',
    InvoiceNo = 'Invoice #',
    ContractComments = 'Contract Comments',
  }