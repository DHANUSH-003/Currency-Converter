import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
 const [amount,setAmout]=useState(1);
 const [formCurrencry,setFromCurrency]=useState("USD")
 const [toCurrencry,setToCurrency]=useState("INR")
 const [convertedamount,setConvertedAmount]=useState(null)
const [exchangeRate,setExhangeaRate]=useState(null)

 useEffect(()=>{
  const getExchangeRate=async()=>{
    try{
   let url=`https://api.exchangerate-api.com/v4/latest/${formCurrencry}`
   const respone=await axios.get(url)
  //  console.log(respone)
   setExhangeaRate(respone.data.rates[toCurrencry])
    }
    catch(error){
      console.log("Error Fetching Ratem :",  error)
    }
  }
  getExchangeRate();
 },[formCurrencry,toCurrencry])

 useEffect(()=>{
 if(exchangeRate!==null){
  setConvertedAmount((amount*exchangeRate).toFixed(2));
 }
 },[amount,exchangeRate])

 const handleAmountChange=(e)=>{
  const value=parseFloat(e.target.value)
  setAmout(isNaN(value) ? 0 : value)
 }

 const handleFromCurrencyChange=(e)=>{
  setFromCurrency(e.target.value)
 }
 const handleToCurrencyChange=(e)=>{
  setToCurrency(e.target.value)
 }
  return (
    <>
    <div className='currency-converter'>
      <div className="box"></div>
      <div className="data">
        <h1>Currency Converter</h1>
        <div className="input-container">
          <label htmlFor='amt'>Amount:</label>
          <input type='number' value={amount} id='amt' onChange={handleAmountChange}/>
        </div>
        <div className="input-container">
          <label htmlFor='amt'>From Currency:</label>
          <select id='formCurrencry' value={formCurrencry} onChange={handleFromCurrencyChange}>
            <option value="USD">USD - United States Dollars</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Doller</option>
            <option value="CAD">CAD - Canadian Doller</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor='amt'>To Currency:</label>
          <select id='toCurrencry' value={toCurrencry} onChange={handleToCurrencyChange}>
            <option value="USD">USD - United States Dollars</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Doller</option>
            <option value="CAD">CAD - Canadian Doller</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African</option>
          </select>
        </div>
        <div className="result">
          <p>{amount} {formCurrencry} is equal to {convertedamount} {toCurrencry}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
