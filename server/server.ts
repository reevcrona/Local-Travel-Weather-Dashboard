import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

import {
  TrafikverketResponse,
  TrafikverketTrainMessageResponse,
} from "./types/trafikverketResponseType";
import {
  filterAndFormatTrafficData,
  sortFilterdDeviations,
} from "./utils/filterAndFormatTrafficData.js";
import { getFullStationName } from "./utils/getFullStationName.js";
const app = express();
const port = 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());
dotenv.config();

const TRAFIKVERKET_API_KEY = process.env.TRAFIKVERKET_API_KEY;

const API_URL = "https://api.trafikinfo.trafikverket.se/v2/data.json";

app.post("/traffic", (req, res) => {
  const { lat, lng } = req.body;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const dynamicDate = `${year}-${month}-${day}T00:00:00`;
  const firstMonth = `${year}-${month}-1T00:00:00`;
  const xmlData = `
<REQUEST>
    <LOGIN authenticationkey="${TRAFIKVERKET_API_KEY}"/>
    <QUERY objecttype="Situation" schemaversion="1.5" limit="20">
        <FILTER>
            <NEAR name="Deviation.Geometry.Point.WGS84" value="${lng} ${lat}"/>
            
            <GT name="Deviation.CreationTime" value="${firstMonth}"/>
            
            
            <NE name="Deviation.SeverityText" value="Ingen påverkan" />
        </FILTER>
    </QUERY>
</REQUEST>
`;

  axios
    .post<TrafikverketResponse>(API_URL, xmlData, {
      headers: {
        "Content-Type": "text/xml",
      },
    })
    .then((response) => {
      const situations = response.data.RESPONSE.RESULT[0].Situation;
      const sortedData = sortFilterdDeviations(
        filterAndFormatTrafficData(situations)
      );

      res.json(sortedData);
    })
    .catch((error) => {
      console.error("Failed to retrive data", error);
      res.status(500).send("Failed to fetch data");
    });
});

app.post("/trains", (req, res) => {
  const { lat, lng } = req.body;
  const xmlData = `
  <REQUEST>
    <LOGIN authenticationkey="${TRAFIKVERKET_API_KEY}"/>
    <QUERY objecttype="TrainMessage" schemaversion="1" limit="10">
      <FILTER>
          <NEAR name="Geometry.WGS84" value="${lng} ${lat}" />
      </FILTER>
    </QUERY>
  </REQUEST>
  `;

  axios
    .post<TrafikverketTrainMessageResponse>(API_URL, xmlData, {
      headers: {
        "Content-Type": "text/xml",
      },
    })
    .then((response) => {
      const data = response.data.RESPONSE.RESULT[0].TrainMessage;
      getFullStationName(data)
        .then((updatedData) => res.json(updatedData))
        .catch((error) => {
          console.log("Error fetching updated station names", error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
