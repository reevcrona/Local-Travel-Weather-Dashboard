import { create } from "zustand";

type CoordinatesStore = {
  coordinates: { lat: number; lng: number };
  setCoordinates: (cords: { lat: number; lng: number }) => void;
};

export const useCoordinatesStore = create<CoordinatesStore>((set) => ({
  coordinates: { lat: 0, lng: 0 },
  setCoordinates: (cords) =>
    set({ coordinates: { lat: cords.lat, lng: cords.lng } }),
}));
