import { Request, Response } from "express";
import axios from 'axios';

export async function getTopCryptos(req: Request, res: Response){
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        });
    
        const topCryptos = response.data;
        res.json(topCryptos);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function postConvertCurrency(req: Request, res: Response){
    try {
        const { sourceCrypto, amount, targetCurrency } = req.body;
    
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: sourceCrypto,
            vs_currencies: targetCurrency,
          },
        });
    
        const exchangeRate = response.data[sourceCrypto][targetCurrency];
        const convertedAmount = amount * exchangeRate;
    
        res.json({ convertedAmount });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}