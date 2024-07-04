import 'reflect-metadata';
import { IsString, IsNumber, IsOptional, validate } from 'class-validator';

class Invoice {
    @IsString()
    public customer!: string;

    @IsString()
    public customerNumber!: string;

    @IsString()
    public projectType!: string;

    @IsNumber()
    public quantity!: number;

    @IsNumber()
    public pricePerItem!: number;

    @IsString()
    public itemPriceCurrency!: string;

    @IsNumber()
    public totalPrice!: number;

    @IsString()
    public invoiceCurrency!: string;

    @IsString()
    public status!: string;

    @IsString()
    @IsOptional()
    public invoiceNumber?: string;

    @IsString()
    @IsOptional()
    public contractComments?: string;

    public validationErrors?: string[];
}

export async function validateInvoices(invoices: Invoice[]): Promise<Invoice[]> {
    for (const invoice of invoices) {
        const errors = await validate(invoice);
        if (errors.length > 0) {
            invoice.validationErrors = errors.map(error => Object.values(error.constraints || {}).join(', '));
        } else {
            invoice.validationErrors = [];
        }
    }
    return invoices;
}
