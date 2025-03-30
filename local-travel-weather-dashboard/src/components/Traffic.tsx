import { useRef, useEffect, useState, useMemo } from "react";
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

  const sortedAllData = useMemo(() => {
    const allData = [...trafficData, ...trainsData, ...ferryData];

    return allData.sort(
      (a, b) =>
        new Date(b.VersionTime).getTime() - new Date(a.VersionTime).getTime(),
    );
  }, [trafficData, trainsData, ferryData]);

  const filteredTrafficData = () => {
    switch (activeFilter) {
      case "all":
        return sortedAllData;
      case "trains":
        return trainsData;
      case "roads":
        return trafficData;
      case "ferry":
        return ferryData;
      default:
        return [];
    }
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
          {filteredTrafficData().map((info) => (
            <TrafficListItem info={info} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Traffic;
