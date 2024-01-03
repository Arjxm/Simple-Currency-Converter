// src/App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Crypto {
  id: string;
  name: string;
}

interface ConversionResponse {
  convertedAmount: number;
}

function App() {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
  const [sourceCrypto, setSourceCrypto] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [targetCurrency, setTargetCurrency] = useState<string>('usd');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch top 100 cryptocurrencies
    axios.get<Crypto[]>('http://localhost:3001/api/topCryptos').then((response) => {
      setCryptoList(response.data);
      setSourceCrypto(response.data[0]?.id || '');
    });
  }, []);

  const handleConvert = () => {
    axios
      .post<ConversionResponse>('http://localhost:3001/api/convertCurrency', { sourceCrypto, amount, targetCurrency })
      .then((response) => {
        setConvertedAmount(response.data.convertedAmount);
      })
      .catch((error) => {
        console.error(error);
        // Handle error and display to the user
      });
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <form>
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
        <br />
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <br />
        <label>
          Target Currency:
          <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            {/* Add more currencies as needed */}
          </select>
        </label>
        <br />
        <button type="button" onClick={handleConvert}>
          Convert
        </button>
      </form>
      {convertedAmount !== null && (
        <div>
          <h2>Converted Amount:</h2>
          <p>{convertedAmount}</p>
        </div>
      )}
    </div>
  );
}

export default App;
