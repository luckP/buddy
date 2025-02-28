// src/App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import RootStack from './src/navigation/RootStack'; // Use the RootStack
import { AuthProvider } from './src/context/AuthContext';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
