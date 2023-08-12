import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlacesScreen from './screens/AllPlacesScreen';
import AddPlaceScreen from './screens/AddPlaceScreen';
import IconButton from './components/IconButton';
import { Color } from './constants/colors';

const Stack = createNativeStackNavigator();

export default function App() {
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
              title: 'All Places',
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
