import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useEffect, useState } from "react";

const Localweather = () => {
  interface WeatherItem {
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      icon: string;
    }[];
  }

  interface WeatherData {
    list: WeatherItem[];
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const coordinates = useCoordinatesStore((state) => state.coordinates);

  const lat: number = coordinates.lat;
  const lng: number = coordinates.lng;
  const units = "metric";

  const apiKey = "2c96b2f76ae370915bbd8a0c18b6789c";

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=${units}`,
      );
      const data: WeatherData = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (lat !== 0 && lng !== 0) {
      fetchWeather();
    }
  }, [coordinates]);

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("swe-SE", { weekday: "long" });
  };

  const getDailyForecasts = (list: WeatherItem[]) => {
    const dailyForecasts: WeatherItem[] = [];
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
    <div className="flex w-full flex-col items-center justify-center p-[20px]">
      <h1 className="mb-7 text-center font-montserrat text-3xl text-white">
        Local Weather
      </h1>
      <table className="mx-auto w-full max-w-[950px] table-auto rounded-lg">
        <thead>
          <tr className="divide-solid divide-black bg-mainContainerBg">
            <th className="text-white">Dag</th>
            <th className="text-white">Temp °C</th>
            <th className="text-white">Regn %</th>
            <th className="text-white">Väder</th>
          </tr>
        </thead>
        <tbody>
          {weather &&
            getDailyForecasts(weather.list).map((item: any, index: number) => (
              <tr
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "rgb(60 74 97)" : "rgb(41 53 72)",
                }}
              >
                <td className="border-r-2 border-solid border-mainContainerBg text-center text-white">
                  {getDayOfWeek(item.dt_txt)}
                </td>
                <td className="border-r-2 border-solid border-mainContainerBg text-center text-white">
                  {item.main.temp ?? "N/A"}
                </td>
                <td className="border-r-2 border-solid border-mainContainerBg text-center text-white">
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
    </div>
  );
};

export default Localweather;
