import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import app from '';


describe('API Tests', () => {
    it('should fetch the top 100 cryptocurrencies', async () => {
      const response = await request(app).get('/api/topCryptos');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(100);
    });
  
    it('should convert currency', async () => {
      const conversionRequest = {
        sourceCrypto: 'bitcoin',
        amount: '1',
        targetCurrency: 'usd',
      };
  
      const response = await request(app).post('/api/convertCurrency').send(conversionRequest);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('convertedAmount');
      expect(typeof response.body.convertedAmount).toBe('number');
    });
  });