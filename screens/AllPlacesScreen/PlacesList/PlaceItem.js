import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Color } from '../../../constants/colors';

export default function PlaceItem ({ place, onSelect }) {
  const { imageUri, title, address } = place;

  return (
    <Pressable
      style={({ pressed }) => [styles.placeItem, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image
        style={styles.image}
        source={{ uri: imageUri }}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  placeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Color.primary500,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Color.gray700,
  },
  address: {
    fontSize: 12,
    color: Color.gray700,
  },
});
