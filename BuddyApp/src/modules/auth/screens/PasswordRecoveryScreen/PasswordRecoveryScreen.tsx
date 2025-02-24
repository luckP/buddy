import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './PasswordRecoveryScreen.style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/NavigationTypes';
import { FIREBASE_AUTH } from '../../../../../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const PasswordRecoveryScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigationAuth = useNavigation<NavigationProp<AuthStackParamList>>();
  const auth = FIREBASE_AUTH;

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
      navigationAuth.navigate('Login'); // Redirect back to login
    } catch (error: any) {
      console.error('Password Reset Error:', error);
      Alert.alert('Error', firebaseErrorHandler(error.code));
    } finally {
      setLoading(false);
    }
  };

  const firebaseErrorHandler = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email format.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      default:
        return 'Failed to send password reset email. Please try again.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Password Recovery</Text>
      <Text style={styles.description}>
        Enter your email and we'll send you a link to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset} disabled={loading}>
        <Text style={styles.resetButtonText}>{loading ? 'Sending...' : 'Send Reset Email'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigationAuth.navigate('Login')}>
        <Text style={styles.signInText}>Back to Login</Text>
      </TouchableOpacity>

      {loading && (
        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa', width: '120%', height: '120%', top: 0, left: 0 }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

export default PasswordRecoveryScreen;
