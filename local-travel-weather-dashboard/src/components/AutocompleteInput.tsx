import { useEffect, useRef } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { FaSearch } from "react-icons/fa";
const libraries: Libraries = ["places"];
const googleApiKey: string = import.meta.env.VITE_GOOGLE_API_KEY;

function AutocompleteInput() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const options = {
    componentRestrictions: { country: "se" },
    types: ["address"],
    fields: ["geometry", "name", "address_components"],
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (inputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options,
      );
    }

    if (autocompleteRef.current) {
      const autocomplete = autocompleteRef.current;
      autocompleteRef.current.addListener("place_changed", async () => {
        const place = await autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) return;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log(place);
        console.log(lat, lng);
      });
    }
  }, [isLoaded]);
  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="google-input"></label>
      <input
        id="google-input"
        className="w-md bg-black pl-7 text-white placeholder:text-white"
        type="text"
        ref={inputRef}
        placeholder="Search"
      />
      <div className="absolute top-1/2 left-1 -translate-y-1/2 transform">
        <FaSearch color="white" />
      </div>
    </form>
  );
}

export default AutocompleteInput;
