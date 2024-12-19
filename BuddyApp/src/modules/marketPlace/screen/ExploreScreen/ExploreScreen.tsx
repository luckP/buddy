import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './ExploreScreen.style';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import ServiceCard from './components/ServiceCard/ServiceCard';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure Ionicons is installed
import Filter from './components/Filter/Filter';
import ServiceCardProps from '../../../../models/ServiceCardProps';
import { COLORS } from '../../../../constants/theme';
import { fetchStores } from '../../services/marketPlaceService';

const ExploreScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All'); // Default selected filter
  const [services, setServices] = useState<ServiceCardProps[]>([]);

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getServices = async () => {
    try{
      const res:ServiceCardProps[]  = await fetchStores();
      setServices(res);
    }
    catch(error){
      console.log(error);
    }
  }


  // Fetch services from API
  useEffect(() => {
    getServices();
  }, []);

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
