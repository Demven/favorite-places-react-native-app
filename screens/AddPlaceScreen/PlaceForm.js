import { useState } from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import ImagePicker from '../../components/ImagePicker';
import LocationPicker from '../../components/LocationPicker';
import Button from '../../components/Button';
import { getAddress } from '../../services/location';
import { Color } from '../../constants/colors';
import Place from '../../models/place';

export default function PlaceForm ({ onCreatePlace }) {
  const [title, setTitle] = useState();
  const [pickedImageUri, setPickedImageUri] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function onSavePlace () {
    if (pickedLocation?.latitude && pickedLocation?.longitude) {
      getAddress(pickedLocation.latitude, pickedLocation.longitude)
        .then(address => {
          const place = new Place(
            undefined,
            title,
            pickedImageUri,
            address,
            pickedLocation.latitude,
            pickedLocation.longitude,
          );

          onCreatePlace(place);
        })
        .catch(() => {
          Alert.alert('Failed to geocode the address');
        })
    }
  }

  return (
    <ScrollView style={styles.placeForm}>
      <View>
        <Text style={styles.label}>Place Form</Text>

        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <ImagePicker onPickImage={setPickedImageUri} />

      <LocationPicker onPickLocation={setPickedLocation} />

      <Button onPress={onSavePlace}>
        Add Place
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  placeForm: {
    flexGrow: 1,
    padding: 24,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: Color.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Color.primary700,
    borderBottomWidth: 2,
    backgroundColor: Color.primary100,
  },
});
