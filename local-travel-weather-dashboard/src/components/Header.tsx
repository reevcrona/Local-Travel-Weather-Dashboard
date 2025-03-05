import { usePlacesWidget } from "react-google-autocomplete";
import { useRef } from "react";

function Header() {
  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const hasPlaceSelected = useRef(false); // Create a ref to track if the function has been called
  const previousPlace = useRef(null);
  const { ref } = usePlacesWidget({
    apiKey: googleApiKey,
    onPlaceSelected: (place) => {
      if (
        !place ||
        hasPlaceSelected.current ||
        !place.geometry ||
        previousPlace === place
      ) {
        if (ref.current) {
          ref.current.value = "";
        }
        return;
      } // Return early if the function has already been called
      hasPlaceSelected.current = true; // Set the flag to true

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log(place);
        console.log(lat, lng);
      }
      previousPlace.current = place;
      if (ref.current) {
        ref.current.value = "";
      }

      // Reset the flag after a short delay to allow the function to be called again
      setTimeout(() => {
        hasPlaceSelected.current = false;
      }, 200);
    },
    options: {
      types: [],
      componentRestrictions: { country: "swe" },
    },
  });

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input ref={ref} type="text" style={{ width: "500px" }}></input>
      </form>
    </>
  );
}

export default Header;
