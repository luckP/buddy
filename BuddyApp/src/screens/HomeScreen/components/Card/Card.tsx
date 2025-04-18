import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you use FontAwesome
import styles from './Card.style';

interface CardProps {
  title: string;
  description: string;
  image: any;
  icon: string;
  onPress: (page: any) => void;
}

const Card: React.FC<CardProps> = ({ title, description, image, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <ImageBackground source={image} style={styles.cardImage}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Icon name={icon} style={styles.icon} size={24} />
      </ImageBackground>
    </TouchableOpacity>
  );
};




export default Card;
