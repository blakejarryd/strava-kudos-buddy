import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import routes from './routes';

// Load environment variables with absolute path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Add debugging log
console.log('Server starting with environment:', {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  hasStravaConfig: !!process.env.STRAVA_CLIENT_ID,
  currentDir: __dirname,
  envPath: path.resolve(__dirname, '../.env')
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    environment: process.env.NODE_ENV
  });
});

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.path} not found`
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

export default app;
