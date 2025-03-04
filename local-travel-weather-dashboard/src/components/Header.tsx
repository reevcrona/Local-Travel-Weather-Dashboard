import Autocomplete from "react-google-autocomplete";

function Header() {
  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  return (
    <>
      <Autocomplete
        apiKey={googleApiKey}
        style={{ width: "500px", backgroundColor: "black", color: "white" }}
        onPlaceSelected={(place) => {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          console.log(`Lat: ${lat}   Lng: ${lng}`);
        }}
        options={{
          types: [],
          componentRestrictions: { country: "swe" },
        }}
      />
    </>
  );
}

export default Header;
