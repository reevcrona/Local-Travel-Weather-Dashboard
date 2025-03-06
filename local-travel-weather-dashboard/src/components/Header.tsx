import { useEffect, useRef } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["places"];
const googleApiKey: string = import.meta.env.VITE_GOOGLE_API_KEY;

function Header() {
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
        options
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
    <>
      <input
        style={{ width: "500px", backgroundColor: "black", color: "white" }}
        type="text"
        ref={inputRef}
        placeholder="enter an address"
      />
    </>
  );
}
export default Header;
