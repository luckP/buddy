// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack'; // Use the RootStack
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack />
      <Toast />

    </NavigationContainer>
  );
};

export default App;
