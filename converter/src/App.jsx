import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect (()=>{
    const getExchangeRate = async ()=>{
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const res = await axios.get(url);
        setExchangeRate(res.data.rates[toCurrency]);
      }catch(error){
        console.log("Error while fetching exchange rate:",error);
      }
    };
    getExchangeRate();
  },[fromCurrency,toCurrency]);

  useEffect (()=>{
    if(exchangeRate!==null){
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }),[amount,exchangeRate];

  const handleChange=(e)=>{
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleFrom = (e)=>{
    setFromCurrency(e.target.value)
  }

  const handleTo = (e)=>{
    setToCurrency(e.target.value)
  }

  return (
    <>
      <div className="currencyconverter">
        <div className="box"></div>
        <div className="data">
          <h1>CURRENCY CONVERTER</h1>
          <div className="inputcontainer">
            <label htmlFor="amt">Amount: </label>
            <input type="number" id="amt" value={amount} onChange={handleChange}/>
          </div>
          <div className="inputcontainer">
            <label htmlFor="fromcurrency">From Currency: </label>
            <select id="fromcurrency" value={fromCurrency} onChange={handleFrom}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="RRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="inputcontainer">
            <label htmlFor="tocurrency">To Currency: </label>
            <select id="tocurrency" value={toCurrency} onChange={handleTo}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="RRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p> {amount} {fromCurrency} is eqaul to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
