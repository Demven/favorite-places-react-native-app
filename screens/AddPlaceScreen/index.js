import { useNavigation } from '@react-navigation/native';
import { savePlace } from '../../services/database';
import { sendNotification } from '../../services/notifications';
import PlacesForm from './PlaceForm';

export default function AddPlaceScreen () {
  const navigation = useNavigation();

  function onCreatePlace (place) {
    savePlace(place)
      .then(place => sendNotification(place))
      .then(() => navigation.navigate('AllPlacesScreen'));
  }

  return (
    <PlacesForm
      onCreatePlace={onCreatePlace}
    />
  );
}
