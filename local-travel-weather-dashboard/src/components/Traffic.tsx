import { useEffect, useState } from "react";
import axios from "axios";
import { useCoordinatesStore } from "../stores/coordinatesStore";
import { useTrafficStore } from "../stores/trafficStore";
function Traffic() {
  const fetchTrafficData = useTrafficStore((state) => state.fetchTrafficData);
  const trafficData = useTrafficStore((state) => state.trafficData);
  const coordinates = useCoordinatesStore((state) => state.coordinates);

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
    if (coordinates.lat === 0 && coordinates.lng === 0) return;
    fetchTrafficData(coordinates.lat, coordinates.lng);
    console.log(trafficData);
  }, [coordinates]);

  return <></>;
}

export default Traffic;
