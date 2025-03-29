import { useRef, useEffect, useState } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useCombinedTrafficStore } from "../stores/combinedTrafficStore";
import TrafficListTop from "./TrafficListTop";
import TrafficTextHeader from "./TrafficTextHeader";
import TrafficListBottom from "./TrafficListBottom";
import { FaSearch } from "react-icons/fa";
import TrafficListItem from "./TrafficListItem";

function Traffic() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "trains" | "roads" | "ferry"
  >("all");
  const contentRef = useRef<HTMLDivElement>(null);

  const customColors = {
    5: "bg-trafficRedHeader",
    4: "bg-trafficDarkOliveHeader",
    2: "bg-trafficGrayHeader",
  };

  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const {
    fetchAllTrafficData,
    trafficData,
    trainsData,
    hasFetched,
    ferryData,
  } = useCombinedTrafficStore();

  const { lat, lng } = coordinates;

  useEffect(() => {
    if (lat === 0 && lng === 0) return;
    fetchAllTrafficData(lat, lng);
    console.log(trafficData);
    console.log("Ferry DATA: ", ferryData);
    console.log(trainsData);
    console.log(coordinates);
  }, [coordinates]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeFilter]);

  const renderTrafficData = () => {
    return trafficData.map((info, index) => {
      return <TrafficListItem info={info} />;
    });
  };

  const renderFerryData = () => {
    return ferryData.map((info, index) => {
      return <TrafficListItem info={info} />;
    });
  };

  const renderTrainData = () => {
    return trainsData.map((info, index) => {
      return <TrafficListItem info={info} />;
    });
  };

  const renderAllData = () => {
    const allData = [...trafficData, ...trainsData, ...ferryData];
    allData.sort(
      (a, b) =>
        new Date(b.VersionTime).getTime() - new Date(a.VersionTime).getTime(),
    );
    return allData.map((info, index) => {
      return <TrafficListItem info={info} />;
    });
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-1 flex w-full max-w-6xl gap-2.5">
          <button
            className={`border-2 border-mainContainerBg p-2 font-bold ${activeFilter === "all" ? "bg-cardcColor text-white" : "bg-transparent"}`}
            onClick={() => setActiveFilter("all")}
          >
            Alla {trafficData.length + trainsData.length + ferryData.length}
          </button>
          <button
            className={`border-2 border-mainContainerBg p-2 font-bold ${activeFilter === "trains" ? "bg-cardcColor text-white" : "bg-transparent"}`}
            onClick={() => setActiveFilter("trains")}
          >
            Tåg {trainsData.length}
          </button>
          <button
            className={`border-2 border-mainContainerBg p-2 font-bold ${activeFilter === "roads" ? "bg-cardcColor text-white" : "bg-transparent"}`}
            onClick={() => setActiveFilter("roads")}
          >
            Väg {trafficData.length}
          </button>

          <button
            className={`border-2 border-mainContainerBg p-2 font-bold ${activeFilter === "ferry" ? "bg-cardcColor text-white" : "bg-transparent"}`}
            onClick={() => setActiveFilter("ferry")}
          >
            Färja {ferryData.length}
          </button>
        </div>
        <div
          ref={contentRef}
          className={`@container/main flex max-h-[600px] min-h-[500px] w-full ${!hasFetched && "justify-center"} max-w-6xl flex-col overflow-y-auto bg-mainContainerBg px-3 py-4`}
        >
          {trafficData && renderTrafficData()}
          {trainsData && renderTrainData()}
          {ferryData && renderFerryData()}
        </div>
      </div>
    </>
  );
}

export default Traffic;
