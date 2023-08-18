import { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import OutlinedButton from '../components/OutlinedButton';
import { Color } from '../constants/colors';

export default function ImagePicker ({ onPickImage }) {
  const [imageSource, setImageSource] = useState('');

  const [cameraPermission, requestPermission] = useCameraPermissions();

  async function verifyPermission () {
    if (cameraPermission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermission?.status === PermissionStatus.DENIED) {
      Alert.alert('Camera access is denied', 'You need to provide access to camera to use this app');
      return false;
    }

    return true;
  }

  async function onTakePhoto () {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImageSource(image?.assets?.[0]?.uri);
    onPickImage(image?.assets?.[0]?.uri);
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {imageSource && (
          <Image
            style={styles.image}
            source={{ uri: imageSource }}
          />
        )}

        {!imageSource && (
          <Text>No photo is taken yet</Text>
        )}
      </View>

      <OutlinedButton
        icon='camera'
        onPress={onTakePhoto}
      >
        Take a Photo
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {},
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
