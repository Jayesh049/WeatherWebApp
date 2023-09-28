import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

// 1.Creation of Homepage
const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});


    // for setting data from drop down box
    const getInitialState = () => {
        const value = "Celsius";
        return value;
    };
    // adding initial value as celsius with the help of getInitialState
    const [value, setValue] = useState(getInitialState);

      const handleChange = (e) => {
        setValue(e.target.value);
      };
    
    
    // Search with the help of enter key event
    const search = async (e) => {
        if(e.key === 'Enter') {
            // fetching data
            const data = await fetchWeather(query);
            //setting data
            setWeather(data);
            // seeting query to empty state
            setQuery('');
            // console.log(data);
        }
    }

    return (
        
        <div className="main-container">
            <input type="text"className="search"placeholder="Search..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            {/* mapping weather data {2.displaying weather data} */}
            {weather.main && (
                <div className="city">
                        <h3 className="city-name">
                        {/* weather name */}
                        <span>{weather.name}</span>
                        {/*  Country */}
                        <sup>{weather.sys.country}</sup>
                    </h3>
                    
                        <h3 className='city-name'>
                        {/* WindSpeed */}
                            <h6>WindSpeed {weather.wind.speed}</h6>
                        {/* humidity */}
                            <h6>Humidity '{weather.main.humidity}'</h6>
                        </h3>      
                        {/* Adding drop down for celsius and fehrenheit {4.unit selection}*/}
                    <select value={value} onChange={handleChange}>
                        <option value="Celsius">
                        Celsius
                        </option>

                        <option value="Fehrenheit">
                        Fehrenheit
                        </option>
            </select>
            
            {value === 'Celsius'? 
            <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
        </div>
        :
        <div className="city-temp">
            {Math.round(weather.main.temp * 9/5) + 32}
            <sup>&deg;F</sup>
        </div> }

                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                    
                </div>
            )}
         
        </div>
        
    );
}

export default App;


// {JSON.stringify(location.coordinates.lng) === Math.round(weather.coord.lat) || JSON.stringify(location.coordinates.lng) === Math.round(weather.coord.lon) } && (