// src/navigation/RootStack.tsx
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from '../modules/auth/navigation/AuthStack';
import Menu from './MainTabs';
import SocialMediaStack from '../modules/socialMedia/navigation/SocialMediaStack';
import { RootStackParamList } from './NavigationTypes'; // Import RootStack types
import LostAndFoundPetLocatorStack from '../modules/lostAndFoundPetLocator/navigation/LostAndFoundPetLocator';
import ChatBotStack from '../modules/chatBot/navigation/ChatBotNavigator';
import PetFriendlyPlacesStack from '../modules/petFriendlyPlaces/navigation/PetFriendlyPlaces';
import MarketPlaceScreen from '../modules/marketPlace/screen/MarketPlaceScreen/MarketPlaceScreen';
import MarketPlaceStack from '../modules/marketPlace/navigation/MarketPlace';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const Stack = createStackNavigator<RootStackParamList>(); // Use RootStackParamList for typing

const RootStack: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => onAuthStateChanged(FIREBASE_AUTH, (user) => setUser(user)), [])


  return (
    <Stack.Navigator>
      {/* AuthStack for login, register, password recovery */}
      {!user ? (
        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      ) : (
        <>
        {/* Menu for the app after login */}
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        {/*Social media  */}
        <Stack.Screen name="SocialMedia" component={SocialMediaStack} options={{ headerShown: false }} />
        {/*Lost And Found Pet Locator */}
        <Stack.Screen name="LostPets" component={LostAndFoundPetLocatorStack} options={{ headerShown: false }} />
        {/*ChatBot*/}
        <Stack.Screen name="ChatBot" component={ChatBotStack} options={{ headerShown: false }} />
        {/*PetfriendlyPlaces*/}
        <Stack.Screen name="PetfriendlyPlaces" component={PetFriendlyPlacesStack} options={{ headerShown: false }} />
        {/*PetfriendlyPlaces*/}
        <Stack.Screen name="MarketPlace" component={MarketPlaceStack} options={{ headerShown: false }} />
        </>
      )}
      
      
    </Stack.Navigator>
  );
};

export default RootStack;
