import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './ServiceCard.style';

interface ServiceCardProps {
  title: string;
  rating: number;
  category: string;
  price: string;
  times: string[];
  images: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, rating, category, price, times, images }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>{rating} stars</Text>
      </View>
      <Text style={styles.category}>{category} • {price}</Text>

      {/* Images */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          // <Image source={{ uri: item }} style={styles.image} />
          <Image source={require('../../../../assets/images/image1.png') } style={styles.image} />
        )}
      />

      {/* Times */}
      <View style={styles.times}>
        {times.map((time, index) => (
          <TouchableOpacity key={index} style={styles.timeButton}>
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ServiceCard;
