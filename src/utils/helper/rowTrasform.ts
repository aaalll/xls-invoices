import { HeaderColumn, CurrencyRates } from "../types";

export function extractCurrencyRates(data: any[]): CurrencyRates {
    const currencyRates: CurrencyRates = {};

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const firstColumnValue = row[0];
        if (typeof firstColumnValue === 'string' && firstColumnValue.includes('Rate')) {
            const currency = firstColumnValue.split(' ')[0];
            if (typeof row[1] === 'number') {
                currencyRates[currency] = row[1];
            }
        } else {
            break;
        }
    }

    return currencyRates;
}

export function getIndex(data: any[]): [number, number] {
    let dataStartIndex = -1;
    let dataEndIndex = -1;

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (Object.values(row).includes(HeaderColumn.Customer)) {
            dataStartIndex = i + 1;
        }

        if (Object.values(row).includes('Total (No VAT)')) {
            dataEndIndex = i;
            break;
        }
    }

    return [dataStartIndex, dataEndIndex];
}

export function getColumnPositions(headerRow: any[]): { [key in HeaderColumn]?: number } {
    const columnPositions: { [key in HeaderColumn]?: number } = {};
  
    headerRow.forEach((cellValue, index) => {
      if (Object.values(HeaderColumn).includes(cellValue)) {
        columnPositions[cellValue as HeaderColumn] = index;
      }
    });
  
    return columnPositions;
  }