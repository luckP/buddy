import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import styles from './GalleryCard.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AiImage } from '../../../../models/AiImage';

interface GalleryCardProps {
  image: AiImage;
}

const DOUBLE_PRESS_DELAY = 300; // 300ms for double tap

const GalleryCard: React.FC<GalleryCardProps> = ({ image }) => {
  const [favorite, setFavorite] = useState(image.isFavorite);
  const lastTap = useRef<number | null>(null);

  const handleCardPress = (_: GestureResponderEvent) => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected
      const isFavorite = !favorite;
      setFavorite(isFavorite);
      image.isFavorite = isFavorite;
    } else {
      lastTap.current = now;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={{ uri: image.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{image.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{image.description}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.likes}>{image.likes} likes</Text>
          <Icon name={favorite ? "heart" : "heart-o"} size={18} color={favorite ? "red" : "#ccc"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GalleryCard;
