import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";
export default function SearchBox({ newWeatherInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  let API_URL = "https://api.openweathermap.org/data/2.5/weather";
  let API_KEY = "addb43b1d86e71d770f4093b6a2a9f42";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        humidity: jsonResponse.main.humidity,
        feels_like: jsonResponse.main.feels_like,
        presure: jsonResponse.main.pressure,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (e) {
      throw e;
    }
  };

  let changeCity = (e) => {
    setCity(e.target.value);
  };

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(city);
      setCity("");
      let updateInfo = await getWeatherInfo();
      newWeatherInfo(updateInfo);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="city name"
          variant="outlined"
          required
          onChange={changeCity}
          value={city}
        />
        <br />
        <br />

        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p>no such city!</p>}
      </form>
    </div>
  );
}
