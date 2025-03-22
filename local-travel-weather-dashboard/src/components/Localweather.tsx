import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useEffect, useState } from "react";

const Localweather = () => {
  const [weather, setWeather] = useState<any>(null);
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);

  // const lat = coordinates.lat;
  // const lng = coordinates.lng;
  const lat = 60.45;
  const lng = -38.67;
  const units = "metric";
  const cnt = "5";

  const apiKey = "2c96b2f76ae370915bbd8a0c18b6789c";

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=${units}&cnt=${cnt}`,
      );
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // useEffect(() => {
  //   if (lat !== 0 && lng !== 0) {
  //     fetchWeather();
  //   }
  // }, [coordinates]);

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
          <td>{weather?.list?.[0]?.main?.temp ?? "N/A"}</td>
          <td>{weather?.list?.[0]?.main?.humidity ?? "N/A"}</td>
          <td>{weather?.list?.[0]?.weather[0]?.icon ?? "N/A"}</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>{weather?.list?.[1]?.main?.temp ?? "N/A"}</td>
          <td>{weather?.list?.[0]?.main?.humidity ?? "N/A"}</td>
          <td></td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>{weather?.list?.[2]?.main?.temp ?? "N/A"}</td>
          <td>{weather?.list?.[0]?.main?.humidity ?? "N/A"}</td>
          <td></td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td>{weather?.list?.[3]?.main?.temp ?? "N/A"}</td>
          <td>{weather?.list?.[0]?.main?.humidity ?? "N/A"}</td>
          <td></td>
        </tr>
        <tr>
          <td>Friday</td>
          <td>{weather?.list?.[4]?.main?.temp ?? "N/A"}</td>
          <td>{weather?.list?.[0]?.main?.humidity ?? "N/A"}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Localweather;
