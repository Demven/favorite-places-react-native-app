import { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import OutlinedButton from './OutlinedButton';
import { getMapPreviewUrl } from '../services/location';
import { Color } from '../constants/colors';

export default function LocationPicker ({ onPickLocation }) {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const componentIsFocused = useIsFocused();

  const [locationPermission, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    if (componentIsFocused && route.params?.latitude && route.params?.longitude) {
      setLatitude(route.params.latitude);
      setLongitude(route.params.longitude);
    }
  }, [route?.params, componentIsFocused]);

  useEffect(() => {
    if (latitude && longitude) {
      onPickLocation({
        latitude,
        longitude,
      });
    }
  }, [latitude, longitude, onPickLocation])

  async function verifyPermission () {
    if (locationPermission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermission?.status === PermissionStatus.DENIED) {
      Alert.alert('Location access is denied', 'You need to grant location permission to use this app');
      return false;
    }

    return true;
  }

  async function locateUser () {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setLatitude(location?.coords?.latitude);
    setLongitude(location?.coords?.longitude);
  }

  function pickOnMap () {
    navigation.navigate('MapScreen');
  }

  const locationIsPicked = latitude && longitude;

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {locationIsPicked && (
          <Image
            style={styles.mapPreviewImage}
            source={{ uri: getMapPreviewUrl(latitude, longitude) }}
          />
        )}

        {!locationIsPicked && (
          <Text>No location picked yet</Text>
        )}
      </View>

      <View style={styles.buttons}>
        <OutlinedButton
          iconName='location'
          onPress={locateUser}
        >
          Locate User
        </OutlinedButton>

        <OutlinedButton
          iconName='map'
          onPress={pickOnMap}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationPicker: {},
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
