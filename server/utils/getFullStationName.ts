import axios from "axios";
import {
  TrainMessageData,
  TrainStationData,
  TrafikverketTrainStationResponse,
} from "../types/trafikverketResponseType";

const fetchFullStationNames = async (xmlData: string) => {
  const API_URL = "https://api.trafikinfo.trafikverket.se/v2/data.json";
  try {
    const response = await axios.post<TrafikverketTrainStationResponse>(
      API_URL,
      xmlData,
      {
        headers: {
          "Content-Type": "text/xml",
        },
      }
    );
    return response.data.RESPONSE.RESULT[0].TrainStation as TrainStationData[];
  } catch (error) {
    console.error(`Failed fetching station full names ${error}`);
  }
};

export const getFullStationName = (trainsData: TrainMessageData[]) => {
  const stations = new Set(
    trainsData.flatMap((ad: TrainMessageData) => ad.AffectedLocation)
  );
  const filtersArray: string[] = Array.from(stations).map(
    (ab: any) => `<EQ name="LocationSignature" value="${ab}"/>`
  );
  const filtersString: string = filtersArray.join("\n");
  const xmlData: string = `<REQUEST>
  <LOGIN authenticationkey="3be8051bc0a64d63908fdee6cda07086"/>
  <QUERY objecttype="TrainStation" namespace="rail.infrastructure" schemaversion="1.5" >
    <FILTER>
     <OR >
     ${filtersString}
     </OR>
    </FILTER>
  </QUERY>
</REQUEST>`;

  fetchFullStationNames(xmlData).then((apiRes) => {
    const tempObject: any = {};
    if (apiRes) {
      for (const fData of apiRes) {
        tempObject[fData.LocationSignature] = fData.AdvertisedLocationName;
      }
    }

    console.log(apiRes);
  });
};
