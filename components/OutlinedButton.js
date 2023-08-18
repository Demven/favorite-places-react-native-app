import { Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../constants/colors';

export default function OutlinedButton ({ children, iconName, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.outlinedButton, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={iconName}
        size={18}
        color={Color.primary500}
      />

      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outlinedButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Color.primary500,
  },
});
