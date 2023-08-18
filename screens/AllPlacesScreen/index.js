import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getAllPlaces } from '../../services/database';
import PlacesList from './PlacesList';

export default function AllPlacesScreen () {
  const isFocused = useIsFocused();

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getAllPlaces()
        .then(setPlaces);
    }
  }, [isFocused]);

  return (
    <PlacesList places={places}/>
  );
}
