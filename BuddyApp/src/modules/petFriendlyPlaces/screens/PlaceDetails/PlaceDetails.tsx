import React from 'react';
import { View, Text } from 'react-native';
import styles from './PlaceDetails.style';

const PlaceDetails = ({ route }: {route: any}) => {
  const { place } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>
    </View>
  );
};

export default PlaceDetails;