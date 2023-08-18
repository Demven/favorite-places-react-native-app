import { useLayoutEffect, useState, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import IconButton from '../../components/IconButton';

export default function MapScreen () {
  const { params: { latitude, longitude } = {} } = useRoute();
  const navigation = useNavigation();

  const readOnlyMode = latitude && longitude;

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: latitude || 37.78,
    longitude: longitude || -122.43,
  });

  const onSaveLocation = useCallback(() => {
    if (selectedLocation) {
      navigation.navigate('AddPlaceScreen', {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    } else {
      Alert.alert('No location picked', 'Tap on the map to pick a location');
    }
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (!readOnlyMode) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            iconName='save'
            size={24}
            color={tintColor}
            onPress={onSaveLocation}
          />
        ),
      });
    }
  }, [navigation, onSaveLocation, readOnlyMode]);

  function onSelectPoint (event) {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    })
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={!readOnlyMode && onSelectPoint}
    >
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={selectedLocation}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flexGrow: 1,
  },
});
