import { useEffect } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useTrafficStore } from "../stores/trafficStore";
import { FaRoad, FaRegCalendarAlt } from "react-icons/fa";
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
    return trafficData.map((info, index) => {
      return (
        <div key={index} className="mb-4">
          <div
            className={`top-container flex flex-col justify-between px-5 py-3 @min-trafficHeaderSmall/main:flex-row ${info.SeverityCode === 2 ? "bg-trafficGrayHeader" : info.SeverityCode === 4 ? "bg-trafficDarkOliveHeader" : "bg-trafficRedHeader"} text-white`}
          >
            <div className="flex items-center">
              <div className="pt-1">
                <FaRoad className="text-3xl" />
              </div>

              <h2 className="ml-3 text-2xl">
                {info.MessageType}
                {info.RoadNumber !== "" ? ` - ${info.RoadNumber}` : ""}
              </h2>
            </div>
            <div>
              <hr className="mt-3 mb-2 block border-t-2 border-hrColor opacity-70 @min-trafficHeaderSmall/main:hidden" />
            </div>
            <div className="flex flex-col">
              <h4 className="mb-[2px] text-start font-bold @min-trafficHeaderSmall/main:mb-0 @min-trafficHeaderSmall/main:text-end">
                {info.SeverityText}
              </h4>
              <h4 className="font-bold">
                Uppdaterad{" "}
                <span className="font-normal">{info.VersionTime}</span>
              </h4>
            </div>
          </div>
          <div className="header-text flex pt-3 pl-3">
            <h2 className="text-xl">{info.LocationDescriptor}</h2>
          </div>
          <div className="px-3">
            <hr className="mt-4 mb-2 border-t-2 border-hrColor opacity-70 @min-bottomContainerCol/main:mb-4" />
          </div>

          <div className="bottom-container flex flex-col px-3 @min-bottomContainerCol/main:flex-row">
            <div className="flex flex-1 flex-col">
              <p className="mb-2 pr-3">{info.Message}</p>
              {info.TemporaryLimit && info.TemporaryLimit.length > 0 ? (
                <>
                  <h4 className="font-bold">Tillfälliga begränsningar</h4>
                  <ul className="list-disc pl-9">
                    {info.TemporaryLimit.map((tempLimit, index) => (
                      <li key={index}>{tempLimit}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <div className="mt-2 flex flex-1 flex-col justify-between px-1 @min-bottomContainerCol/main:mt-0 @min-bottomContainerCol/main:flex-row">
              <div className="flex gap-2">
                <span className="pt-1">
                  <FaRegCalendarAlt className="flex items-center" />
                </span>

                <span className="font-bold">Starttid</span>
                <p>{info.StartTime}</p>
              </div>
              <div className="ml-6 flex gap-2 @min-bottomContainerCol/main:ml-0">
                <span className="mr-1.5 font-bold @min-bottomContainerCol/main:mr-0">
                  Sluttid
                </span>
                <p>{info.EndTime}</p>
              </div>
            </div>
          </div>
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
