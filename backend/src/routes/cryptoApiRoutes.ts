import express from "express";
import { getTopCryptos, postConvertCurrency } from "../controllers/cryptoAPIController";
const router = express.Router();

router.get('/topCryptos', getTopCryptos); 
router.post('/convertCurrency', postConvertCurrency);

export default router;