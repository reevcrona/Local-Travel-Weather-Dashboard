import { create } from "zustand";
import { TrainDeviation } from "../types/trafficTypes";
import axios from "axios";

type TrainsTrafficStore = {
  trainsTrafficData: TrainDeviation[];
  fetchTrainsTrafficData: (lat: number, lng: number) => Promise<void>;
};

export const useTrainsTrafficStore = create<TrainsTrafficStore>((set) => ({
  trainsTrafficData: [],
  fetchTrainsTrafficData: async (lat: number, lng: number) => {
    try {
      const response = await axios.post<TrainDeviation[]>(
        "http://localhost:3000/trains",
        {
          lat: lat,
          lng: lng,
        },
      );

      set({ trainsTrafficData: response.data });
    } catch (error) {
      console.error("something failed in Traffic component", error);
    }
  },
}));
