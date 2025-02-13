// src/App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import RootStack from './src/navigation/RootStack'; // Use the RootStack

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <RootStack />
      <Toast />

    </NavigationContainer>
  );
};

export default App;
