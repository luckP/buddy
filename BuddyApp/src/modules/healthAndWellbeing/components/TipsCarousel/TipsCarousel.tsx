import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './TipsCarousel.style';

const tipsData = [
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
  {
    title: 'Healthy Playtime',
    subtitle: 'Daily Games',
    imageUrl: 'https://ideas.darden.virginia.edu/sites/default/files/styles/full_width_1024px_5_3_/public/2024-09/AI%20ART%20ITA.jpg?itok=CIaF2iIX',
  },
];

const TipsCarousel: React.FC = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tipsContainer}
    >
      {tipsData.map((item, index) => (
        <View key={index} style={styles.tipsColumn}>
          <TouchableOpacity style={styles.tipCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.tipImage} />
            <View style={styles.tipTextContainer}>
              <Text style={styles.tipTitle}>{item.title}</Text>
              <Text style={styles.tipSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default TipsCarousel;
