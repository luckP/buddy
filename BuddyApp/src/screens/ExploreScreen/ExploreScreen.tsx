import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './ExploreScreen.style';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import ServiceCard from './components/ServiceCard/ServiceCard';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure Ionicons is installed


const services = [
  {
    id: 1,
    title: 'Pawfect Groomers',
    rating: 4.5,
    category: 'Grooming',
    price: '$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image1.png', 'image2.png'], // Replace with actual image paths
  },
  {
    id: 2,
    title: 'Healthy Paws Vet',
    rating: 5.0,
    category: 'Veterinary',
    price: '$$$',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    images: ['image3.png', 'image1.png'],
  },
  // Add more services as needed
];

const ExploreScreen: React.FC = () => {
  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ServiceCard
          title={item.title}
          rating={item.rating}
          category={item.category}
          price={item.price}
          times={item.times}
          images={item.images}
        />
      )}
      // Use ListHeaderComponent to render the static parts of the screen
      ListHeaderComponent={() => (
        <View>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Pet Services Finder</Text>
            <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for pet services"
              placeholderTextColor="#999"
              />
              </View>
          </View>

          {/* Category Tabs */}
          <CategoryTabs />

          {/* Filters */}
          <View style={styles.filters}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Nearby</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Top Rated</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Open Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

export default ExploreScreen;
