import React, { useState} from "react";
import axios from "axios";
import "./traveling.css";


const Traveling = () => {
    const [log, setLOG] = useState<string>("");

    const fetchDepartureBoards = async () => {
        try {
            const response = await axios.get<any>("http://localhost:3000/fetch-data");
            setLOG(JSON.stringify(response.data, null, 2));
            console.log("Data fetched successfully:", response.data);
        }catch (error: any) {
            if (error.response) {
                setLOG(
                    `Error: ${Error}, Status code: ${error.response.status}`
                );
                console.error("response error:", error.response);
            } else if (error.request) {
                setLOG("Error: No response recived from the server");
                console.error("request error", error.request);
            } else {
                setLOG(`Error ${error.message}`);
                console.error("Error", error.message);
            }
        }
    }
}
