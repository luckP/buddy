import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './UserInfo.style';

interface UserInfoProps {
  name: string;
  email: string;
  image: any;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, email, image }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.profileImage} />
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
    </View>
  );
};

export default UserInfo;
