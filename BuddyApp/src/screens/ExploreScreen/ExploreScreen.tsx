import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './ExploreScreen.style';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import ServiceCard from './components/ServiceCard/ServiceCard';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure Ionicons is installed
import { COLORS } from '../../constants/theme';
import ServiceCardProps from '../../models/ServiceCardProps';
import Filter from './components/Filter/Filter';


const services: ServiceCardProps[] = [
  {
    id: 1,
    title: 'Pawfect Groomers',
    rating: 4.5,
    category: 'Grooming',
    price: '$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image1.png', 'image2.png'], // Replace with actual image paths
    liked: true,
  },
  {
    id: 2,
    title: 'Healthy Paws Vet',
    rating: 5.0,
    category: 'Veterinary',
    price: '$$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image3.png', 'image1.png'],
    liked: false,
  },
  {
    id: 3,
    title: 'Healthy Paws Vet',
    rating: 5.0,
    category: 'Veterinary',
    price: '$$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image3.png', 'image1.png'],
    liked: false,
  },
  {
    id: 4,
    title: 'Healthy Paws Vet',
    rating: 5.0,
    category: 'Veterinary',
    price: '$$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image3.png', 'image1.png'],
    liked: false,
  },
  // Add more services as needed
];

const ExploreScreen: React.FC = () => {

  const [selectedFilter, setSelectedFilter] = useState('All'); // Default selected filter

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <FlatList
      data={services}
      style={styles.container}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ServiceCard
          id={item.id}
          title={item.title}
          rating={item.rating}
          category={item.category}
          price={item.price}
          times={item.times}
          images={item.images}
          liked={item.liked}
        />
      )}
      // Use ListHeaderComponent to render the static parts of the screen
      ListHeaderComponent={() => (
        <View>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Pet Services Finder</Text>
            <View style={styles.searchContainer}>
            <Icon name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for pet services"
              placeholderTextColor={COLORS.gray}
              />
              </View>
          </View>

          {/* Category Tabs */}
          <CategoryTabs />

          {/* Filters */}
          <View style={styles.filters}>
            <Filter filter="All" isSelected={selectedFilter == 'All'} onPress={() => handleFilterPress('All')} />
            <Filter filter="Nearby" isSelected={selectedFilter == 'Nearby'} onPress={() => handleFilterPress('Nearby')} />
            <Filter filter="Top Rated" isSelected={selectedFilter == 'Top Rated'} onPress={() => handleFilterPress('Top Rated')} />
            <Filter filter="Open Now" isSelected={selectedFilter == 'Open Now'} onPress={() => handleFilterPress('Open Now')} />
          </View>
        </View>
      )}
    />
  );
};

export default ExploreScreen;
