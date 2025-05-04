import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext'; // ✅ import your context
import AuthStack from '../modules/auth/navigation/AuthStack';
import Menu from './MainTabs';
import SocialMediaStack from '../modules/socialMedia/navigation/SocialMediaStack';
import LostAndFoundPetLocatorStack from '../modules/lostAndFoundPetLocator/navigation/LostAndFoundPetLocator';
import ChatBotStack from '../modules/chatBot/navigation/ChatBotNavigator';
import PetFriendlyPlacesStack from '../modules/petFriendlyPlaces/navigation/PetFriendlyPlaces';
import MarketPlaceStack from '../modules/marketPlace/navigation/MarketPlace';
import { RootStackParamList } from './NavigationTypes';
import { ActivityIndicator, View } from 'react-native';
import AiImageNavigator from '../modules/aiImageGenerator/navigation/AiImageNavigator';
import HealthAndWellbeingNavigator from '../modules/healthAndWellbeing/navigation/HealthAndWellbeingNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="SocialMedia" component={SocialMediaStack} options={{ headerShown: false }} />
          <Stack.Screen name="LostPets" component={LostAndFoundPetLocatorStack} options={{ headerShown: false }} />
          <Stack.Screen name="ChatBot" component={ChatBotStack} options={{ headerShown: false }} />
          <Stack.Screen name="PetfriendlyPlaces" component={PetFriendlyPlacesStack} options={{ headerShown: false }} />
          <Stack.Screen name="MarketPlace" component={MarketPlaceStack} options={{ headerShown: false }} />
          <Stack.Screen name="AiImageGenerator" component={AiImageNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="HealthAndWellbeing" component={HealthAndWellbeingNavigator} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
