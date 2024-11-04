// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  // 1. controlled elements with useState - input, select, select
  const [amount, setAmount] = useState(10);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [result, setResult] = useState();

  // 2. useEffect
  // function - fetch,
  // dependency array - input, select, select
  useEffect(
    function () {
      async function fetchConversion() {
        try {
          const res = await fetch(
            // `https://api.frankfurter.app/latest?amount=${amount}&from=EUR&to=USD`

            `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching currency");
          }

          // need extra case when same currency (USD to USD) - gives error

          const data = await res.json();
          setResult(data.rates[currencyTo]);

          console.log("Data: ", data);
          console.log("Data.rates[currencyTo]: ", data.rates[currencyTo]);
          console.log("Result: ", result);
          console.log("==================");
        } catch (err) {
          console.log(err.message);
        }
      }

      fetchConversion();
    },
    [amount, currencyFrom, currencyTo, result]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={currencyFrom}
        onChange={(e) => setCurrencyFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTo}
        onChange={(e) => setCurrencyTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{result}</p>
    </div>
  );
}
