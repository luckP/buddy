import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './LoginScreen.style';
import { AuthStackParamList, RootStackParamList } from '../../navigation/NavigationTypes'; // Use RootStackParamList

const LoginScreen: React.FC = () => {
  const navigationRoot = useNavigation<NavigationProp<RootStackParamList>>();
  const navigationAuth = useNavigation<NavigationProp<AuthStackParamList>>();

  // Handler for login button
  const loginHandler = () => {
    navigationRoot.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }], // Navigate to MainTabs after login
    });
  };

  // Handler for register navigation
  const registerHandler = () => {
    navigationAuth.navigate('Register'); // Navigate to RegisterScreen
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logoBuddy.png')} style={styles.logo} />

      <Text style={styles.heading}>Welcome to Buddy!</Text>
      <Text style={styles.subHeading}>Connect with fellow pet owners and share your experience</Text>

      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#000" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#000" secureTextEntry />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={registerHandler}>
        <Text style={styles.signUpText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../../assets/logoBuddy.png')} style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
