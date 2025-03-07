import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PetFriendlyPlacesStackParamList } from './NavigationTypes';
import PlacesList from '../screens/PlacesList/PlacesList';
import PlaceDetails from '../screens/PlaceDetails/PlaceDetails';
import { COLORS } from '../../../constants/theme';

const Stack = createStackNavigator<PetFriendlyPlacesStackParamList>();

const PetFriendlyPlacesStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTitleStyle: { color: COLORS.primary},
      headerTintColor: COLORS.primary,
  }}
    >
      <Stack.Screen
        name="PlacesList"
        component={PlacesList}
        options={{ headerTitle: 'Pet-Friendly Places' }}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetails}
        options={{ headerTitle: 'Place Details' }}
      />
    </Stack.Navigator>
  );
};

export default PetFriendlyPlacesStack;