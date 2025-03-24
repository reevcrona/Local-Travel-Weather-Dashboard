var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { formatTimeProperty } from "./filterAndFormatTrafficData.js";
const fetchFullStationNames = (xmlData) => __awaiter(void 0, void 0, void 0, function* () {
    const API_URL = "https://api.trafikinfo.trafikverket.se/v2/data.json";
    try {
        const response = yield axios.post(API_URL, xmlData, {
            headers: {
                "Content-Type": "text/xml",
            },
        });
        return response.data.RESPONSE.RESULT[0].TrainStation;
    }
    catch (error) {
        console.error(`Failed fetching station full names ${error}`);
    }
});
export const getFullStationName = (trainsData) => __awaiter(void 0, void 0, void 0, function* () {
    const stations = new Set(trainsData.flatMap((ad) => ad.AffectedLocation));
    const filtersArray = Array.from(stations).map((ab) => `<EQ name="LocationSignature" value="${ab}"/>`);
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
    const apiRes = yield fetchFullStationNames(xmlData);
    const locationMap = {};
    if (apiRes) {
        for (const fData of apiRes) {
            locationMap[fData.LocationSignature] = fData.AdvertisedLocationName;
        }
    }
    const updatedTrainsData = trainsData.map((train) => {
        const updatedTrain = {
            ExternalDescription: train.ExternalDescription,
            AffectedLocations: train.AffectedLocation.map((location) => {
                return locationMap[location] || location;
            }),
            StartDateTime: formatTimeProperty(train.StartDateTime),
            VersionTime: formatTimeProperty(train.ModifiedTime),
            ReasonCodeText: train.ReasonCodeText,
            UpdateType: "Train",
        };
        return updatedTrain;
    });
    return updatedTrainsData;
});
