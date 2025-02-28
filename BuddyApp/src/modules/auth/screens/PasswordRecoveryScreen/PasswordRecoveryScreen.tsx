import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './PasswordRecoveryScreen.style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/NavigationTypes';
import { useAuth } from '../../../../context/AuthContext';

const PasswordRecoveryScreen: React.FC = () => {
  const { resetPassword } = useAuth(); // ✅ Use AuthContext for password reset
  const navigationAuth = useNavigation<NavigationProp<AuthStackParamList>>();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
      navigationAuth.navigate('Login'); // Redirect back to login
    } finally {
      setLoading(false);
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
