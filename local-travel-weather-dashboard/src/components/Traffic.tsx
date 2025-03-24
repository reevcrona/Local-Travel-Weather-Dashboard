import { useEffect } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useTrafficStore } from "../stores/trafficStore";
import { useTrainsTrafficStore } from "../stores/trainsTrafficStore";
import axios from "axios";
import TrafficListTop from "./TrafficListTop";
import TrafficTextHeader from "./TrafficTextHeader";
import TrafficListBottom from "./TrafficListBottom";
import { TrainDeviation } from "../types/trafficTypes";
function Traffic() {
  const fetchTrafficData = useTrafficStore((state) => state.fetchTrafficData);
  const trafficData = useTrafficStore((state) => state.trafficData);
  const coordinates = useCoordinatesStore((state) => state.coordinates);

  const trainsTrafficData = useTrainsTrafficStore(
    (state) => state.trainsTrafficData,
  );
  const fetchTrainsData = useTrainsTrafficStore(
    (state) => state.fetchTrainsTrafficData,
  );
  const { lat, lng } = coordinates;

  useEffect(() => {
    if (lat === 0 && lng === 0) return;
    fetchTrainsData(lat, lng);
    console.log(trainsTrafficData);
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
          <TrafficListTop index={index} info={info} />
          <TrafficTextHeader index={index} />
          <TrafficListBottom index={index} info={info} />
        </div>
      );
    });
  };
  const renderTrainData = () => {
    return trainsTrafficData.map((info, index) => {
      return (
        <div key={index}>
          <div className={`absolute top-0 bottom-0 left-0 w-2`}></div>
          <TrafficListTop index={index} info={info} />
          <TrafficTextHeader index={index} />
          <TrafficListBottom index={index} info={info} />
        </div>
      );
    });
  };
  return (
    <>
      <div className="] flex w-full justify-center">
        <div className="@container/main flex max-h-[600px] min-h-[500px] w-full max-w-6xl flex-col overflow-y-auto bg-mainContainerBg px-3 py-4">
          {trainsTrafficData && renderTrainData()}
        </div>
      </div>
    </>
  );
}

export default Traffic;
