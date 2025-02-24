import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './RegisterScreen.style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/NavigationTypes';
import { FIREBASE_AUTH } from '../../../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigationAuth = useNavigation<NavigationProp<AuthStackParamList>>();
  const auth = FIREBASE_AUTH;

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      Alert.alert('Success', 'Account created successfully!');
      navigationAuth.navigate('Login'); // Navigate to login after successful signup
    } catch (error: any) {
      console.error('Firebase Registration Error:', error);
      Alert.alert('Error', firebaseErrorHandler(error.code));
    } finally {
      setLoading(false);
    }
  };

  const firebaseErrorHandler = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      default:
        return 'Registration failed. Please try again.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
        <Text style={styles.registerButtonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigationAuth.navigate('Login')}>
        <Text style={styles.signInText}>Already have an account? Sign In</Text>
      </TouchableOpacity>

      {loading && (
        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa', width: '120%', height: '120%', top: 0, left: 0 }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

export default RegisterScreen;
