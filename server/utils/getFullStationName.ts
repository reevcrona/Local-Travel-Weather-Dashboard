import axios from "axios";

const fetchFullStationNames = async (xmlData: any) => {
  const API_URL = "https://api.trafikinfo.trafikverket.se/v2/data.json";
  try {
    const response = await axios.post(API_URL, xmlData, {
      headers: {
        "Content-Type": "text/xml",
      },
    });
    return response.data.RESPONSE.RESULT[0].TrainStation;
  } catch (error) {
    console.error(`Failed fetching station full names ${error}`);
  }
};

export const getFullStationName = (trainsData: any) => {
  const stations = new Set(
    trainsData.flatMap((ad: any) => ad.AffectedLocation)
  );
  const filtersArray = Array.from(stations).map(
    (ab: any) => `<EQ name="LocationSignature" value="${ab}"/>`
  );
  const filtersString = filtersArray.join("\n");
  const xmlData = `<REQUEST>
  <LOGIN authenticationkey="3be8051bc0a64d63908fdee6cda07086"/>
  <QUERY objecttype="TrainStation" namespace="rail.infrastructure" schemaversion="1.5" >
    <FILTER>
     <OR >
     ${filtersString}
     </OR>
    </FILTER>
  </QUERY>
</REQUEST>`;

  fetchFullStationNames(xmlData).then((apiRes: any) => {
    const tempObject: any = {};

    for (const fData of apiRes) {
      tempObject[fData.LocationSignature] = fData.AdvertisedLocationName;
    }
    console.log(tempObject);
  });
};
