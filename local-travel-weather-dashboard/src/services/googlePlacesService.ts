export const handlePlaceSelect = async (
  autocomplete: google.maps.places.Autocomplete | null,
) => {
  if (!autocomplete) {
    console.error("Autocomplete not available");
    return;
  }
  const place = await autocomplete.getPlace();

  if (!place.geometry || !place.geometry.location) return;
  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();
  console.log(place);
  console.log(lat, lng);
};
