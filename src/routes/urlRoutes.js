import express from 'express';
import { UrlController } from '../controllers/urlController.js';

const router = express.Router();

// URL shortening endpoint
router.post('/api/shorten', UrlController.shortenUrl);

// URL redirection endpoint
router.get('/:shortCode', UrlController.redirectToUrl);

// URL statistics endpoint
router.get('/api/stats/:shortCode', UrlController.getUrlStats);

export default router;