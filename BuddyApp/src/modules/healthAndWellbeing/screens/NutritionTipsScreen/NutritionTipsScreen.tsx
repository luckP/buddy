import React from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import styles from './NutritionTipsScreen.style';

const tips = [
  {
    category: 'General',
    title: "Know Your Pet's Needs",
    description: "Each animal is unique. Breed, age, and activity level affect nutrition.",
    color: '#FFB74D',
  },
  {
    category: 'Dog',
    title: 'Avoid Human Snacks',
    description: "Chocolate, grapes, and onions are toxic to dogs.",
    color: '#81C784',
  },
  {
    category: 'Cat',
    title: 'Taurine is Essential',
    description: "Cats need taurine in their diet to avoid heart and eye issues.",
    color: '#64B5F6',
  },
  {
    category: 'Dog',
    title: 'Portion Control',
    description: "Obesity is common in dogs. Measure portions to maintain a healthy weight.",
    color: '#E57373',
  },
  {
    category: 'Cat',
    title: 'Fresh Water Daily',
    description: "Cats can be picky about water. Refill and clean their bowl every day.",
    color: '#BA68C8',
  },
];

const NutritionTipsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
        {/* source={require('../../../../assets/images/pet-nutrition.jpg')} */}
      <ImageBackground
        source={require('../../../../assets/images/pet-nutrition.jpg')}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <Text style={styles.headerText}>Nutrition Tips</Text>
        <Text style={styles.headerSubtext}>
          Help your pet stay happy and healthy with proper nutrition!
        </Text>
      </ImageBackground>

      <View style={styles.tipList}>
        {tips.map((tip, index) => (
          <View key={index} style={[styles.tipCard, { backgroundColor: tip.color }]}>
            <Text style={styles.tipCategory}>{tip.category.toUpperCase()}</Text>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default NutritionTipsScreen;
