export const handlePlaceSelect = async (
  autocomplete: google.maps.places.Autocomplete | null,
) => {
  if (!autocomplete) {
    console.error("Autocomplete not available");
    return null;
  }
  const place: google.maps.places.PlaceResult = await autocomplete.getPlace();

  if (!place.geometry || !place.geometry.location) return;
  const lat: number = place.geometry.location.lat();
  const lng: number = place.geometry.location.lng();

  const coordinates = { lat: lat, lng: lng };
  return coordinates;
};
