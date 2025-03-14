import { useEffect, useState } from "react";
import axios from "axios";
import { useCoordinatesStore } from "../stores/coordinatesStore";

function Traffic() {
  const [trafficD, setTrafficD] = useState<any>("");
  const [dataFetched, setDataFetched] = useState(false);

  const coordinates = useCoordinatesStore((state) => state.coordinates);

  const fetchTrafficData = async () => {
    const { lat, lng } = coordinates;
    try {
      const response = await axios.post("http://localhost:3000/situation", {
        lat: lat,
        lng: lng,
      });

      setTrafficD(response.data.RESPONSE.RESULT[0].Situation);
      setDataFetched(true);
    } catch (error) {
      console.error("something failed in Traffic component", error);
    }
  };

  useEffect(() => {
    if (coordinates.lat === 0 && coordinates.lng === 0) return;

    fetchTrafficData();
    if (dataFetched) {
      console.log(trafficD);
    }
    console.log(trafficD);
    console.log(coordinates);
  }, [coordinates]);

  const renderIds = () => {
    return trafficD.map((item: any, key: any) => (
      <p key={item.Id}>{item.Id}</p>
    ));
  };

  return <></>;
}

export default Traffic;
