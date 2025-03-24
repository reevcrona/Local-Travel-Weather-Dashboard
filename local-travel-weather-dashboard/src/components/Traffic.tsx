import { useRef, useEffect, useState } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useCombinedTrafficStore } from "../stores/combinedTrafficStore";
import TrafficListTop from "./TrafficListTop";
import TrafficTextHeader from "./TrafficTextHeader";
import TrafficListBottom from "./TrafficListBottom";

function Traffic() {
  const fetchAllData = useCombinedTrafficStore(
    (state) => state.fetchAllTrafficData,
  );
  const [activeFilter, setActiveFilter] = useState<"all" | "trains" | "roads">(
    "all",
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const trainsTrafficData = useCombinedTrafficStore(
    (state) => state.trainsData,
  );
  const trafficData = useCombinedTrafficStore((state) => state.trafficData);

  const { lat, lng } = coordinates;

  useEffect(() => {
    if (lat === 0 && lng === 0) return;
    fetchAllData(lat, lng);
    console.log(trainsTrafficData);
    console.log(coordinates);
  }, [coordinates]);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeFilter]);
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
          <TrafficListTop info={info} />
          <TrafficTextHeader info={info} />
          <TrafficListBottom info={info} />
        </div>
      );
    });
  };
  const renderTrainData = () => {
    return trainsTrafficData.map((info, index) => {
      return (
        <div
          key={index}
          className="relative mb-4 rounded-xl border border-cardBorderColor bg-cardcColor"
        >
          <div
            className={`absolute top-0 bottom-0 left-0 w-2 bg-[#1282A2]`}
          ></div>
          <TrafficListTop info={info} />
          <TrafficTextHeader info={info} />
          <TrafficListBottom info={info} />
        </div>
      );
    });
  };
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-2 flex w-full max-w-6xl gap-2.5">
          <button
            className="border-2 p-2"
            onClick={() => setActiveFilter("all")}
          >
            Alla {trafficData.length + trainsTrafficData.length}
          </button>
          <button
            className="border-2 p-2"
            onClick={() => setActiveFilter("trains")}
          >
            Tåg {trainsTrafficData.length}
          </button>
          <button
            className="border-2 p-2"
            onClick={() => setActiveFilter("roads")}
          >
            Väg {trafficData.length}
          </button>
        </div>
        <div
          ref={contentRef}
          className="@container/main flex max-h-[600px] min-h-[500px] w-full max-w-6xl flex-col overflow-y-auto bg-mainContainerBg px-3 py-4"
        >
          {(activeFilter === "all" || activeFilter === "roads") &&
            trafficData &&
            renderTrafficData()}
          {(activeFilter === "all" || activeFilter === "trains") &&
            trainsTrafficData &&
            renderTrainData()}
        </div>
      </div>
    </>
  );
}

export default Traffic;
