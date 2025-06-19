import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './WeatherApp.module.css'

function WeatherApp() {
//   const api = axios.create({
//   baseURL: `https://api.weatherapi.com/v1/current.json?key=cee0ed6801054429819191809252805&q=$%7Bmanila%7D&aqi=yes`
// });

  const [inputCity, setInputCity] = useState('manila');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleInputCityChange(event) {
    setInputCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    getData(inputCity.toLowerCase());
  }

  useEffect(() => {
    getData(inputCity);
  }, []);

  async function getData(inputCity) {
    try {
      console.log('i am here at the getData');
      const formattedInput = inputCity.toLowerCase();
      console.log('Fetching data for:', inputCity);

      const url = `https://api.weatherapi.com/v1/current.json?key=cee0ed6801054429819191809252805&q=${inputCity}&aqi=yes`;
      
      const response = await axios.get(url);
      console.log('API response:', response.data);

      const returnedCity = response.data.location.name.toLowerCase();

      if (formattedInput === returnedCity) {

        setData(response.data);
        setError(null);

      } else {

        setError({
          status: 400,
          message: `No exact match found. Did you mean ${response.data.location.name}?`
        });

        setData([]);
        setInputCity('');

      }

      setLoading(false);

    } catch(err) {


      console.error('API Error:', err);

      setError({
        status: 400,
        message: "City not found. Please enter a valid city name."
      });

      setData([]);
      setInputCity('');
      setLoading(false);
    }
  }

  function generateForm() {
    return (
      <form onSubmit={handleSubmit}>

        <input
        className={styles.inputCityField}
          type="text"
          placeholder="Enter city name"
          value={inputCity}
          onChange={handleInputCityChange}
        />

        <button
          className={styles.submitButton}
          type="submit">
            Get Weather
        </button>

      </form>
    );
  }

  function getBackgroundColor(temp) {
    if (temp <= 0) return '#e3f2fd';  // Cold - Light blue
    if (temp <= 15) return '#b3e0ff'; // Cool - Blue
    if (temp <= 25) return '#ffeb3b'; // Moderate - Yellow
    if (temp <= 30) return '#ffa726'; // Warm - Orange
    return '#ff7043';                 // Hot - Red-Orange
  }

  function WeatherInfo({ data }) {
    const {
            location: { name, country }, 

            current: {
              temp_c,
              last_updated, 
              condition: { text, icon }, 
              humidity,
              wind_kph,
              feelslike_c
            }
          } = data;

    console.log('Current temperature:', temp_c);
    const backgroundColor = getBackgroundColor(temp_c);
    console.log('Background color:', backgroundColor);      

    
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      
      margin: "15px auto",
      maxWidth: "800px",
      width: "80%",

      backgroundColor: getBackgroundColor(temp_c),
      padding: '15px 50px',
      borderRadius: '20px',

      transition: 'background-color 0.5s ease',

      boxShadow: '5px 5px 5px #222831'
    }

    return (
      <div style={containerStyle}>
        <h2>{name}</h2>

        <p className={styles.conditionText}>{text}</p>
        <h1
          className={styles.tempC}>{temp_c}°C<img src={icon} alt={text} /></h1>

        <p className={styles.feelsLike}>Feels like {feelslike_c}°C</p>

        <div className={styles.lowerContainer}>
          <p className={styles.humidity}>Humidity: <strong>{humidity}%</strong></p>

          <p className={styles.wind}>Wind Speed: <strong>{wind_kph} km/h</strong></p>
        </div>

        <br />

        <p>Last updated: <strong>{last_updated}</strong></p>
        
        <p><strong>{country}</strong></p>

      </div>);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h2>Loading weather data...</h2>
        </div>
      )}

      <div className={styles.weatherAppContainer}>
        <h1 className={styles.header}>Weather App</h1>

        {generateForm()}

        {error && (
          <div className={styles.errorMessage}>
            {error.message}
          </div>
        )}
      </div>

      <div>
        
        {data.location && (
          <WeatherInfo data = { data } />
        )}

      </div>

    </div>
  )
}

export default WeatherApp;
