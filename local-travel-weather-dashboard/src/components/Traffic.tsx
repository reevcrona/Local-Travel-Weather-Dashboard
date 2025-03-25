import { useRef, useEffect, useState } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useCombinedTrafficStore } from "../stores/combinedTrafficStore";
import TrafficListTop from "./TrafficListTop";
import TrafficTextHeader from "./TrafficTextHeader";
import TrafficListBottom from "./TrafficListBottom";
import { FaSearch } from "react-icons/fa";

function Traffic() {
  const [activeFilter, setActiveFilter] = useState<"all" | "trains" | "roads">(
    "all",
  );
  const contentRef = useRef<HTMLDivElement>(null);

  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const { fetchAllTrafficData, trafficData, trainsData, hasFetched } =
    useCombinedTrafficStore();

  const { lat, lng } = coordinates;

  useEffect(() => {
    if (lat === 0 && lng === 0) return;
    fetchAllTrafficData(lat, lng);
    console.log(trafficData);
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
    return trainsData.map((info, index) => {
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
        <div className="mb-1 flex w-full max-w-6xl gap-2.5">
          <button
            className={`border-2 border-mainContainerBg p-2 font-bold ${activeFilter === "all" ? "bg-cardcColor text-white" : "bg-transparent"}`}
            onClick={() => setActiveFilter("all")}
          >
            Alla {trafficData.length + trainsData.length}
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
        </div>
        <div
          ref={contentRef}
          className={`@container/main flex max-h-[600px] min-h-[500px] w-full ${!hasFetched && "justify-center"} max-w-6xl flex-col overflow-y-auto bg-mainContainerBg px-3 py-4`}
        >
          {(activeFilter === "all" || activeFilter === "roads") &&
            trafficData &&
            renderTrafficData()}
          {(activeFilter === "all" || activeFilter === "trains") &&
            trainsData &&
            renderTrainData()}
          {!hasFetched && (
            <div className="flex h-full flex-col items-center justify-center text-gray-400">
              <FaSearch className="h-10 w-full" />
              <p className="mt-2 text-lg">Ingen trafikdata laddad</p>
              <p className="text-sm">
                Välj en plats för att visa trafikinformation
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Traffic;
