import express from 'express';
import invoiceRoutes from './routes/invoiceRoutes';
import { setupSwagger } from './swagger/swagger';

const app = express();

app.use('/api/invoices', invoiceRoutes);

setupSwagger(app);

export default app;