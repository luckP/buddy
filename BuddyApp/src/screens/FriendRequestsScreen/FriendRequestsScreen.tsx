import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './FriendRequestsScreen.style';

interface RequestData {
    id: string;
    name: string;
    image: any
}

const requestsData: RequestData [] = [
  { id: '1', name: 'Jose Costa', image: require('../../assets/jose.jpg') },
  { id: '2', name: 'Pedro Teixeira', image: require('../../assets/pedro.jpg') },
  // Add more friend requests here...
];

const FriendRequestsScreen: React.FC = () => {
  const renderRequestItem = ({ item }: {item: RequestData}) => (
    <View style={styles.requestItem}>
      <Image source={item.image} style={styles.requestImage} />
      <Text style={styles.requestName}>{item.name}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requestsData}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
      />
    </View>
  );
};

export default FriendRequestsScreen;
