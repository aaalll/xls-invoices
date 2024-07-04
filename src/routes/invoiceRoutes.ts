import { Router } from 'express';
import { uploadInvoice } from '../controllers/invoiceController';
import { fileUploadMiddleware } from '../middlewares/fileUploadMiddleware';

const router = Router();

/**
 * @swagger
 * /api/invoices/upload:
 *   post:
 *     summary: Uploads a file and parses the invoice data
 *     parameters:
 *       - in: query
 *         name: invoicingMonth
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-(0[1-9]|1[0-2])$'
 *         required: true
 *         description: Invoicing month in the format YYYY-MM
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: Successfully parsed invoice data
 *       400:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.post('/upload', fileUploadMiddleware, uploadInvoice);

export default router;
