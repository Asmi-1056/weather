import "./App.css";
import { useState } from "react";
import search_icon from "./assets/search.png";
import rain_icon from "./assets/rain.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";
import { useEffect } from "react";

const getWeatherData=async(BASE_URL)=>{
  let response = await fetch(BASE_URL);
  return await response.json();
}

function App() {
  const [location, setLocation] = useState('Mumbai');
  const [data,setData] = useState({});
  const API_KEY='79ba1ab920d26aaeced0427a305a20ff'
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`

  useEffect(()=>{
    getWeatherData(BASE_URL).then((d)=>{
      setData(d)
      console.log(data)
    })
    },[location] ) 

  function handleChange(event){
    setLocation(event.target.value)
    console.log(location)
  }

  const handleSearch = () => {
    getWeatherData(BASE_URL).then((d) => {
      setData(d);
      console.log(d);
    });
  };

  const getIcon = (weather) => {
    switch(weather?.toLowerCase()){
      case "clear":
        return clear_icon;
      case "rain":
        return rain_icon;
      case "drizzle":
        return drizzle_icon;
      case "snow":
        return snow_icon;
      case "cloud":
        return cloud_icon;
      default :
        return clear_icon
    }
  }

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" value={location} id="" placeholder="Search" onChange={handleChange}/>
        <img src={search_icon} alt="search" />
      </div>
      <div className="align">
        <img src={getIcon(data.weather?.[0]?.main)} alt="weather icon" className="weather-icon" />
        <div className="content">
          <p className="temperature">{ data.main?.temp ? Math.round(data.main?.temp-273.15) : '..' }˚C</p>
          <p className="location">{data.name ? data.name : 'Location Not Found'}</p>
        </div>
      </div>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{data.main?.humidity ? data.main?.humidity : 'Not Found'}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div>
            <p>{data.wind?.speed ? data.wind?.speed : 'Not Found'}Km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;