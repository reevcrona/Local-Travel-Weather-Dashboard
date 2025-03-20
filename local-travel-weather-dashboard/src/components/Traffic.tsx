import { useEffect, useState } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useTrafficStore } from "../stores/trafficStore";
import axios from "axios";
import TrafficListTop from "./TrafficListTop";
import TrafficTextHeader from "./TrafficTextHeader";
import TrafficListBottom from "./TrafficListBottom";
function Traffic() {
  const fetchTrafficData = useTrafficStore((state) => state.fetchTrafficData);
  const trafficData = useTrafficStore((state) => state.trafficData);
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const [trainsData, setTrainsData] = useState<any>([]);
  const { lat, lng } = coordinates;

  const fetchTrainsData = async () => {
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

  useEffect(() => {
    if (lat === 0 && lng === 0) return;
    fetchTrainsData();
    console.log(trainsData);
    console.log(coordinates);
  }, [coordinates]);

  const renderTrafficData = () => {
    return trafficData.map((info, index) => {
      return (
        <div
          key={index}
          className="relative mb-4 rounded-xl border border-cardBorderColor bg-cardcColor"
        >
          <div
            className={`absolute top-0 bottom-0 left-0 w-2 ${info.SeverityCode === 2 ? "bg-trafficGrayHeader" : info.SeverityCode === 4 ? "bg-trafficDarkOliveHeader" : "bg-trafficRedHeader"}`}
          ></div>
          <TrafficListTop index={index} />
          <TrafficTextHeader index={index} />
          <TrafficListBottom index={index} />
        </div>
      );
    });
  };

  return (
    <>
      <div className="] flex w-full justify-center">
        <div className="@container/main flex max-h-[600px] min-h-[500px] w-full max-w-6xl flex-col overflow-y-auto bg-mainContainerBg px-3 py-4">
          {trafficData && renderTrafficData()}
        </div>
      </div>
    </>
  );
}

export default Traffic;
