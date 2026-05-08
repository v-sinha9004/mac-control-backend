require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const volumeRoutes = require('./routes/volumeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // limit each IP to 200 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use(limiter);

// Routes
app.use('/api/volume', volumeRoutes);

// Base route for health check
app.get('/', (req, res) => {
  res.json({ status: 'macOS Volume Control Backend is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const { Bonjour } = require('bonjour-service');

// Listen on 0.0.0.0 to be accessible on local network
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);

  // Publish Bonjour service with a unique name to avoid conflicts
  const bonjour = new Bonjour();
  const uniqueName = `mac-control-api-${Math.floor(Math.random() * 10000)}`;
  const service = bonjour.publish({ name: uniqueName, type: 'http', port: PORT, host: 'mac-control-api.local' });

  service.on('error', (err) => {
    console.error('Bonjour publish error:', err.message);
  });

  console.log(`Bonjour service published! You can now access the backend at http://mac-control-api.local:${PORT}`);
});

// Force exit on nodemon restarts and terminal kills
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach(signal => {
  process.on(signal, () => {
    console.log(`Received ${signal}, forcing exit`);
    process.exit(0);
  });
});
