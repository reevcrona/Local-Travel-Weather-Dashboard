import { create } from "zustand";
import { TrafficData, Deviation } from "../types/trafficTypes";
import { TrainDeviation } from "../types/trafficTypes";
import axios from "axios";

type CombinedTrafficStore = {
  trafficData: Deviation[];
  ferryData: Deviation[];
  trainsData: TrainDeviation[];
  hasFetched: boolean;
  fetchAllTrafficData: (lat: number, lng: number) => Promise<void>;
};

export const useCombinedTrafficStore = create<CombinedTrafficStore>((set) => ({
  trafficData: [],
  trainsData: [],
  ferryData: [],
  hasFetched: false,
  fetchAllTrafficData: async (lat: number, lng: number) => {
    try {
      const [trafficResponse, trainResponse] = await Promise.all([
        axios.post<TrafficData>("http://localhost:3000/traffic", { lat, lng }),
        axios.post<TrainDeviation[]>("http://localhost:3000/trains", {
          lat,
          lng,
        }),
      ]);

      set({
        trafficData: trafficResponse.data.Road,
        ferryData: trafficResponse.data.Ferry,
        trainsData: trainResponse.data,
        hasFetched: true,
      });
    } catch (error) {
      console.error("Failed to fetch all traffic data", error);
    }
  },
}));
