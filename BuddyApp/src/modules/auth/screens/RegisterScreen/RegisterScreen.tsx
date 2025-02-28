import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styles from './RegisterScreen.style';
import { AuthStackParamList } from '../../navigation/NavigationTypes';
import { useAuth } from '../../../../context/AuthContext';

import Icon from 'react-native-vector-icons/FontAwesome'; // ✅ Import FontAwesome icons

const RegisterScreen: React.FC = () => {
  const { register } = useAuth(); // ✅ Use AuthContext instead of calling Firebase directly
  const navigationAuth = useNavigation<NavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // ✅ Toggle state for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // ✅ Toggle state for confirm password visibility
  const [loading, setLoading] = useState(false);

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
      await register(email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigationAuth.navigate('Login'); // Navigate to login after successful signup
    } finally {
      setLoading(false);
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

      {/* ✅ Password Field with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          onChangeText={setPassword}
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry={!passwordVisible} // Toggle visibility
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* ✅ Confirm Password Field with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          onChangeText={setConfirmPassword}
          style={styles.passwordInput}
          placeholder="Confirm Password"
          placeholderTextColor="#000"
          secureTextEntry={!confirmPasswordVisible} // Toggle visibility
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
          <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

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
