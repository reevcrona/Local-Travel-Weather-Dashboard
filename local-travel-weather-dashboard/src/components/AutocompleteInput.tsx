import { useEffect, useRef } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { FaSearch } from "react-icons/fa";
import { handlePlaceSelect } from "../services/googlePlacesService";
import { GoogleOptions } from "../types/autocompleteTypes";
import { useCoordinatesStore } from "../stores/coordinatesStore";
const libraries: Libraries = ["places"];

const googleApiKey: string = import.meta.env.VITE_GOOGLE_API_KEY;
const options: GoogleOptions = {
  componentRestrictions: { country: "se" },
  types: ["address"],
  fields: ["geometry", "name", "address_components"],
};

function AutocompleteInput() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);

  useEffect(() => {
    if (!isLoaded) return;

    if (inputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options,
      );
    }

    if (autocompleteRef.current) {
      const autocomplete: google.maps.places.Autocomplete =
        autocompleteRef.current;
      autocompleteRef.current.addListener("place_changed", async () => {
        handlePlaceSelect(autocomplete).then((cords) => {
          if (cords) {
            setCoordinates(cords);
          }
        });
      });
    }
  }, [isLoaded]);
  return (
    <form
      className="relative w-full max-w-md"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <label htmlFor="google-input"></label>
      <input
        id="google-input"
        className="min-h-10 w-full rounded-3xl bg-black pl-8 text-white placeholder:text-white"
        type="text"
        ref={inputRef}
        placeholder="Sök efter en plats..."
      />
      <div className="absolute top-1/2 left-2 -translate-y-1/2 transform">
        <FaSearch color="white" />
      </div>
    </form>
  );
}

export default AutocompleteInput;
