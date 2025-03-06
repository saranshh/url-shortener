import { nanoid } from 'nanoid';
import { query } from '../config/database.js';
import { logger } from '../config/logger.js';

export class UrlService {
  static async shortenUrl(originalUrl) {
    const shortCode = nanoid(8);
    
    try {
      const result = await query(
        'INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING *',
        [originalUrl, shortCode]
      );
      
      return result.rows[0];
    } catch (error) {
      logger.error('Error shortening URL', { error, originalUrl });
      throw error;
    }
  }

  static async getOriginalUrl(shortCode) {
    try {
      const result = await query(
        'SELECT original_url FROM urls WHERE short_code = $1',
        [shortCode]
      );
      
      if (result.rows.length === 0) {
        return null;
      }

      // Track visit
      await this.trackVisit(shortCode);
      
      return result.rows[0].original_url;
    } catch (error) {
      logger.error('Error getting original URL', { error, shortCode });
      throw error;
    }
  }

  static async trackVisit(shortCode) {
    try {
      await query(
        'INSERT INTO visits (url_id, visited_at) SELECT id, NOW() FROM urls WHERE short_code = $1',
        [shortCode]
      );
    } catch (error) {
      logger.error('Error tracking visit', { error, shortCode });
      throw error;
    }
  }

  static async getStats(shortCode) {
    try {
      const stats = await query(`
        SELECT 
          COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '1 day') as today,
          COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '7 days') as this_week,
          COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '30 days') as this_month
        FROM visits v
        JOIN urls u ON v.url_id = u.id
        WHERE u.short_code = $1
      `, [shortCode]);

      return stats.rows[0];
    } catch (error) {
      logger.error('Error getting stats', { error, shortCode });
      throw error;
    }
  }
}