// src/navigation/RootStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { RootStackParamList } from './NavigationTypes'; // Import RootStack types

const Stack = createStackNavigator<RootStackParamList>(); // Use RootStackParamList for typing

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* AuthStack for login, register, password recovery */}
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      {/* MainTabs for the app after login */}
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootStack;
