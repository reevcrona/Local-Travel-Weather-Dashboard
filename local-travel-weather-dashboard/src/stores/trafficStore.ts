import { create } from "zustand";
import { Deviation } from "../types/trafficTypes";
import { useCoordinatesStore } from "./coordinatesStore";
import axios from "axios";

const coordinates = useCoordinatesStore((state) => state.coordinates);
const { lat, lng } = coordinates;

type TrafficStore = {
  trafficData: Deviation[];
  fetchTrafficData: () => Promise<void>;
};

export const useTrafficStore = create<TrafficStore>((set) => ({
  trafficData: [],
  fetchTrafficData: async () => {
    try {
      const response = await axios.post<Deviation[]>(
        "http://localhost:3000/traffic",
        {
          lat: lat,
          lng: lng,
        },
      );

      set({ trafficData: response.data });
    } catch (error) {
      console.error("something failed in Traffic component", error);
    }
  },
}));
