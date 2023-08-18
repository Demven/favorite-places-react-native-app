const API_KEY = 'AIzaSyAmH4lGr2jAbKfA1lbNHhW1CAasBEwLkfQ';

export function getMapPreviewUrl (latitude, longitude) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${API_KEY}`;
}

export function getAddress (latitude, longitude) {
  const googleGeocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

  return fetch(googleGeocodingApiUrl)
    .then(response => response.json())
    .then(data => data.results[0]?.formatted_address);
}
