import { useEffect, useState } from 'react';
import {
  ScrollView,
  Image,
  View,
  Text, StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import OutlinedButton from '../../components/OutlinedButton';
import { getPlaceById } from '../../services/database';
import { Color } from '../../constants/colors';

export default function PlaceDetailsScreen () {
  const { params: { id } = {}} = useRoute();
  const navigation = useNavigation();

  const [place, setPlace] = useState();

  useEffect(() => {
    if (id) {
      getPlaceById(id)
        .then(setPlace);
    }
  }, [id]);

  useEffect(() => {
    if (place?.title) {
      navigation.setOptions({
        title: place.title,
      });
    }
  }, [place])

  if (!place) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Loading data...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.placeDetailsScreen}>
        {place?.imageUri && (
          <Image style={styles.image} source={{ uri: place.imageUri }} />
        )}

        <View style={styles.locationContainer}>
          {place?.address && (
            <View style={styles.addressContainer}>
              <Text style={styles.address}>{place.address}</Text>
            </View>
          )}

          <OutlinedButton
            iconName='map'
            onPress={() => navigation.navigate('MapScreen', { latitude: place.latitude, longitude: place.longitude })}
          >
            View on Map
          </OutlinedButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  placeDetailsScreen: {
    alignItems: 'center',
  },
  loading: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Color.primary50,
  },
  image: {
    width: '100%',
    height: '35%',
    minHeight: 300,
  },
  locationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.primary500,
  },
});
