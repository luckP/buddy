import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../../context/AuthContext';
import { AuthStackParamList } from '../../navigation/NavigationTypes';
import styles from './LoginScreen.style';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../../constants/theme';

const LoginScreen: React.FC = () => {
  const navigationAuth = useNavigation<NavigationProp<AuthStackParamList>>();

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    fetch('https://clients3.google.com/generate_204')
      .then(() => console.log("✅ Device has internet"))
      .catch(err => console.log("❌ No internet:", err));
  }, []);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const emailPasswordSignInHandler = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      console.log("✅ Login successful");
    } catch (err: any) {
      console.log("❌ Login error:", err);
      if (err.code === 'auth/user-not-found') {
        Alert.alert('Login Failed', 'No user found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        Alert.alert('Login Failed', 'Incorrect password.');
      } else if (err.code === 'auth/network-request-failed') {
        Alert.alert('Login Failed', 'Network error. Please try again.');
      } else {
        Alert.alert('Login Failed', err.message || 'An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const testRequest = () => {
    fetch('https://clients3.google.com/generate_204')
      .then(() => console.log("✅ Test request successful"))
      .catch(err => console.log("❌ Test request failed:", err));
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/logoBuddy.png')} style={styles.logo} />

      <Text style={styles.heading}>Welcome to Buddy!</Text>
      <Text style={styles.subHeading}>Connect with fellow pet owners and share your experience</Text>

      <TextInput
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.gray}
        keyboardType='email-address'
      />

      <View style={styles.passwordContainer}>
        <TextInput
          onChangeText={setPassword}
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={COLORS.gray}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={testRequest} disabled={loading}>
        <Text style={styles.loginButtonText}>Test</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigationAuth.navigate('PasswordRecovery')}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={emailPasswordSignInHandler} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'LOGIN'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigationAuth.navigate('Register')}>
        <Text style={styles.signUpText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>

      {loading && (
        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa', width: '120%', height: '120%', top: 0, left: 0 }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
