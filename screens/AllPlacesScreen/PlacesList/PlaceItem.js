import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function PlaceItem ({ place, onSelect }) {
  const { imageUri, title, address } = place;

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onSelect}
    >
      <View style={styles.placeItem}>
        <Image source={imageUri} />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  placeItem: {

  },
  pressed: {
    opacity: 0.75,
  },
});
