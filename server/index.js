 
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import { initDB } from './utils/db.js';
import { createSchema } from './models/initSchema.js';

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);

initDB().then(createSchema);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));