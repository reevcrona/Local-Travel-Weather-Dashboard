import { useEffect } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useTrafficStore } from "../stores/trafficStore";

import TrafficListTop from "./TrafficListTop";
import TrafficTextHeader from "./TrafficTextHeader";
import TrafficListBottom from "./TrafficListBottom";
function Traffic() {
  const fetchTrafficData = useTrafficStore((state) => state.fetchTrafficData);
  const trafficData = useTrafficStore((state) => state.trafficData);
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const { lat, lng } = coordinates;

  /* const fetchTrainsData = async () => {
    const { lat, lng } = coordinates;

    try {
      const response = await axios.post("http://localhost:3000/trains", {
        lat: lat,
        lng: lng,
      });
      setTrainsData(response.data);
    } catch (error) {
      console.error("something failed in Traffic component", error);
    }
  };
*/
  useEffect(() => {
    if (lat === 0 && lng === 0) return;
    fetchTrafficData(coordinates.lat, coordinates.lng);
    console.log(trafficData);
    console.log(coordinates);
  }, [coordinates]);

  const renderTrafficData = () => {
    return trafficData.map((_, index) => {
      return (
        <div key={index} className="mb-4">
          <TrafficListTop index={index} />
          <TrafficTextHeader index={index} />
          <TrafficListBottom index={index} />
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="@container/main flex max-h-[600px] w-full max-w-4xl flex-col overflow-y-auto px-3">
          {trafficData && renderTrafficData()}
        </div>
      </div>
    </>
  );
}

export default Traffic;
