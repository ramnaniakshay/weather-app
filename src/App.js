import './App.css';
import React, { useState,useEffect } from 'react';

const api =
{
  key: "f8d1a784a62655c8ce575bd1e3fd8cf3",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query,setQuery] = useState('');
  const [weataher,setWeather] = useState('');

  const search = evt => {
    if(evt.key === "Enter")
    {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      
        console.log(result);
      });
    }
  } 


  const dateBuilder = (d) => {
    let months = ["Janyuary" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"]
    let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={
      (typeof weataher.main != "undefined") 
      ? ((weataher.temp >16) 
      ? 'app warm' 
      : 'app') 
      :'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search City"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weataher.main != "undefined") ? (
        <div>
          <div className="location-box">
          <div className="location">{weataher.name}, {weataher.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
        
          <div className="temp">
              {Math.round(weataher.main.temp)}°C
          </div>
          <div className="weather">{weataher.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
