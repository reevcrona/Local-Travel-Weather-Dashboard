import { useEffect } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useTrafficStore } from "../stores/trafficStore";
import { FaRoad, FaRegCalendarAlt } from "react-icons/fa";
function Traffic() {
  const fetchTrafficData = useTrafficStore((state) => state.fetchTrafficData);
  const trafficData = useTrafficStore((state) => state.trafficData);
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const { lat, lng } = coordinates;

  const colorTable: { [key: number]: string } = {
    2: "trafficGrayHeader",
    4: "trafficSageHeader",
    5: "trafficRedHeader",
  };

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
            className={`top-container ${info.SeverityCode === 2 ? "bg-trafficGrayHeader" : info.SeverityCode === 4 ? "bg-trafficDarkOliveHeader" : "bg-trafficRedHeader"} flex justify-between text-white`}
          >
            <div className="flex items-center">
              <FaRoad />
              <h2>
                {info.MessageType}
                {info.RoadNumber !== "" ? `- ${info.RoadNumber}` : ""}
              </h2>
            </div>

            <div>
              <h4>{info.SeverityText}</h4>
              <h4>Uppdaterad {info.VersionTime}</h4>
            </div>
          </div>
          <div className="header-text">
            <h2>{info.LocationDescriptor}</h2>
          </div>
          <div className="bottom-container">
            <div>
              <p>{info.Message}</p>
              {info.TemporaryLimit && info.TemporaryLimit.length > 0 ? (
                <>
                  <h4>Tillfälliga begränsningar</h4>
                  <ul>
                    {info.TemporaryLimit.map((tempLimit, index) => (
                      <li key={index}>{tempLimit}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <div>
              <div>
                <FaRegCalendarAlt />
                <span>Starttid</span>
                <p>{info.StartTime}</p>
              </div>
              <div>
                <span>Sluttid</span>
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
        <div className="flex max-h-[600px] w-full max-w-4xl flex-col overflow-y-auto">
          {trafficData && renderTrafficData()}
        </div>
      </div>
    </>
  );
}

export default Traffic;
