import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlaceItem from './PlaceItem';
import { Color } from '../../../constants/colors';

export default function PlacesList ({ places }) {
  const navigation = useNavigation();

  function onSelectPlace (id) {
    return () => {
      navigation.navigate('PlaceDetailsScreen', { id });
    };
  }

  const isEmpty = !places.length;

  return (
    <>
      {isEmpty && (
        <View style={styles.emptyList}>
          <Text style={styles.emptyListText}>
            No places added yet, add the first place.
          </Text>
        </View>
      )}

      {!isEmpty && (
        <FlatList
          style={styles.placesList}
          data={places}
          keyExtractor={place => place.id}
          renderItem={({ item }) => (
            <PlaceItem
              place={item}
              onSelect={onSelectPlace(item.id)}
            />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  placesList: {
    margin: 24,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: Color.primary200,
  },
});
