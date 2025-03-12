export const handlePlaceSelect = async (
  autocomplete: google.maps.places.Autocomplete | null,
) => {
  if (!autocomplete) {
    console.error("Autocomplete not available");
    return;
  }
  const place: google.maps.places.PlaceResult = await autocomplete.getPlace();

  if (!place.geometry || !place.geometry.location) return;
  const lat: number = place.geometry.location.lat();
  const lng: number = place.geometry.location.lng();
  console.log(place);
  console.log(lat, lng);
};
