import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { TrafikverketResponse } from "./types/trafikVerketResponseType";
import { filterAndFormatTrafficData } from "./utils/filterAndFormatTrafficData.js";

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

app.post("/situation", (req, res) => {
  const { lat, lng } = req.body;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const dynamicDate = `${year}-${month}-${day}T00:00:00`;
  const xmlData = `
<REQUEST>
    <LOGIN authenticationkey="${TRAFIKVERKET_API_KEY}"/>
    <QUERY objecttype="Situation" schemaversion="1.5" limit="50">
        <FILTER>
            <NEAR name="Deviation.Geometry.Point.WGS84" value="${lng} ${lat}" />
            <GT name="Deviation.CreationTime" value="${dynamicDate}"/>
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
      const formattedData = filterAndFormatTrafficData(situations);
      res.json(situations);
    })
    .catch((error) => {
      console.error("Failed to retrive data", error);
      res.status(500).send("Failed to fetch data");
    });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
