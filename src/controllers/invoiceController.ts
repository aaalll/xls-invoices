import { Request, Response } from "express";
import moment from "moment";
import { promises as fs } from "fs";
import { parseExcel } from "../utils/parser";
// import { validateInvoices } from "../utils/validation";
import { ParsedData } from "../utils/types";

export const uploadInvoice = async (req: Request, res: Response) => {
  const { invoicingMonth } = req.query;
  if (!req.file) {
    return res.status(400).send("File not found");
  }

  try {
    if (
      !invoicingMonth ||
      !/^\d{4}-(0[1-9]|1[0-2])$/.test(invoicingMonth as string)
    ) {
      return res.status(400).send("Wrong invoicingMonth format. Use YYYY-MM.");
    }

    const parsedData: ParsedData = parseExcel(req.file.path);

    const fileInvoicingMonth = moment(
      parsedData.invoicingMonth,
      "MMM yyyy"
    ).format("YYYY-MM");
    if (fileInvoicingMonth !== invoicingMonth) {
      return res
        .status(400)
        .send(
          `Invoicing month in file (${parsedData.invoicingMonth}) not equal (${invoicingMonth}).`
        );
    }

    // parsedData.invoicesData = await validateInvoices(parsedData.invoicesData);
    (async () => {
      try {
        if (req.file && req.file.path) {
          await fs.unlink(req.file.path);
        }
      } catch (err) {
        console.error("Error deleting the file:", err);
      }
    })();

    res.send(parsedData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Невідома помилка");
    }
  }
};
