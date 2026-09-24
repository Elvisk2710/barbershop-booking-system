import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { servicesRouter } from './routes/services.routes.js';
import { barbersRouter } from './routes/barbers.routes.js';
import { availabilityRouter } from './routes/availability.routes.js';
import { bookingsRouter } from './routes/bookings.routes.js';
import { promosRouter } from './routes/promos.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/services', servicesRouter);
app.use('/api/barbers', barbersRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promos', promosRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: "Gentleman's Grooming Bar API",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`💈 Gentleman's Grooming Bar Backend running on http://localhost:${PORT}`);
});
