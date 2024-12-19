import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ServiceCard.style';
import Toast from 'react-native-toast-message';
import ServiceCardProps from '../../../../../../models/ServiceCardProps';
import { COLORS } from '../../../../../../constants/theme';



// Example of using local images
const ServiceCard: React.FC<ServiceCardProps> = ({ title, rating, category, price, times, liked }) => {
  // Example local images
  const localImages = [
    require('../../../../../../assets/images/image1.png'),
    require('../../../../../../assets/images/image2.png'),
  ];

  const [likedCard, setLikedCard] = React.useState(liked);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const likeCardHandler = () => {
    setLikedCard(!likedCard);
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is a toast message 👋',
      position: 'bottom',
    });


  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={12} color={COLORS.primary} />
            <Text style={styles.rating}> {rating} stars
            
            <Text style={styles.category}>. {category} • {price}</Text>
            </Text>
            
          </View>
        </View>
        <TouchableOpacity style={styles.likeButton} onPress={likeCardHandler}>
            <Icon name="heart" size={18} color={ likedCard ? COLORS.primary : COLORS.inactive} />
        </TouchableOpacity>
      </View>

      {/* Images: Main Image and Vertical List of Thumbnails */}
      <View style={styles.imageContainer}>
        {/* Main Image */}
        <Image source={localImages[selectedImageIndex]} style={styles.mainImage} />

        {/* Vertical Thumbnails */}
        <FlatList
          data={localImages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedImageIndex(index)}>
              <Image source={item} style={styles.thumbnailImage} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.thumbnailList}
        />
      </View>

      {/* Available Times */}
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
