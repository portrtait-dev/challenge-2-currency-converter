// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(10);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(
    function () {
      async function fetchConversion() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
          );

          if (!res.ok) {
            if (currencyFrom === currencyTo) {
              setResult("You are converting the same currency!");
            }

            throw new Error("Something went wrong with fetching currency");
          }

          const data = await res.json();
          setResult(data.rates[currencyTo]);

          // console.log("Data: ", data);
          // console.log("Data.rates[currencyTo]: ", data.rates[currencyTo]);
          // console.log("Result: ", result);
          // console.log("==================");

          setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
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
        disabled={isLoading}
      />
      <select
        value={currencyFrom}
        onChange={(e) => setCurrencyFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTo}
        onChange={(e) => setCurrencyTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {result} {currencyTo}
      </p>
    </div>
  );
}
