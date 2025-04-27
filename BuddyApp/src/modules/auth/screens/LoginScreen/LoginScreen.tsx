import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../../context/AuthContext';
import { AuthStackParamList } from '../../navigation/NavigationTypes';
import styles from './LoginScreen.style';

import Icon from 'react-native-vector-icons/FontAwesome'; // ✅ Import FontAwesome icons
import { COLORS } from '../../../../constants/theme';

const LoginScreen: React.FC = () => {
  const navigationAuth = useNavigation<NavigationProp<AuthStackParamList>>();
  
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  fetch('https://www.google.com')
    .then(() => console.log("✅ Device has internet"))
    .catch(err => console.log("❌ No internet:", err));

  // Validate Inputs
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Handle Login
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
    }
    catch (err) {
      console.log("Error", JSON.stringify(err));
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/logoBuddy.png')} style={styles.logo} />

      <Text style={styles.heading}>Welcome to Buddy!</Text>
      <Text style={styles.subHeading}>Connect with fellow pet owners and share your experience</Text>

      <TextInput 
        onChangeText={setEmail} 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor={COLORS.white} 
        keyboardType='email-address' 
      />

      {/* ✅ Password Field with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput 
          onChangeText={setPassword} 
          style={styles.passwordInput} 
          placeholder="Password" 
          placeholderTextColor={COLORS.white} 
          secureTextEntry={!passwordVisible} // Toggle visibility
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

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
