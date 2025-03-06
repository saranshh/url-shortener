import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import urlRoutes from './src/routes/urlRoutes.js';
import { logger } from './src/config/logger.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', urlRoutes);

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});