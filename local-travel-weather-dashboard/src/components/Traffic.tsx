import { useEffect, useState } from "react";
import axios from "axios";
import { useCoordinatesStore } from "../stores/coordinatesStore";

function Traffic() {
  const [trafficD, setTrafficD] = useState<any>("");
  const [dataFetched, setDataFetched] = useState(false);
  const [trainsData, setTrainsData] = useState<any>("");

  const coordinates = useCoordinatesStore((state) => state.coordinates);

  const fetchTrafficData = async () => {
    const { lat, lng } = coordinates;
    try {
      const response = await axios.post("http://localhost:3000/traffic", {
        lat: lat,
        lng: lng,
      });

      setTrafficD(response.data);
      setDataFetched(true);
    } catch (error) {
      console.error("something failed in Traffic component", error);
    }
  };

  const fetchTrainsData = async () => {
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

  useEffect(() => {
    if (coordinates.lat === 0 && coordinates.lng === 0) return;
    fetchTrainsData();
    console.log(trainsData);
  }, [coordinates]);

  return <></>;
}

export default Traffic;
