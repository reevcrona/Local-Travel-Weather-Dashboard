import { useCoordinatesStore } from "../stores/coordinatesStore";
import { TiWeatherDownpour } from "react-icons/ti";

const Localweather = () => {
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);

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
