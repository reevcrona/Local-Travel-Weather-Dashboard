import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useEffect, useState } from "react";

const Localweather = () => {
  const [weather, setWeather] = useState<any>(null);
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);

  const lat = coordinates.lat;
  const lng = coordinates.lng;
  const units = "metric";

  const apiKey = "2c96b2f76ae370915bbd8a0c18b6789c";

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=${units}`,
      );
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchWeather();
  // }, []);

  useEffect(() => {
    if (lat !== 0 && lng !== 0) {
      fetchWeather();
    }
  }, [coordinates]);

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const getDailyForecasts = (list: any[]) => {
    const dailyForecasts: any[] = [];
    const dates = new Set();

    for (const item of list) {
      const date = item.dt_txt.split(" ")[0];
      if (!dates.has(date)) {
        dates.add(date);
        dailyForecasts.push(item);
      }
      if (dailyForecasts.length === 7) break;
    }

    return dailyForecasts;
  };

  return (
    <table className="mx-auto mt-4 w-1/2 table-auto border-2 border-solid border-black">
      <thead>
        <tr className="divide-solid divide-black border-2 border-solid border-black">
          <th>Day</th>
          <th>Temp °C</th>
          <th>Rain %</th>
          <th>Weather</th>
        </tr>
      </thead>
      <tbody>
        {weather &&
          getDailyForecasts(weather.list).map((item: any, index: number) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? "#ebebeb" : "white" }}
            >
              <td className="border-r-2 border-solid border-black text-center">
                {getDayOfWeek(item.dt_txt)}
              </td>
              <td className="border-r-2 border-solid border-black text-center">
                {item.main.temp ?? "N/A"}
              </td>
              <td className="border-r-2 border-solid border-black text-center">
                {item.main.humidity ?? "N/A"}
              </td>
              <td>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="weather icon"
                  className="mx-auto"
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Localweather;
