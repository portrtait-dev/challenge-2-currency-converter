// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  // 1. controlled elements with useState - input, select, select
  const [amount, setAmount] = useState(10);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

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

          const data = await res.json();
          console.log("Data: ", data);
          console.log("Data.rates: ", data.rates);
          console.log("==================");
        } catch (err) {
          console.log(err.message);
        }
      }

      fetchConversion();
    },
    // dependency array - include 2 more
    [amount]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* value={query}
      onChange={(e) => setQuery(e.target.value)} */}
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
