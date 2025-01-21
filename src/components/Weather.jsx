import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const search = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location || 'dhanbad'}&units=Metric&appid=ef91000dc2d2abc39e745c9d60ab6a14`;
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError('');
      } catch (error) {
        console.error("Error fetching the weather data", error);
        setData({});
        setError('Not Found 😊');
      }
    };

    search();
  }, [location]); // Added location as a dependency

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location || 'dhanbad'}&units=Metric&appid=ef91000dc2d2abc39e745c9d60ab6a14`;
    try {
      const response = await axios.get(url);
      setData(response.data);
      setError('');
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setData({});
      setError('Not Found 😊');
    }
    setLocation('');
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return 'fa-solid fa-cloud-bolt';
    if (weatherId >= 300 && weatherId < 500) return 'fa-solid fa-cloud-rain';
    if (weatherId >= 500 && weatherId < 600) return 'fa-solid fa-cloud-showers-heavy';
    if (weatherId >= 600 && weatherId < 700) return 'fa-solid fa-snowflake';
    if (weatherId === 701) return 'fa-solid fa-smog'; // mist
    if (weatherId === 711) return 'fa-solid fa-smoke'; // smoke
    if (weatherId === 721) return 'fa-solid fa-sun-haze'; // haze
    if (weatherId === 731 || weatherId === 761) return 'fa-solid fa-dust'; // dust
    if (weatherId === 741) return 'fa-solid fa-smog'; // fog
    if (weatherId === 751) return 'fa-solid fa-wind'; // sand
    if (weatherId === 762) return 'fa-solid fa-volcano'; // volcanic ash
    if (weatherId === 771) return 'fa-solid fa-wind'; // squalls
    if (weatherId === 781) return 'fa-solid fa-tornado'; // tornado
    if (weatherId === 800) return 'fa-solid fa-sun';
    if (weatherId > 800) return 'fa-solid fa-cloud';
    return 'fa-solid fa-sun'; // default icon
  };

  return (
    <div className='weather'>
      <div className="search">
        <div className="search-top">
          <i className='fa-solid fa-location-dot'></i>
          <div className="location">{data.name || error}</div>
        </div>
        <div className="search-location">
          <input type="text" placeholder='Search for a city' value={location} onChange={handleInputChange}/>
          <i className='fa-solid fa-magnifying-glass' onClick={search}></i>
        </div>
      </div>
      <div className="weather-data">
        <i className={data.weather && data.weather[0] ? getWeatherIcon(data.weather[0].id) : 'fa-regular fa-sun'}></i>
        <div className="temp">{data.main ? `${Math.round(data.main.temp)}°C` : 'N/A'}</div>
        <div className="weather-type">{data.weather && data.weather[0] ? data.weather[0].description : 'N/A'}</div>
      </div>
    </div>
  );
};

export default Weather;