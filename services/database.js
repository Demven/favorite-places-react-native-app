import { openDatabase } from 'expo-sqlite';
import Place from '../models/place';

const database = openDatabase('places.db');

export function initDatabase () {
  return new Promise((resolve, reject) => {
    database.transaction(transaction => {
      transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          latitude TEXT NOT NULL,
          longitude TEXT NOT NULL
        );
      `,
        [],
        resolve,
        (transaction, error) => { reject(error); }
      );
    });
  });
}

export function savePlace (place) {
  return new Promise((resolve, reject) => {
    database.transaction(transaction => {
      transaction.executeSql(`
        INSERT INTO places 
        (title, imageUri, address, latitude, longitude)
        VALUES (?, ?, ?, ?, ?);
      `,
        [place.title, place.imageUri, place.address, place.latitude, place.longitude],
        (transaction, result) => { resolve(result); },
        (transaction, error) => { reject(error); }
      );
    });
  });
}

export function getAllPlaces () {
  return new Promise((resolve, reject) => {
    database.transaction(transaction => {
      transaction.executeSql(`
        SELECT * FROM places;
      `,
        [],
        (transaction, result) => {
          const places = (result?.rows?._array || []).map(row => new Place(
            row.id,
            row.title,
            row.imageUri,
            row.address,
            row.latitude,
            row.longitude,
          ));

          resolve(places);
        },
        (transaction, error) => { reject(error); }
      );
    });
  });
}

export function getPlaceById (id) {
  return new Promise((resolve, reject) => {
    database.transaction(transaction => {
      transaction.executeSql(`
        SELECT * FROM places WHERE id = ? ;
      `,
        [id],
        (transaction, result) => {
          const row = result?.rows?._array[0];
          const place = new Place(
            row.id,
            row.title,
            row.imageUri,
            row.address,
            row.latitude,
            row.longitude,
          );

          resolve(place);
        },
        (transaction, error) => { reject(error); }
      );
    });
  });
}
