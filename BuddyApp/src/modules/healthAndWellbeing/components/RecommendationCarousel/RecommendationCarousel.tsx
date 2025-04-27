import React, { useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './RecommendationCarousel.style';


const recommendationData = [
  {
    title: 'Walk with your pet',
    subtitle: 'Duration: 30 min',
    imageUrl: 'https://ideas.darden.virginia.edu/sites/default/files/styles/full_width_1024px_5_3_/public/2024-09/AI%20ART%20ITA.jpg?itok=CIaF2iIX',
  },
  {
    title: 'Healthy Meal Tips',
    subtitle: 'Updated Weekly',
    imageUrl: 'https://ideas.darden.virginia.edu/sites/default/files/styles/full_width_1024px_5_3_/public/2024-09/AI%20ART%20ITA.jpg?itok=CIaF2iIX',
  },
  {
    title: 'Mindful Activities',
    subtitle: 'Calm and Focus',
    imageUrl: 'https://ideas.darden.virginia.edu/sites/default/files/styles/full_width_1024px_5_3_/public/2024-09/AI%20ART%20ITA.jpg?itok=CIaF2iIX',
  },
];

const RecommendationCarousel: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.carouselWrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      >
        {recommendationData.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.recommendationCard]}>
            <Image source={{ uri: item.imageUrl }} style={styles.recommendationImage} />
            <View style={styles.recommendationTextContainer}>
              <Text style={styles.recommendationTitle}>{item.title}</Text>
              <Text style={styles.recommendationSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecommendationCarousel;
