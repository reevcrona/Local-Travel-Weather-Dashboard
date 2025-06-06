import { useRef, useEffect, useState, useMemo } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useCombinedTrafficStore } from "../stores/combinedTrafficStore";
import { FaSearch } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import TrafficListItem from "./TrafficListItem";
import TrafficFilterButton from "./TrafficFilterButton";

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

  const handleFilterChange = (
    filterString: "all" | "trains" | "roads" | "ferry",
  ) => {
    setActiveFilter(filterString);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center px-2">
        <div
          className={`@container/main relative flex h-[550px] w-full max-w-[950px] flex-col rounded-2xl bg-mainContainerBg p-0`}
        >
          <div className="z-10 w-full px-3 pt-5 pb-2">
            <div className="mb-2 flex w-full flex-col items-center justify-between gap-3.5 px-3 min-[777px]:flex-row min-[777px]:gap-0">
              <div className="flex w-full flex-1 flex-col items-center min-[777px]:items-start">
                <h2 className="max-[max-content] text-center font-poppins text-xl font-bold text-white min-[385px]:text-3xl min-[777px]:text-start">
                  Trafikuppdateringar
                </h2>
                <p className="w-[max-content] text-center font-lato text-[8px] text-gray-400 min-[385px]:text-xs min-[777px]:text-start">
                  Senaste informationen om trafiken i ditt område
                </p>
              </div>
              <div className="flex flex-1 flex-wrap justify-center gap-3.5 min-[442px]:justify-end">
                <TrafficFilterButton
                  activeFilter={activeFilter}
                  trafficAmount={
                    trafficData.length + trainsData.length + ferryData.length
                  }
                  handleFilterChange={handleFilterChange}
                  filtervalue={{ eng: "all", swe: "Alla" }}
                />
                <TrafficFilterButton
                  activeFilter={activeFilter}
                  trafficAmount={trainsData.length}
                  handleFilterChange={handleFilterChange}
                  filtervalue={{ eng: "trains", swe: "Tåg" }}
                />
                <TrafficFilterButton
                  activeFilter={activeFilter}
                  trafficAmount={trafficData.length}
                  handleFilterChange={handleFilterChange}
                  filtervalue={{ eng: "roads", swe: "Väg" }}
                />
                <TrafficFilterButton
                  activeFilter={activeFilter}
                  trafficAmount={ferryData.length}
                  handleFilterChange={handleFilterChange}
                  filtervalue={{ eng: "ferry", swe: "Färja" }}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center px-4">
            <hr className="mb-3 w-full max-w-6xl border-t-2 border-hrColor opacity-70" />
          </div>

          <div
            ref={contentRef}
            className={`flex flex-1 flex-col items-center overflow-y-auto px-3 pb-4 ${(!hasFetched || filteredTrafficData().length === 0) && "items-center justify-center"}`}
          >
            {!hasFetched && (
              <div className="flex h-[70%] w-full max-w-xl flex-col items-center justify-center rounded-2xl bg-cardcColor text-center text-gray-400">
                <FaSearch className="mb-2 h-10 w-10" />
                <h2 className="mb-2 font-poppins text-lg font-medium text-white">
                  Ingen trafikdata laddad
                </h2>
                <p className="font-lato text-sm">
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
              <div className="flex h-[70%] flex-col items-center justify-center rounded-2xl bg-cardcColor p-8 text-center">
                <div className="mb-4 text-gray-400">
                  <BsExclamationCircle className="text-5xl" />
                </div>
                <h2 className="mb-2 font-poppins text-xl font-medium text-white">
                  Inga trafikuppdateringar
                </h2>
                <p className="font-lato text-gray-400">
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
