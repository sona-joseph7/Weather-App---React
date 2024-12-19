import React, { useState } from 'react';
import axios from 'axios'
import 'animate.css';

import './App.css'

function App() {
  const [city,setCity] = useState('')
  const [weatherData, setweatherData] = useState(null)
  const [error, setError] = useState('')

  const apiKey = 'secret_Api'// Add Secret Api 

  const fetchWeather = async()=>{
    if(!city.trim()){
      setError('Please enter a city name')
      return
    }
    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      setweatherData(response.data)
      setError('')
    }catch(err){
      setweatherData(null)
      setError('City not found or API error')
    }
  }

  return (
    <>
    <div className="container mt-5">
      <h1 className='text-center animate__animated animate__fadeInDown'> Daily Weather..!</h1>
      <div className="input-group mb-3">
        <input type="text" 
        className='form-control'
        placeholder='Enter City Name...'
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        />
        <button className='btn btn-primary' onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className='text-danger'>{error}</p>}
     
      {weatherData && (
         <div className="card animate__animated animate__fadeInUp">
         <div className="card-body text-center">
           <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
           <h2 className='card-title'>
             {weatherData.name}, {weatherData.sys.countrty}
           </h2>
           <p className='card-text'>Temperature: {weatherData.main.temp}°C</p>
           <p className='card-text'>Weather: {weatherData.weather[0].description}</p>
           <p className='card-text'>Humidity: {weatherData.main.humidity}%</p>
           <p className='card-text'>Wind Speed: {weatherData.wind.speed}m/s</p>
         </div>
       </div>
      )}

    </div>
    </>
  )
}

export default App
