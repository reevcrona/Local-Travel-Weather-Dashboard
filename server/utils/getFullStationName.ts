import axios from "axios";
import {
  TrainMessageData,
  TrainStationData,
  TrafikverketTrainStationResponse,
} from "../types/trafikverketResponseType";
import { formatTimeProperty } from "./filterAndFormatTrafficData.js";

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

export const getFullStationName = async (trainsData: TrainMessageData[]) => {
  const stations = new Set(
    trainsData.flatMap((ab: TrainMessageData) => ab.AffectedLocation)
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

  const apiRes = await fetchFullStationNames(xmlData);
  const locationMap: Record<string, string> = {};
  if (apiRes) {
    for (const fData of apiRes) {
      locationMap[fData.LocationSignature] = fData.AdvertisedLocationName;
    }
  }

  const updatedTrainsData = trainsData.map((train) => {
    const updatedTrain = {
      LocationDescriptor: train.ExternalDescription,
      AffectedLocations: train.AffectedLocation.map((location) => {
        return locationMap[location] || location;
      }),
      StartTime: formatTimeProperty(train.StartDateTime),
      VersionTime: formatTimeProperty(train.ModifiedTime),
      MessageCode: train.ReasonCodeText,
      UpdateType: "Train",
    };

    return updatedTrain;
  });
  updatedTrainsData.sort(
    (a, b) =>
      new Date(b.VersionTime).getTime() - new Date(a.VersionTime).getTime()
  );
  return updatedTrainsData;
};
