import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './FriendsScreen.style';

type Friend = {
    id: string;
    name: string;
    image: any; // You can refine this type further to the correct image type
  };

const friendsData: Friend[] = [
  { id: '1', name: 'Miguel Moreira', image: require('../../assets/images/image1.png') },
  { id: '2', name: 'Luis Silva', image: require('../../assets/images/image2.png') },
  // Add more friends here...
];

const FriendsScreen: React.FC = () => {
  const renderFriendItem = ({ item }: { item: Friend }) => (
    <View style={styles.friendItem}>
      <Image source={item.image} style={styles.friendImage} />
      <Text style={styles.friendName}>{item.name}</Text>
      <TouchableOpacity style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={friendsData}
        keyExtractor={(item) => item.id}
        renderItem={renderFriendItem}
      />
    </View>
  );
};

export default FriendsScreen;
