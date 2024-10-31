import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainMenuStackParamList } from './NavigationTypes';
import SocialNetworkScreen from '../screens/SocialNetworkScreen/SocialNetworkScreen';
import VirtualConsultationsScreen from '../screens/VirtualConsultationsScreen/VirtualConsultationsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LostAndFoundScreen from '../screens/LostAndFoundScreen/LostAndFoundScreen';
import LostFoundPetScreen from '../screens/LostFoundPetScreen/LostFoundPetScreen';
import AdoptionPlatformScreen from '../screens/AdoptionPlatformScreen/AdoptionPlatformScreen';
import PetFriendlyPlacesScreen from '../screens/PetFriendlyPlacesScreen/PetFriendlyPlacesScreen';
import PhotoContentCreationScreen from '../screens/PhotoContentCreationScreen/PhotoContentCreationScreen';
import MarketPlaceScreen from '../screens/MarketPlaceScreen/MarketPlaceScreen';

const Stack = createStackNavigator<MainMenuStackParamList>();

const MainMenuStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SocialNetworkScreen" component={SocialNetworkScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VirtualConsultations" component={VirtualConsultationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LostFoundPetScreen" component={LostFoundPetScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AdoptionPlatformScreen" component={AdoptionPlatformScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LostAndFoundScreen" component={LostAndFoundScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PetFriendlyPlacesScreen" component={PetFriendlyPlacesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PhotoContentCreationScreen" component={PhotoContentCreationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MarketPlaceScreen" component={MarketPlaceScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainMenuStack;
