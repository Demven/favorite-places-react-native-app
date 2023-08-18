import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import AllPlacesScreen from './screens/AllPlacesScreen';
import AddPlaceScreen from './screens/AddPlaceScreen';
import MapScreen from './screens/MapScreen';
import PlaceDetailsScreen from './screens/PlaceDetailsScreen';
import IconButton from './components/IconButton';
import { initDatabase } from './services/database';
import { Color } from './constants/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => { setDatabaseInitialized(true) });
  }, []);

  if (!databaseInitialized) {
    return <AppLoading />;
  }

  return (
    <View style={styles.app}>
      <StatusBar style='dark' />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Color.primary500 },
            headerTintColor: Color.gray700,
            contentStyle: { backgroundColor: Color.gray700 },
          }}
        >
          <Stack.Screen
            name='AllPlacesScreen'
            component={AllPlacesScreen}
            options={({ navigation }) => ({
              title: 'My Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  iconName='add'
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate('AddPlaceScreen')}
                />
              ),
            })}
          />

          <Stack.Screen
            name='AddPlaceScreen'
            component={AddPlaceScreen}
            options={{
              title: 'Add a Place',
            }}
          />

          <Stack.Screen
            name='MapScreen'
            component={MapScreen}
            options={{
              title: 'Map',
            }}
          />

          <Stack.Screen
            name='PlaceDetailsScreen'
            component={PlaceDetailsScreen}
            options={{
              title: 'Loading a Place...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
