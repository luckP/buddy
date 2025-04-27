import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HealthAndWellbeingStackParamList } from '../../navigation/NavigationTypes';
import styles from './HomeScreen.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import RecommendationCarousel from '../../components/RecommendationCarousel/RecommendationCarousel';
import TipsCarousel from '../../components/TipsCarousel/TipsCarousel';


const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<HealthAndWellbeingStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../../../../assets/images/home-card-images/card1.png')}
          style={styles.banner}
          resizeMode="cover"
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsWrapper}>

        <LinearGradient colors={['#4a90e2', '#005bea']} style={styles.quickAction}>
          <TouchableOpacity style={styles.quickActionInner} onPress={() => navigation.navigate('Routine')}>
            <Icon name="calendar" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Routine</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#4caf50', '#2e7d32']} style={styles.quickAction}>
          <TouchableOpacity style={styles.quickActionInner} onPress={() => navigation.navigate('ArticleList')}>
            <Icon name="apple" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Nutrition</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#f48fb1', '#d81b60']} style={styles.quickAction}>
          <TouchableOpacity style={styles.quickActionInner} onPress={() => navigation.navigate('ArticleList')}>
            <Icon name="leaf" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Mindfulness</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#9c27b0', '#673ab7']} style={styles.quickAction}>
          <TouchableOpacity style={styles.quickActionInner} onPress={() => navigation.navigate('ArticleList')}>
            <Icon name="book" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Articles</Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>

      {/* Recommendations */}
      <RecommendationCarousel />

      {/* Tips */}
      <TipsCarousel />

    </ScrollView>
  );
};

export default HomeScreen;
