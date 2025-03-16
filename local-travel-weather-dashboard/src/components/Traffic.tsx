import { useEffect, useState } from "react";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useTrafficStore } from "../stores/trafficStore";
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
          <div className="top-container flex justify-between bg-black text-white">
            <h2>
              {info.MessageType}
              {info.RoadNumber !== "" ? `- ${info.RoadNumber}` : ""}
            </h2>
            <div>
              <h4>{info.SeverityText}</h4>
              <h4>Uppdaterad {info.VersionTime}</h4>
            </div>
          </div>
          <div className="header-text">
            <h2>{info.LocationDescriptor}</h2>
          </div>
          <div className="bottom-container">
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
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex flex-col">{trafficData && renderTrafficData()}</div>
    </>
  );
}

export default Traffic;
