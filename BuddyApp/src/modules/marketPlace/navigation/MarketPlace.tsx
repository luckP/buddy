import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MarketPlaceStackParamList } from './NavigationTypes';
import MarketPlaceScreen from '../screen/MarketPlaceScreen/MarketPlaceScreen';
import ExploreScreen from '../screen/ExploreScreen/ExploreScreen';
import { COLORS } from '../../../constants/theme';

const Stack = createStackNavigator<MarketPlaceStackParamList>();

const MarketPlaceStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTitleStyle: { color: COLORS.primary},
      headerTintColor: COLORS.primary,
  }}
    >
      <Stack.Screen
        name="MarketPlace"
        component={ExploreScreen}
        options={{}}
      />
      <Stack.Screen
        name="Store"
        component={MarketPlaceScreen}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default MarketPlaceStack;