export default class Place {
  constructor (id, title, imageUri, address, latitude, longitude) {
    this.id = id || new Date().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.latitude = latitude; // e.g. 0.23412
    this.longitude = longitude; // e.g. 127.89212
  }
}
