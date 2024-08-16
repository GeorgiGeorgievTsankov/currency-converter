import './App.css';
import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      if (amount <= 0 || !amount) return; // Skip conversion if amount is zero, less than 1 or not valid
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        
        if (data && data.rates && data.rates[toCur] !== undefined) {
          setConverted(data.rates[toCur]);
        } else {
          setConverted("Error");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setConverted("Error");
      } finally {
        setIsLoading(false);
      }
    }

    if (fromCur === toCur) {
      setConverted(amount || ""); // Show amount if currencies are the same
    } else {
      convert();
    }
  }, [amount, fromCur, toCur]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Remove leading zeros from the input
    if (value === "" || !/^[0]\d/.test(value)) {
      setAmount(value);
    } else {
      setAmount(value.replace(/^[0]+/, ''));
    }
  };

//   return (
//     <div>
//       <input
//         type="number"
//         value={amount}
//         onChange={handleAmountChange}
//         min="1" // Prevent zero or negative values
//         placeholder="Enter amount"
//         // disabled={isLoading}
//       />
//       <select
//         value={fromCur}
//         onChange={(e) => setFromCur(e.target.value)}
//         // disabled={isLoading}
//       >
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//         <option value="TRY">TRY</option>
//         <option value="BGN">BGN</option>
//         <option value="CNY">CNY</option>
//         <option value="HKD">HKD</option>
//       </select>
//       <p className='go-to'>⇓</p>
//       <select
//         value={toCur}
//         onChange={(e) => setToCur(e.target.value)}
//         // disabled={isLoading}
//       >
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//         <option value="TRY">TRY</option>
//         <option value="BGN">BGN</option>
//         <option value="CNY">CNY</option>
//         <option value="HKD">HKD</option>
//       </select>
//       {amount > 0 && ( // Show result only if amount is greater than 0
//         <p>
//           {converted} {toCur}
//         </p>
//       )}
//     </div>
//   );
// }

   return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        min="1" // Prevent zero or negative values
        placeholder="Enter amount"
        disabled={isLoading} // Disable input while loading
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading} // Disable select while loading
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="TRY">TRY</option>
        <option value="BGN">BGN</option>
        <option value="CNY">CNY</option>
        <option value="HKD">HKD</option>
      </select>
      <p className='go-to'>⇓</p>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading} // Disable select while loading
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="TRY">TRY</option>
        <option value="BGN">BGN</option>
        <option value="CNY">CNY</option>
        <option value="HKD">HKD</option>
      </select>
      {isLoading ? (
        <p>Loading...</p> // Show loading indicator
      ) : (
        amount > 0 && ( // Show result only if amount is greater than 0
          <p>
            {converted} {toCur}
          </p>
        )
      )}
    </div>
  );
}
