import { useCoordinatesStore } from "../stores/coordinatesStore";
import { TiWeatherDownpour } from "react-icons/ti";
import { useState } from "react";

const Localweather = () => {
  const [Monday, setMonday] = useState({});
  const [Tuesday, setTuesday] = useState({});
  const [Wednesday, setWednesday] = useState({});
  const [Thursday, setThursday] = useState({});
  const [Friday, setFriday] = useState({});
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);

  const lat = coordinates.lat;
  const lng = coordinates.lng;

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=4b2f7b4c1b7b4b3e8f1130322210408&q=${lat},${lng}&days=5`,
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Day</th>
          <th>Temp C</th>
          <th>Rain %</th>
          <th>Weather</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monday</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
          <td>
            <TiWeatherDownpour />
          </td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>The Eagles</td>
          <td>1972</td>
          <td>
            <TiWeatherDownpour />
          </td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
          <td>
            <TiWeatherDownpour />
          </td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
          <td>
            <TiWeatherDownpour />
          </td>
        </tr>
        <tr>
          <td>Friday</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
          <td>
            <TiWeatherDownpour />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Localweather;
