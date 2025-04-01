import { useRef, useEffect, useState, useMemo } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useCombinedTrafficStore } from "../stores/combinedTrafficStore";
import { FaSearch } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
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
      <div className="flex w-full justify-center px-2">
        <div
          className={`@container/main relative flex h-[550px] w-full max-w-[1240px] flex-col rounded-2xl bg-mainContainerBg p-0`}
        >
          <div className="sticky top-0 z-10 w-full px-3 pt-4 pb-2">
            <div className="mb-2 flex w-full justify-center gap-2.5">
              <button
                className={`cursor-pointer rounded-lg border-2 ${activeFilter === "all" ? "border-white" : "border-[#4b5563]"} bg-transparent p-2 font-bold text-white hover:border-[#9ca3af]`}
                onClick={() => setActiveFilter("all")}
              >
                Alla {trafficData.length + trainsData.length + ferryData.length}
              </button>
              <button
                className={`cursor-pointer rounded-lg border-2 ${activeFilter === "trains" ? "border-white" : "border-[#4b5563]"} bg-transparent p-2 font-bold text-white hover:border-[#9ca3af]`}
                onClick={() => setActiveFilter("trains")}
              >
                Tåg {trainsData.length}
              </button>
              <button
                className={`cursor-pointer rounded-lg border-2 ${activeFilter === "roads" ? "border-white" : "border-[#4b5563]"} bg-transparent p-2 font-bold text-white hover:border-[#9ca3af]`}
                onClick={() => setActiveFilter("roads")}
              >
                Väg {trafficData.length}
              </button>
              <button
                className={`cursor-pointer rounded-lg border-2 ${activeFilter === "ferry" ? "border-white" : "border-[#4b5563]"} bg-transparent p-2 font-bold text-white hover:border-[#9ca3af]`}
                onClick={() => setActiveFilter("ferry")}
              >
                Färja {ferryData.length}
              </button>
            </div>
          </div>

          <div
            ref={contentRef}
            className={`flex flex-1 flex-col items-center overflow-y-auto px-3 pb-4 ${(!hasFetched || filteredTrafficData().length === 0) && "items-center justify-center"}`}
          >
            {!hasFetched && (
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
                <FaSearch className="mb-2 h-10 w-10" />
                <p className="mb-2 text-lg font-medium text-white">
                  Ingen trafikdata laddad
                </p>
                <p className="text-sm">
                  Välj en plats för att visa trafikinformation
                </p>
              </div>
            )}

            {hasFetched &&
              filteredTrafficData().length > 0 &&
              filteredTrafficData().map((info, index) => (
                <TrafficListItem info={info} key={index} />
              ))}

            {hasFetched && filteredTrafficData().length === 0 && (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 text-gray-400">
                  <BsExclamationCircle className="text-5xl" />
                </div>
                <h2 className="mb-2 text-xl font-medium text-white">
                  Inga trafikuppdateringar
                </h2>
                <p className="text-gray-400">
                  Det finns för närvarande ingen information om trafikstörningar
                  i det valda området.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Traffic;
