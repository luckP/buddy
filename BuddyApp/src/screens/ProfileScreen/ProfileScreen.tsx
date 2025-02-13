import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ProfileScreen.style';
import UserInfo from './components/UserInfo/UserInfo';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { commonError } from '../../utils/utilsFunctions';

const ProfileScreen: React.FC = () => {
  const navigationRoot = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);


  const handleLogout = async () => {
    try{
      setLoading(true);
      const res = await signOut(FIREBASE_AUTH)
    }
    catch(err){
      console.log('DEBUG ERROR', JSON.stringify(err));
      commonError();
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <UserInfo 
        name="John Doe"
        email="johndoe@example.com"
        image={require('../../assets/logoBuddy.png')} 
      />

      <View style={styles.additionalInfo}>
        <Text style={styles.infoText}>Posts: 120</Text>
        <Text style={styles.infoText}>Followers: 340</Text>
        <Text style={styles.infoText}>Following: 180</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
