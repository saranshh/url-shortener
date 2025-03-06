import { UrlService } from '../services/urlService.js';
import { logger } from '../config/logger.js';

export class UrlController {
  static async shortenUrl(req, res) {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const result = await UrlService.shortenUrl(url);
      res.json({
        originalUrl: result.original_url,
        shortUrl: `${req.protocol}://${req.get('host')}/${result.short_code}`,
        shortCode: result.short_code
      });
    } catch (error) {
      logger.error('Error in shortenUrl controller', { error });
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async redirectToUrl(req, res) {
    try {
      const { shortCode } = req.params;
      const originalUrl = await UrlService.getOriginalUrl(shortCode);
      
      if (!originalUrl) {
        return res.status(404).json({ error: 'URL not found' });
      }
      
      res.redirect(originalUrl);
    } catch (error) {
      logger.error('Error in redirectToUrl controller', { error });
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUrlStats(req, res) {
    try {
      const { shortCode } = req.params;
      const stats = await UrlService.getStats(shortCode);
      res.json(stats);
    } catch (error) {
      logger.error('Error in getUrlStats controller', { error });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}