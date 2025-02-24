import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './LoginScreen.style';
import { RootStackParamList } from '../../../../navigation/NavigationTypes'; // Use RootStackParamList
import { AuthStackParamList } from '../../navigation/NavigationTypes';
import { FIREBASE_AUTH } from '../../../../../FirebaseConfig';
import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth';
import { commonError } from '../../../../utils/utilsFunctions';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import firebaseAuth from '@react-native-firebase/auth';


// GoogleSignin.configure({
//   webClientId: '',
// });


const LoginScreen: React.FC = () => {
  const navigationRoot = useNavigation<NavigationProp<RootStackParamList>>();
  const navigationAuth = useNavigation<NavigationProp<AuthStackParamList>>();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const auth = FIREBASE_AUTH;

  // Handler for login button
  const emailPasswordSingInHandler = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('DEBUG emailPasswordSingInHandler', res);
    }
    catch (err) {
      console.log('DEBUG ERROR', JSON.stringify(err));
      singInErrorHandler(err);
    }
    finally {
      setLoading(false);
    }
  };

  const googleSingInHandler = async () => {
    setLoading(true);
    try {
      // Check if your device supports Google Play
      // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // // Get the users ID token
      // const signInResult: any = await GoogleSignin.signIn();

      // // Try the new style of google-sign in result, from v13+ of that module
      // let idToken = signInResult.data?.idToken;
      // if (!idToken) {
      //   // if you are using older versions of google-signin, try old style result
      //   idToken = signInResult.idToken;
      // }
      // if (!idToken) {
      //   throw new Error('No ID token found');
      // }

      // // Create a Google credential with the token
      // const googleCredential = firebaseAuth.GoogleAuthProvider.credential(signInResult.data.idToken);

      // // Sign-in the user with the credential
      // firebaseAuth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log('DEBUG', JSON.stringify(err));
      commonError();
    }
    finally {
      setLoading(false);
    }
  }

  const singInErrorHandler = (error: any) => {
    const { code, name } = error;

    if (name != 'FirebaseError') {
      return commonError();
    }

    switch (code) {
      case AuthErrorCodes.INVALID_EMAIL: setShowError(true); break;
      case AuthErrorCodes.INVALID_APP_CREDENTIAL: setShowError(true); break;
      case AuthErrorCodes.INVALID_IDP_RESPONSE: setShowError(true); break;
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS: setShowError(true); break;
      default: commonError();

    }
  }

  const setInput = (value: string, setField: Dispatch<SetStateAction<string>>) => {
    if (showError) {
      setShowError(false);
    }

    return setField(value);
  }

  // Password recovery navigation
  const passwordRecoveryHandler = () => {
    navigationAuth.navigate('PasswordRecovery');
  }

  // Handler for register navigation
  const registerHandler = () => {
    navigationAuth.navigate('Register');
  };

  return (
    <View style={styles.container}>

      {/* <Image source={require('../../assets/logoBuddy.png')} style={styles.logo} /> */}
      <Image source={require('../../../../assets/logoBuddy.png')} style={styles.logo} />

      <Text style={styles.heading}>Welcome to Buddy!</Text>
      <Text style={styles.subHeading}>Connect with fellow pet owners and share your experience</Text>

      <TextInput onChangeText={(value) => setInput(value, setEmail)} style={styles.input} placeholder="Email" placeholderTextColor="#000" keyboardType='email-address' />
      <TextInput onChangeText={(value) => setInput(value, setPassword)} style={styles.input} placeholder="Password" placeholderTextColor="#000" secureTextEntry />

      {showError && <Text style={{ color: 'red' }}>Check your email or password</Text>}

      <TouchableOpacity onPress={passwordRecoveryHandler}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={emailPasswordSingInHandler}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={registerHandler}>
        <Text style={styles.signUpText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
      {/*
      <TouchableOpacity style={styles.googleButton} onPress={googleSingInHandler}>
        <Image source={require('../../../../assets/logoBuddy.png')} style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
      */}

      {/* LOADING CONTAINER */}
      {loading && <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa', width: '120%', height: '120%', top: 0, left: 0 }}>
        <ActivityIndicator />
      </View>}
    </View>
  );
};

export default LoginScreen;
