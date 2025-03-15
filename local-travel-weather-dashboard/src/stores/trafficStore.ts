import { create } from "zustand";
import { Deviation } from "../types/trafficTypes";
import axios from "axios";

type TrafficStore = {
  trafficData: Deviation[];
  fetchTrafficData: (lat: number, lng: number) => Promise<void>;
};

export const useTrafficStore = create<TrafficStore>((set) => ({
  trafficData: [],
  fetchTrafficData: async (lat: number, lng: number) => {
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
