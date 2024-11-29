// src/navigation/RootStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from '../modules/auth/navigation/AuthStack';
import Menu from './MainTabs';
import SocialMediaStack from '../modules/socialMedia/navigation/SocialMediaStack';
import { RootStackParamList } from './NavigationTypes'; // Import RootStack types
import LostAndFoundPetLocatorStack from '../modules/lostAndFoundPetLocator/navigation/LostAndFoundPetLocator';

const Stack = createStackNavigator<RootStackParamList>(); // Use RootStackParamList for typing

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* AuthStack for login, register, password recovery */}
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      {/* Menu for the app after login */}
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
       {/*Social media  */}
      <Stack.Screen name="SocialMedia" component={SocialMediaStack} options={{ headerShown: false }} />
      {/*Lost And Found Pet Locator */}
      <Stack.Screen name="LostPets" component={LostAndFoundPetLocatorStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootStack;
