import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './PlaceCard.style';

const PlaceCard = ({ place }: { place: any }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{place.name}</Text>
    <Text style={styles.description}>{place.description}</Text>
  </View>
);

export default PlaceCard;