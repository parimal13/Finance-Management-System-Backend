import express from 'express';
import cors from 'cors';
import recordRoutes from './routes/recordRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', recordRoutes);

export default app;
