// src/App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'; // Import the stylesheet

interface Crypto {
  id: string;
  name: string;
}

interface ConversionResponse {
  convertedAmount: number;
}

const App: React.FC = () => {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
  const [sourceCrypto, setSourceCrypto] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [targetCurrency, setTargetCurrency] = useState<string>('usd');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch top 100 cryptocurrencies
    axios.get<Crypto[]>(`${process.env.BASE_URL}/api/topCryptos`).then((response) => {
      setCryptoList(response.data);
      setSourceCrypto(response.data[0]?.id || '');
    });
  }, []);

  const handleConvert = () => {
    axios
      .post<ConversionResponse>(`${process.env.BASE_URL}/api/convertCurrency`, {
        sourceCrypto,
        amount,
        targetCurrency,
      })
      .then((response) => {
        setConvertedAmount(response.data.convertedAmount);
      })
      .catch((error) => {
        console.error(error);
        // Handle error and display to the user
      });
  };

  return (
    <div className="app-container">
      <h1>Currency Converter</h1>
      <form className="converter-form">
        <label>
          Source Cryptocurrency:
          <select value={sourceCrypto} onChange={(e) => setSourceCrypto(e.target.value)}>
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Target Currency:
          <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            {/* Add more currencies as needed */}
          </select>
        </label>
        <button type="button" onClick={handleConvert}>
          Convert
        </button>
      </form>
      {convertedAmount !== null && (
        <div className="result-container">
          <h2>Converted Amount:</h2>
          <p>{convertedAmount}</p>
        </div>
      )}
    </div>
  );
};

export default App;
